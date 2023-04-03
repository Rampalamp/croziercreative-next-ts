import { BigNumber, ethers } from "ethers";

export class CCWebProvider {
    account!: string;
    balance!: BigNumber;
    chainId!: number;
    chainName!: string;
    ethereum: any;

    constructor(eth: any) {
        this.ethereum = eth;
        console.log(this.ethereum);
    }
    //GETTING SOME ERROR THAT ETHEREUM IS UNDEFINED, MIGHT NEED TO
    initializeProvider() {
        console.log("INITING");
        this.account = this.getAccounts()[0];
        this.chainId = this.getChainId();
        this.balance = this.getBalance(this.account);
    }

    connect() {
        this.ethereum
            .request({ method: "eth_requestAccounts" })
            .then(this.initializeProvider)
            .catch((error: any) => {
                if (error.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    console.log("Please connect to MetaMask.");
                } else {
                    console.error(error);
                }
            });
    }

    getBalance(address: string): BigNumber {
        let balance: string = "0";
        this.ethereum
            .request({ method: "eth_getBalance", params: [address, "latest"] })
            .then((bal: string) => {
                //parse to string in number format.
                balance = parseInt(bal, 16).toString();
            })
            .catch((error: any) => {
                console.error(error);
            });
        console.log(ethers.utils.parseEther(balance));
        return ethers.utils.parseEther(balance);
    }

    getChainId(): number {
        let chainId: string = "0";
        this.ethereum
            .request({ method: "eth_chainId" })
            .then((chain: string) => {
                chainId = chain;
            })
            .catch((error: any) => {
                console.error(error);
            });
        //receiving ChainId as hex number, convert to regular number.
        console.log(chainId);
        return parseInt(chainId, 16);
    }

    getAccounts(): string[] {
        let accounts: string[] = [];

        this.ethereum
            .request({ method: "eth_chainId" })
            .then((accts: string[]) => {
                accounts = accts;
            })
            .catch((error: any) => {
                console.error(error);
            });

        return accounts;
    }
}
