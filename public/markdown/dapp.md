```typescript
import { useContext, useEffect, useState } from "react";
import CCButton from "../components/CCButton";
import CCConnectButton from "../components/CCConnectButton";
import { CCToastContext } from "../components/context/CCToastProvider";
import { CCWeb3Context, Wallet } from "../components/context/CCWeb3Provider";
import ShowCodeButton from "../components/ShowCodeButton";
import {
    XENFLEX_HHLOCAL,
    XENFLEX_MAINNET,
    XEN_HHLOCAL,
    XEN_MAINNET,
} from "../constants/SmartContracts";
import { MintInfo } from "../types/XENTypes";
import { decode32ByteHexString } from "../utils/EVMHelper";

export default function dApp() {
    const {
        CCProvider,
        connectProvider,
        walletExists,
        isAccountConnected,
        isWalletUnlocked,
    } = useContext(CCWeb3Context);
    const { runToaster } = useContext(CCToastContext);
    const [account, setAccount] = useState<string>("0x0");
    const [balance, setBalance] = useState<string>("0");
    const [chainName, setChainName] = useState<string>("");
    const [walletFound, setWalletFound] = useState<boolean>(false);
    const [mintInfo, setMintInfo] = useState<MintInfo>();
    const [isRankMinted, setIsRankMinted] = useState<boolean>(false);
    const [maxTerm, setMaxTerm] = useState<number>(0);
    const [term, setTerm] = useState<number>(0);

    //Initial effect on load to handle wallet checks.
    useEffect(() => {
        if (walletExists()) {
            setWalletFound(true);

            if (CCProvider === undefined) {
                //check for unlocked metamask first, then gamestop.
                if (isWalletUnlocked("metamask")) {
                    connectProvider("metamask");
                } else if (isWalletUnlocked("gamestop")) {
                    connectProvider("gamestop");
                }
            }
        } else {
            setWalletFound(false);
        }
    }, []);

    //account based effects, when account has been set, call some smart contracts for information.
    useEffect(() => {
        //if account is set, get MaxTerm and check to see if MintInfo exists for address.
        if (account !== "0x0") {
            getMaxTerm();

            getUserMintInfo();
        }
    }, [account]);

    //mintInfo based effects, when mintInfo has been set query xenFlex to check if cRank has been minted.
    useEffect(() => {
        async function queryXenFlex() {
            await queryXenFlexTokenId();
        }
        if (mintInfo !== undefined) {
            queryXenFlex();
        } else {
            setIsRankMinted(false);
        }
    }, [mintInfo]);

    //Initial set of CCProvider, when its set grab accounts and balances, and setup an event for accounts changed.
    useEffect(() => {
        if (CCProvider?.ethereum !== undefined) {
            //setup initial account/balance values.
            //I made them a useState object because updating the CCProvider properties weren't triggering a component update.
            //I thought this useEffect would trigger when the properties of CCProvider change, but it seems not.
            setAccount(CCProvider.account);
            setBalance(CCProvider.balance);
            setChainName(CCProvider.chainName);

            CCProvider.ethereum.on("accountsChanged", handleAccountsChanged);
            CCProvider.ethereum.on("chainChanged", handleChainChanged);
            if (CCProvider.wallet === "gamestop") {
                CCProvider.ethereum.on("disconnect", handleDisconnect);
            }
        }
        return () => {
            CCProvider?.ethereum.removeListener(
                "accountsChanged",
                handleAccountsChanged
            );
            CCProvider?.ethereum.removeListener(
                "chainChanged",
                handleChainChanged
            );
            if (CCProvider?.wallet === "gamestop") {
                CCProvider.ethereum.removeListener(
                    "disconnect",
                    handleDisconnect
                );
            }
        };
    }, [CCProvider]);
    /**
     * Handles disconnect event, this is primarily just for gamestop wallet
     * as far as I can tell. Metamask handles disconnects a little differently.
     * With metamask we can just check if there is a selectedAddress.
     * With gamestop the selectedAddress turns into an error, metamask its just null.
     * the disconnect event for metamask is due to no connection to the RPC url.
     */
    async function handleDisconnect() {
        CCProvider!.account = "0x0";

        setAccount("0x0");
        setBalance("0");
    }

    /**
     * Handles account changes on wallet and sets various state objects accordingly.
     */
    async function handleAccountsChanged() {
        if (CCProvider !== undefined) {
            //change values in provider AND local useState values for account/balance.

            CCProvider.account = CCProvider.ethereum.selectedAddress;
            //if CCProvider.account === null, assume all accounts are disconnected
            //setAccount and setBalance accordingly.
            if (CCProvider.account === null) {
                setAccount("0x0");
                setBalance("0");
                return;
            }

            //if CCProvider.account !== null get balance and set account/balance.
            CCProvider.balance = await CCProvider.getBalance(
                CCProvider.account
            );

            setAccount(CCProvider.account);
            setBalance(CCProvider.balance);
        }
    }
    /**
     * Handles change of chains, only acceptable chains currently
     * are Ethereum Mainnet and Hardhat Local Node
     */
    async function handleChainChanged() {
        if (CCProvider !== undefined) {
            CCProvider.chainId = await CCProvider.getChainId();
            CCProvider.chainName = await CCProvider.getChainName(
                CCProvider.chainId
            );

            setChainName(CCProvider.chainName);
        }
    }

    /**
     * This iterates over the MintInfo property keys, populating a MintInfo object.
     * It then calls the setMintInfo state function.
     * Since our type MintInfo has exact same structure as the struct
     * in XENCrypto.sol, we use data[i] as our data to decode.
     * There is probably a more graceful way of doing this
     * but this is okay for now.
     * @param data array of 64 char long hex strings (32 byte hex strings)
     */
    function setUserMintInfo(data: string[]) {
        //create local userMintInfo to populate
        const userMintInfo: MintInfo = {
            user: "",
            term: 0,
            maturityTs: 0,
            rank: 0,
            amplifier: 0,
            eaaRate: 0,
        };

        const props = Object.keys(userMintInfo) as (keyof MintInfo)[];

        for (let i = 0; i < props.length; i++) {
            const prop: keyof MintInfo = props[i];
            if (prop === "user") {
                userMintInfo.user = decode32ByteHexString(
                    data[i],
                    "address"
                ) as string;
            } else if (prop === "term") {
                userMintInfo[prop] = decode32ByteHexString(
                    data[i],
                    "number"
                ) as number;
            } else if (prop === "maturityTs") {
                userMintInfo[prop] = decode32ByteHexString(
                    data[i],
                    "number"
                ) as number;
            } else if (prop === "rank") {
                userMintInfo[prop] = decode32ByteHexString(
                    data[i],
                    "number"
                ) as number;
            } else if (prop === "amplifier") {
                userMintInfo[prop] = decode32ByteHexString(
                    data[i],
                    "number"
                ) as number;
            } else if (prop === "eaaRate") {
                userMintInfo[prop] = decode32ByteHexString(
                    data[i],
                    "number"
                ) as number;
            }
        }

        setMintInfo(userMintInfo);
    }
    /**
     * Calls XENCrypto getUserMint() function, if mint found, calls setUserMintInfo
     * @returns
     */
    async function getUserMintInfo() {
        //if chainId is 1, set to XEN_MAINNET
        //if chain is anything else but 1, set to XEN_HHLOCAL
        const contractAddress =
            CCProvider?.chainId === 1 ? XEN_MAINNET : XEN_HHLOCAL;
        //tx response should be in 32 byte hex strings format.
        const txResponse = await CCProvider?.callContract(
            contractAddress,
            account,
            {
                function: "getUserMint()",
            }
        );
        //not sure if txResponse will ever be returned as undefined
        if (txResponse !== undefined) {
            //slice off initial 0x of hex string
            //then match every 64th character
            const responseValues = txResponse.slice(2).match(/.{64}/g);
            //if first value in array is all 0's no mint info found.
            if (/^0+$/.test(responseValues![0])) {
                //set mintInfo back to undefined if enters here.
                setMintInfo(undefined);
                return;
            }

            setUserMintInfo(responseValues!);
        }
    }

    /**
     * Calls XENCrypto getCurrentMaxTerm() and then calls setMaxTerm state with retrieved value.
     */
    async function getMaxTerm() {
        const contractAddress =
            CCProvider?.chainId === 1 ? XEN_MAINNET : XEN_HHLOCAL;

        const txResponse = await CCProvider?.callContract(
            contractAddress,
            account,
            { function: "getCurrentMaxTerm()" }
        );

        if (txResponse !== undefined) {
            //not 100% sure the format this will come back in, if its just one 32 byte string
            //can decode and set max term?
            //might need to add some more here.
            const termInSeconds = decode32ByteHexString(
                txResponse.slice(2),
                "number"
            ) as number;
            //divide term in seconds by 86400 to get # of days.
            setMaxTerm(termInSeconds / 86400);
        }
    }

    /**
     * Calls XenFlex ownerOf(uint256) to see if cRank has already been minted.
     */
    async function queryXenFlexTokenId() {
        const contractAddress =
            CCProvider?.chainId === 1 ? XENFLEX_MAINNET : XENFLEX_HHLOCAL;

        const txResponse = await CCProvider?.callContract(
            contractAddress,
            account,
            { function: "ownerOf(uint256)", tokenId: mintInfo!.rank }
        );
        //if contract call errors ie ownerOf gets given an invalid token ID
        //txResponse will be indeed undefined, and console would have errors logged in them.
        if (txResponse !== undefined) {
            //in this case if txResponse is not undefined, then it will be an 20 byte address object
            //don't need to do anything with the response though, just confirms the cRank is minted.
            setIsRankMinted(true);
        }
    }

    /**
     * Calls XENCrypto claimRank(uint256)
     * @returns
     */
    async function handleXenClaimRank() {
        if (!isAccountConnected(CCProvider!.wallet)) {
            console.log(CCProvider);
            console.log("ENTERED ESCAPING");
            return;
        }
        if (term <= 0) {
            runToaster("error", "Term must be greater then 0");
            return;
        }

        if (term > maxTerm) {
            runToaster("error", "Max term exceeded : " + maxTerm.toString());
            return;
        }

        const contractAddress =
            CCProvider?.chainId === 1 ? XEN_MAINNET : XEN_HHLOCAL;

        const success = await CCProvider?.sendContractTransaction(
            contractAddress,
            account,
            {
                function: "claimRank(uint256)",
                termInDays: term,
            }
        );

        if (!success) {
            console.log("Xen Claim Rank Failed.");
            return;
        }

        await getUserMintInfo();

        runToaster("success", "Transaction Successful, Rank Claimed!");
    }
    /**
     * Calls XenFlex mintNft()
     * @returns
     */
    async function handleXenFlexMint() {
        const contractAddress =
            CCProvider?.chainId === 1 ? XENFLEX_MAINNET : XENFLEX_HHLOCAL;

        const success = await CCProvider?.sendContractTransaction(
            contractAddress,
            account,
            { function: "mintNft()" }
        );

        if (!success) {
            console.log("Xen Flex mint Failed.");
            return;
        }

        setIsRankMinted(true);

        runToaster("success", "Transaction Successful, cRank Minted!");
    }

    /**
     * Basic function determining whether or not to show the dapp to user.
     * @returns boolean
     */
    function showDapp(): boolean {
        if (CCProvider !== undefined) {
            if (!isWalletUnlocked(CCProvider.wallet)) return false;
            //if no wallet connected dont display dapp
            if (!isAccountConnected(CCProvider.wallet)) return false;
            //if it reaches here, should be safe to display dapp.
            return true;
        }

        return false;
    }
    /**
     * Checks that the chainName is either Ethereum Mainnet or Hardhat Local Node
     * @returns boolean
     */
    function isChainGood(): boolean {
        if (chainName === "Ethereum Mainnet") return true;

        if (chainName === "Hardhat Local Node") return true;

        return false;
    }

    return (
        <div className="flex-col space-y-5 ">
            {!walletFound ? (
                <div className="rounded-md bg-ls-back p-3 text-center  shadow-md dark:bg-dt-back">
                    Please download either MetaMask or GameStop wallet.
                </div>
            ) : showDapp() ? (
                isChainGood() ? (
                    <div>
                        <div className="flex space-x-8">
                            <div className="flex flex-auto items-center rounded-lg bg-lt-back p-3 shadow-2xl dark:bg-dp-back">
                                {CCProvider!.chainName}
                            </div>
                            <div className="flex flex-auto items-center rounded-lg bg-lt-back p-3 shadow-2xl dark:bg-dp-back">
                                ETH {balance.slice(0, balance.indexOf(".") + 4)}
                                ...
                            </div>
                            <div className="flex flex-auto items-center rounded-lg bg-lt-back p-3 shadow-2xl dark:bg-dp-back">
                                {account.slice(0, 6)}...
                                {account.slice(CCProvider!.account.length - 4)}
                            </div>
                        </div>
                        <div className="mt-10 flex-col space-y-4 rounded-lg bg-lt-back p-10 shadow-2xl dark:bg-dp-back">
                            <div className="flex items-center">
                                <div className="grow">
                                    <div>XEN Crypto</div>
                                    <div>
                                        <a
                                            className="underline hover:text-dp-back hover:dark:text-ls-fore"
                                            target="_blank"
                                            href="https://etherscan.io/token/0x06450dEe7FD2Fb8E39061434BAbCFC05599a6Fb8"
                                            rel="noopener noreferrer"
                                        >
                                            Etherscan
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            className="underline hover:text-dp-back hover:dark:text-ls-fore"
                                            target="_blank"
                                            href="https://xen.network/"
                                            rel="noopener noreferrer"
                                        >
                                            XEN DAPP
                                        </a>
                                    </div>
                                </div>
                                <div className="flex justify-end px-2">
                                    {mintInfo === undefined ? (
                                        <div>
                                            <div>
                                                <span className="text-base">
                                                    Term : (Max: {maxTerm} Days)
                                                </span>
                                            </div>
                                            <input
                                                className="focus:shadow-outline mb-3 w-full appearance-none rounded border bg-lt-back py-2 px-3 leading-tight shadow focus:outline-none dark:bg-ds-back"
                                                id="termInput"
                                                type="number"
                                                onChange={(e) => {
                                                    if (
                                                        !Number.isNaN(
                                                            e.currentTarget
                                                                .valueAsNumber
                                                        )
                                                    ) {
                                                        setTerm(
                                                            e.currentTarget
                                                                .valueAsNumber
                                                        );
                                                    } else {
                                                        //if current value is not a number, set term to 0.
                                                        setTerm(0);
                                                    }
                                                }}
                                            />
                                            <CCButton
                                                onClick={handleXenClaimRank}
                                                title="ClaimXenRank"
                                                className="flex flex-row-reverse"
                                                useLoadingCircle={true}
                                            >
                                                CLAIM RANK
                                            </CCButton>
                                        </div>
                                    ) : (
                                        <div>XEN Rank : {mintInfo.rank}</div>
                                    )}
                                </div>
                            </div>
                            <hr /> <div className="flex">
                                <div className="grow">
                                    <div>
                                        XenFlex NFT <br />
                                        <span className="text-sm">
                                            Mint Xen cRank as NFT
                                        </span>
                                    </div>
                                    <div>
                                        <a
                                            className="underline hover:text-dp-back hover:dark:text-ls-fore"
                                            target="_blank"
                                            href="https://etherscan.io/address/0x7b812443599ba2307c14b80825de0429ee0bae3d"
                                            rel="noopener noreferrer"
                                        >
                                            Etherscan
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            className="underline hover:text-dp-back hover:dark:text-ls-fore"
                                            target="_blank"
                                            href="https://www.xenflex.io/#/"
                                            rel="noopener noreferrer"
                                        >
                                            XenFlex DAPP
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end px-2">
                                    {mintInfo === undefined ? (
                                        <div>No Rank</div>
                                    ) : isRankMinted ? (
                                        <div>Rank {mintInfo.rank} Minted</div>
                                    ) : (
                                        <CCButton
                                            onClick={handleXenFlexMint}
                                            title="MintXenFlex"
                                            useLoadingCircle={true}
                                        >
                                            MINT NFT
                                        </CCButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-md bg-ls-back p-3 text-center  shadow-md dark:bg-dt-back">
                        Chain must be Ethereum Mainnet or Hardhat Local Node.
                    </div>
                )
            ) : (
                <div className="mt-5 items-center text-center sm:mt-0">
                    <CCConnectButton />
                </div>
            )}
            <ShowCodeButton codeToShow="dapp" className="flex justify-center" />
        </div>
    );
}
```
