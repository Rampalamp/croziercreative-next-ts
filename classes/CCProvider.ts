import { BigNumber, ethers } from "ethers";
import { Wallet } from "../components/context/CCWeb3Provider";
import { encodeDataPayload } from "../utils/EVMHelper";

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

    /**
     * Initializes the CCProvider class.
     */
    async initializeProvider() {
        this.account = (await this.getAccounts())[0];
        this.chainId = await this.getChainId();
        this.balance = await this.getBalance(this.account);
        this.chainName = await this.getChainName(this.chainId);
    }
    /**
     * Calls the eth_requestAccounts method for permission
     */
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
    /**
     * Calls eth_getBalance method using given address and latest parameters
     * @param address Address to retrieve balance from
     * @returns Returns formatted ETH balance of address
     */
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
    /**
     * Calls eth_chainId to get current chain wallet is connected
     * @returns Number of chainId
     */
    async getChainId(): Promise<number> {
        let chainId: string = "0";
        try {
            chainId = await this.ethereum.request({ method: "eth_chainId" });
        } catch (error) {
            console.error(error);
        }

        return parseInt(chainId, 16);
    }
    /**
     * Calls eth_accounts to get list of connected accounts from wallet
     * @returns Array of accounts
     */
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
    /**
     * switch statement setup to handle 6 different chainNames
     * @param chainId chainId to get name of
     * @returns string of chainIds name.
     */
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
    /**
     * Calls eth_call method using the given parameters.
     * @param address To address
     * @param sender From address
     * @param params Object containing parameters for the data param of eth_call
     * @returns txResponse of the smart contract called, this will be 32byte or more hex strings
     */
    async callContract(
        address: string,
        sender: string,
        params: {}
    ): Promise<string | undefined> {
        const payloadData: string = encodeDataPayload(params);

        try {
            const txResponseData = await this.ethereum.request({
                method: "eth_call",
                params: [
                    {
                        from: sender,
                        to: address,
                        data: payloadData,
                    },
                ],
            });

            return txResponseData;
        } catch (error) {
            console.log(error);

            return undefined;
        }
    }
    /**
     * Calls eth_sendTransaction method using the given parameters.
     * @param address To address
     * @param sender From address
     * @param params Object containing parameters for the data param of eth_sendTransaction
     * @returns true/false depending whether or not the transaction was successful
     */
    async sendContractTransaction(
        address: string,
        sender: string,
        params: {}
    ): Promise<boolean> {
        const payloadData: string = encodeDataPayload(params);

        //just let MetaMask calculate the gasPrice and gas fields.
        //in the HH local network there is errors in the console popping up, but they seem to be harmless
        //transactions are still going through properly. Something is up with the HHLocal/Metamask browser plugin.
        const transactionParameters = {
            nonce: "0x00", // ignored by MetaMask
            to: address, // Required except during contract publications ("0x0000000000000000000000000000000000000000").
            from: sender, // must match user's active address.
            value: "0x00", // Only required to send ether to the recipient from the initiating external account.
            data: payloadData, // Optional, but used for defining smart contract creation and interaction.
            chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        try {
            const txHash = await this.ethereum.request({
                method: "eth_sendTransaction",
                params: [transactionParameters],
            });

            let txReceipt = null;
            //enter while loop to wait for transaction receipt to be confirmed
            while (!txReceipt) {
                // Wait for 2 seconds before checking
                await new Promise((resolve) => setTimeout(resolve, 2000));

                txReceipt = await this.ethereum.request({
                    method: "eth_getTransactionReceipt",
                    params: [txHash],
                });
            }

            if (txReceipt.status === "0x1") return true;
            //if status code is not 0x1 assume something has gone wrong
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
