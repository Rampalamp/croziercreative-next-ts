import { BigNumber, ethers } from "ethers";

export class CCWebProvider {
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
        // this.ethereum
        //     .request({ method: "eth_requestAccounts" })
        //     .then(this.initializeProvider())
        //     .catch((error: any) => {
        //         if (error.code === 4001) {
        //             // EIP-1193 userRejectedRequest error
        //             console.log("Please connect to MetaMask.");
        //         } else {
        //             console.error(error);
        //         }
        //     });
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
        let chainName = "";

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
}
