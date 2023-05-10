import { create } from "domain";
import keccak256 from "keccak256";

/**
 *
 * @param params An object which the first property should always be the function signature, every property thereafter is considered a parameter within the function signature we are going to call
 * @returns a long string in hex that should be used in the data portion for the eth_sendTransaction request.
 */
export function encodeDataPayload(params: {}): string {
    const paramEntries = Object.entries(params);
    let sigParamDataMap: Map<number, string> | null = null;
    let payloadMap: Map<number, string> = new Map<number, string>();
    let refDataMap: Map<number, string[]> = new Map<number, string[]>();
    let payload: string = "0x";
    let param: any;
    let offsetSigParamCount: number = 0;
    let paramValue: any;

    for (let i = 0; i < paramEntries.length; i++) {
        param = paramEntries[i];
        paramValue = param[1];

        if (i === 0) {
            //hash and convert to hex, slice off first 8 chars of strings (4 hex bytes)
            //remove spaces from signature
            const trimmed = (paramValue as string).replace(/\s/g, "");
            const signature: string = keccak256(trimmed)
                .toString("hex")
                .slice(0, 8);

            //prime payload with signature
            payload += signature;

            //parse trimmed non-keccak signature and fill mapping with what we can for now.
            const cleanExp: RegExp = /\(([^)]+)\)/;
            const paramMatch = cleanExp.exec(trimmed);
            if (paramMatch !== null) {
                const params: string[] = paramMatch[1].split(",");

                sigParamDataMap =
                    params.length > 0 ? createParamDataMapping(params) : null;
            }
        } else {
            //parameters of the function signature
            //mappedParam[0] will be either static or dynamic
            //mappedParam[1] will be the actual solidity data type (bool, address, uint etc.)
            //subtract 1 from i to make sure the proper key is used to retrieve sigParamDataMap entry.
            const mappedParam = sigParamDataMap!.get(i - 1);

            if (mappedParam === "static") {
                //for static should be able to just straight add it to the payloadMap object.
                payloadMap.set(
                    payloadMap.size,
                    create32ByteHexString(paramValue)
                );
            } else {
                //dynamic type
                //add placeholder for offset to payloadMap
                //using a separate offsetSigParamCounter, since offset rows can come in any order.
                payloadMap.set(payloadMap.size, `offset${offsetSigParamCount}`);
                offsetSigParamCount++;
                //send in fresh array to be filled out with offsets and data.
                let offsetArray: string[] = [];

                traverseDynamicType(paramValue, offsetArray);
                //create new entry in refDataMap with offsetArray data.
                refDataMap.set(refDataMap.size, offsetArray);
            }
        }
    }

    if (sigParamDataMap === null) {
        //no params just return payload which should be 0xkeccak256(FUNC SIG)
        return payload;
    }
    //if sigParamDataMap is not null, safe to assume we have used/created a payloadMap

    //here we are iterating through payloadMap
    //as we loop we adjust any data that contains the string 'offset'
    //we use the ending of the offset value to grab the reference data
    payloadMap.forEach((value, key, map) => {
        if (/offset/g.test(value)) {
            const refDataKey = Number(value.replace(/offset/g, ""));
            //use payloadMap.size to determine the offset byte.
            //I think this will be safer
            //we end up building out the payloadMap further
            map.set(key, create32ByteHexString(map.size * 32));

            const refData: string[] | undefined = refDataMap.get(refDataKey);

            if (refData !== undefined) {
                for (const value of refData) map.set(map.size, value);
            }
        }
    });

    //final iteartion of payloadMap to construct one long payload string.
    payloadMap.forEach((value) => {
        payload += value;
    });
    console.log(payload);

    return payload;
}

/**
 * This function has a recursion based on the child type being an array creating offset encoding when needed
 * eventually when the value is a non-array type it will encode the actual data inside the arrays.
 * @param val Parameter value to traverse over which should be a dynamic solidity type
 * @param offsetArray The array that will be populated while traversing, to be appended to refDataMap after filled.
 */
function traverseDynamicType(val: any, offsetArray: string[]): void {
    if (Array.isArray(val)) {
        //confirm if next child is another array, if true, create further offset rows.
        if (Array.isArray(val[0])) {
            offsetArray.push(create32ByteHexString(val.length));
            //array in array

            let byteMulti: number = val.length;
            //loop through once calculating offset values for next array
            for (let i = 0; i < val.length; i++) {
                offsetArray.push(create32ByteHexString(byteMulti * 32));

                byteMulti += val[i].length + 1;
            }
            //loop through again using val[i] as new value for next recursion
            for (let i = 0; i < val.length; i++) {
                traverseDynamicType(val[i], offsetArray);
            }
        } else if (typeof val[0] === "string") {
            //strings have a more static byteMulti increaser
            //unless the string is longer then 32 bytes, then this will break I think...
            //Havn't researched what happens in that case
            //I assume it just adds as many byte rows for the data as needed in 32 byte increments.
            //this section will likely need changing for strings greater then 32 bytes.
            offsetArray.push(create32ByteHexString(val.length));

            let byteMulti: number = val.length;
            //if val is string, loop through once for offsets,
            for (let i = 0; i < val.length; i++) {
                offsetArray.push(create32ByteHexString(byteMulti * 32));
                byteMulti += 2;
            }
            //loop through sending val[i] for next recursion
            for (let i = 0; i < val.length; i++) {
                offsetArray.push(create32ByteHexString(val[i].length));
                traverseDynamicType(val[i], offsetArray);
            }
        } else {
            offsetArray.push(create32ByteHexString(val.length));

            for (let i = 0; i < val.length; i++) {
                traverseDynamicType(val[i], offsetArray);
            }
        }
    } else {
        //after traversing through all arrays, function should finally end here
        //hexifying the actual data itself.
        offsetArray.push(create32ByteHexString(val));
    }
}

/**
 *
 * @param params String array of the parameters in the function signature
 * @returns Mapping<number,string[]> : key of map is index order of the string[] params passed in. The value string[] will have two strings, first stringwill be the param type (static or dynamic), the second string will be the actual param/data solidity type
 */
export function createParamDataMapping(params: string[]): Map<number, string> {
    let mapping: Map<number, string> = new Map<number, string>();

    for (let i = 0; i < params.length; i++) {
        const param = params[i];

        const paramType = getSolidityParamType(param);

        mapping.set(i, paramType);
    }

    return mapping;
}

/**
 *
 * @param value any type, this value will enter a switch statement which will attempt to determine how it needs to turn the value into hex data with a 32 byte buffer of 0's at the beginning or the end depending data type.
 * @returns parameter data in hex form with 32 byte hex 0's padding beginning or end.
 */
export function create32ByteHexString(value: any): string {
    let param: string = "";
    switch (typeof value) {
        case "number":
            const valNum: number = value as number;
            //pad 64 0s = 2 chars per hex byte, 32 bytes total.
            param = valNum.toString(16).padStart(64, "0");
            break;
        case "string":
            const valString: string = value as string;
            param = Buffer.from(valString).toString("hex").padEnd(64, "0");
            break;
        case "boolean":
            const valBool: boolean = value as boolean;
            param = valBool ? "01".padStart(64, "0") : "00".padStart(64, "0");
            break;
        case "bigint":
            const valBigInt: bigint = value as bigint;
            param = valBigInt.toString(16).padStart(64, "0");
            break;

        default:
            //I dont think any of this array logic will stay in here.
            if (Array.isArray(value)) {
                const isStringArray =
                    value.length > 0 &&
                    value.every((val) => {
                        return typeof val === "string";
                    });

                if (isStringArray) {
                    value.forEach((val) => {
                        param =
                            param +
                            Buffer.from(val).toString("hex").padEnd(64, "0");
                    });
                    break;
                }

                const isNumberArray =
                    value.length > 0 &&
                    value.every((val) => {
                        return typeof val === "number";
                    });

                if (isNumberArray) {
                    value.forEach((val) => {
                        param = param + val.toString(16).padStart(64, "0");
                    });
                    break;
                }
                //for each new depth of arrays, it will result in new offsets being needed.
                const isArrayOfArray =
                    value.length > 0 &&
                    value.every((val) => {
                        return Array.isArray(val);
                    });
                if (isArrayOfArray) {
                    //Not sure if I want to bother with this currently.
                }
            }
            break;
    }
    return param;
}

/**
 *
 * @param type string name of solidity type in function signature (bytes, bytes1, uint256, address etc..)
 * @returns returns a string value of the param type according to solidity docs. value if it is a value type, or reference if it is a reference type parameter.
 */
export function getSolidityParamType(type: string): string {
    //below regex doesnt handle all cases for smart contract param types
    //should cover int/uint/bytes+any number (bytes1,bytes2) - indicating not dynamic/reference (for strings), address and bool
    const isValueRegex: RegExp = /(int(?!.*\[\]$))|(bytes\d+)|address|bool/;
    //if isValueRegex evaluates to false, just assume its a reference type
    return isValueRegex.test(type) ? "static" : "dynamic";
}
