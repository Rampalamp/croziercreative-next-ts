import { BigNumber, ethers } from "ethers";
import keccak256 from "keccak256";

//Good article that breaks down manually creating the data payload for a eth_sendTransaction call to interact with smart contract functions.
//https://medium.com/coinmonks/ethereum-smart-contracts-how-to-communicate-with-them-abi-specification-web3-solidity-db056218b251

export class CCProvider {
    account!: string;
    balance!: string;
    chainId!: number;
    chainName!: string;
    ethereum: any;

    constructor(eth: any) {
        this.ethereum = eth;
    }

    async initializeProvider() {
        this.account = (await this.getAccounts())[0];
        this.chainId = await this.getChainId();
        this.balance = await this.getBalance(this.account);
        this.chainName = await this.getChainName(this.chainId);
    }

    async connect() {
        try {
            await this.ethereum.request({ method: "eth_requestAccounts" });

            await this.initializeProvider();
        } catch (error: any) {
            if (error.code === 4001) {
                // EIP-1193 userRejectedRequest error
                console.log("Please connect to MetaMask.");
            } else {
                console.error(error);
            }
        }
    }

    async getBalance(address: string): Promise<string> {
        let balance: BigNumber = BigNumber.from(0);

        try {
            balance = BigNumber.from(
                await this.ethereum.request({
                    method: "eth_getBalance",
                    params: [address, "latest"],
                })
            );
            //balance = parseInt(balance, 16).toString();
        } catch (error) {
            console.error(error);
        }
        return ethers.utils.formatUnits(balance, "ether");
    }

    async getChainId(): Promise<number> {
        let chainId: string = "0";
        try {
            chainId = await this.ethereum.request({ method: "eth_chainId" });
        } catch (error) {
            console.error(error);
        }

        return parseInt(chainId, 16);
    }

    async getAccounts(): Promise<string[]> {
        let accounts: string[] = [];

        try {
            accounts = await this.ethereum.request({
                method: "eth_accounts",
            });
        } catch (error) {
            console.error(error);
        }

        return accounts;
    }

    async getChainName(chainId: number): Promise<string> {
        let chainName;

        switch (chainId) {
            case 1:
                chainName = "Ethereum Mainnet";
                break;
            case 2:
                chainName = "Expanse Network";
                break;
            case 3:
                chainName = "Ropsten";
                break;
            case 4:
                chainName = "Rinkeby";
                break;
            case 5:
                chainName = "Goerli";
                break;
            case 31337:
                chainName = "Hardhat Local Node";
                break;
            default:
                chainName = "Not the usual";
                break;
        }

        return chainName;
    }

    async sendContractTransaction(address: string, sender: string, params: {}) {
        const payloadData: string = this.createDataPayload(params);

        const transactionParameters = {
            nonce: "0x00", // ignored by MetaMask
            gasPrice: "0x09184e72a000", // customizable by user during MetaMask confirmation.
            gas: "0x2710", // customizable by user during MetaMask confirmation.
            to: "0x0000000000000000000000000000000000000000", // Required except during contract publications.
            from: sender, // must match user's active address.
            value: "0x00", // Only required to send ether to the recipient from the initiating external account.
            data: payloadData, // Optional, but used for defining smart contract creation and interaction.
            chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        // const txHash = await this.ethereum.request({
        //     method: "eth_sendTransaction",
        //     params: [transactionParameters],
        // });
    }

    private createDataPayload(params: {}): string {
        //assume params coming in the following order - Function name and params claimRank(uint256 term)
        //parameters of functions, in order.
        //iterate through params object using these assumptions, add some checks for error handling? dunno if ill bother.
        let payload: string;
        Object.entries(params).forEach(([key, value]) => {
            //if the key is first property, assume its function signature
            if (Object.keys(params)[0] === key) {
                //hash and convert to hex, slice off first 8 chars of strings (4 hex bytes)
                const signature: string = keccak256(value)
                    .toString("hex")
                    .slice(0, 8);
                payload = signature + payload;
            } else {
                let param: string;
                switch (typeof value) {
                    case "number":
                        const valNum: number = value as number;
                        //pad 64 0s = 2 chars per hex byte, 32 bytes total.
                        param = valNum.toString(16).padStart(64, "0");
                        console.log(Buffer.from("100").toString("hex"));
                        break;
                    case "string":
                        const valString: string = value as string;
                        param = this.create32ByteHexString(valString, true);
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
                        //only going to add a case for arrays of strings
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
                                    param = this.create32ByteHexString(
                                        val,
                                        true
                                    );
                                });
                            }
                        }
                        break;
                }
            }
        });
        return "";
    }

    private create32ByteHexString(data: string, padEnd: boolean): string {
        const hexString = Buffer.from(data).toString("hex");

        if (padEnd) {
            return hexString.padEnd(64, "0");
        }

        return hexString.padStart(64, "0");
    }
}
