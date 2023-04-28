import { BigNumber, ethers } from "ethers";
import { Wallet } from "../components/context/CCWeb3Provider";
import { createDataPayload } from "./EVMHelper";

//Good article that breaks down manually creating the data payload for a eth_sendTransaction call to interact with smart contract functions.
//https://medium.com/coinmonks/ethereum-smart-contracts-how-to-communicate-with-them-abi-specification-web3-solidity-db056218b251
//https://docs.soliditylang.org/en/develop/abi-spec.html#use-of-dynamic-types

export class CCProvider {
    account!: string;
    balance!: string;
    chainId!: number;
    chainName!: string;
    ethereum: any;
    wallet: Wallet;

    constructor(eth: any, wallet: Wallet) {
        this.ethereum = eth;
        this.wallet = wallet;
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
        } catch (error: any) {
            if (error.code === 4001) {
                // EIP-1193 userRejectedRequest error
                console.log("Please connect your wallet.");
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
        const payloadData: string = createDataPayload(params);

        console.log(payloadData);

        const transactionParameters = {
            nonce: "0x00", // ignored by MetaMask
            gasPrice: "0x09184e72a000", // customizable by user during MetaMask confirmation.
            gas: "0x2710", // customizable by user during MetaMask confirmation.
            to: address, // Required except during contract publications ("0x0000000000000000000000000000000000000000").
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
}
