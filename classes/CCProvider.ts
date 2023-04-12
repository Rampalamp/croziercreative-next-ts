import { BigNumber, ethers } from "ethers";

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
            data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
            chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        const txHash = await this.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });
    }

    private createDataPayload(params: {}): string {
        return "";
    }
}
