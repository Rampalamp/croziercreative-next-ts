import keccak256 from "keccak256";
/**
 *
 * @param params An object which the first property should always be the function signature, every property thereafter is considered a parameter within the function signature we are going to call
 * @returns a long string in hex that should be used in the data portion for the eth_sendTransaction request.
 */
export function createDataPayload(params: {}): string {
    //assume params coming in the following order - Function name and params claimRank(uint256 term)
    const paramEntries = Object.entries(params);
    let sigParamDataMap: Map<number, string[]>;
    let signatureParams: string = "";
    let referenceParams: string = "";
    let payload: string = "";
    let param: any;
    let paramKey: string;
    let paramValue: any;

    for (let i = 0; i < paramEntries.length; i++) {
        param = paramEntries[i];
        paramKey = param[0];
        paramValue = param[1];

        if (i === 0) {
            //hash and convert to hex, slice off first 8 chars of strings (4 hex bytes)
            //remove spaces from signature
            const trimmed = (paramValue as string).replace(/\s/g, "");
            const signature: string = keccak256(trimmed)
                .toString("hex")
                .slice(0, 8);
            //prime payload with signature
            payload = signature + payload;
            //parse trimmed non-keccak signature and fill mapping with what we can for now.
            const regExp: RegExp = /\(([^)]+)\)/;
            const paramMatch = regExp.exec(trimmed);
            if (paramMatch !== null) {
                const params: string[] = paramMatch[1].split(",");

                sigParamDataMap = createParamDataMapping(params);
            }
        } else {
            //parameters of the function signature
            //we have the sigParamDataMap that we need to fill with proper 32 byte hex data
            //depending on whether or not the parameter is a value or reference type.
            const mappedParam = sigParamDataMap!.get(i);

            //determine if param is reference type or value type
            //This part can get tricky, and likley more work then I have time to do
            //Going to keep it simple and only handle basic arrays, not multi-dimensional.
            //things to note, the initial 4 selector bytes are not considered when calculating offset bytes
            //the offset byte for the first reference type in sig params can be easily calculated
            //params.length x 32
            //offset for a secondary reference typeneed to be calculated based off the first reference type.
            //if the first reference type is an array of numbers, each number will push the
            //offset of the second reference type another 32 bytes down.
            if (mappedParam![1] === "value") {
            } else {
                //reference type
                //
            }
            let param: string = hexifyParameter(paramValue);

            payload = payload + param;
        }
    }
    return payload;
}

/**
 *
 * @param params String array of the parameters in the function signature
 * @returns Mapping<number,string[]> : key of map is index order of the string[] params passed in. The value string[] will have two strings, first string will always be a padded 32 Hex bytes of 0s, second string will be the param type (value or reference)
 */
export function createParamDataMapping(
    params: string[]
): Map<number, string[]> {
    let mapping: Map<number, string[]> = new Map<number, string[]>();

    for (let i = 0; i < params.length; i++) {
        const param = params[i];

        const paramType = getSolidityParamType(param);
        //set the key/index to be i+1, this makes it easier inside the createDataPayload function
        mapping.set(i + 1, [create32ByteHexString("", false), paramType]);
    }

    return mapping;
}

/**
 *
 * @param value any type, this value will enter a switch statement which will attempt to determine how it needs to turn the value into hex data with a 32 byte buffer of 0's at the beginning or the end.
 * @returns parameter data in hex form with 32 byte hex 0's padding beginning or end.
 */
export function hexifyParameter(value: any): string {
    let param: string = "";
    switch (typeof value) {
        case "number":
            const valNum: number = value as number;
            //pad 64 0s = 2 chars per hex byte, 32 bytes total.
            param = valNum.toString(16).padStart(64, "0");
            break;
        case "string":
            const valString: string = value as string;
            param = create32ByteHexString(valString, true);
            break;
        case "boolean":
            const valBool: boolean = value as boolean;
            param = valBool ? "01" : "00";
            break;
        case "bigint":
            const valBigInt: bigint = value as bigint;
            param = valBigInt.toString(16).padStart(64, "0");
            break;

        default:
            //only going to add a case for arrays of strings or number
            //could continue to add more exceptions for other possibly data types
            //too many considerations for all possible parameters smart contracts can take...
            if (Array.isArray(value)) {
                const isStringArray =
                    value.length > 0 &&
                    value.every((val) => {
                        return typeof val === "string";
                    });

                if (isStringArray) {
                    value.forEach((val) => {
                        param = create32ByteHexString(val, true);
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
                        param = val.toString(16).padStart(64, "0");
                    });
                    break;
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
    return isValueRegex.test(type) ? "value" : "reference";
}

/**
 *
 * @param data string data that will be turned into hex
 * @param padEnd specifies whether or not to pad the front of end with 64 0s to create a 32 BYTE hex string
 * @returns 32 byte hex string from string parameter, pads end or beginning.
 */
export function create32ByteHexString(data: string, padEnd: boolean): string {
    const hexString = Buffer.from(data).toString("hex");

    if (padEnd) {
        return hexString.padEnd(64, "0");
    }

    return hexString.padStart(64, "0");
}
