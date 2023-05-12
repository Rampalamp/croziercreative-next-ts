import { useContext, useEffect, useState } from "react";
import CCButton from "../components/CCButton";
import CCConnectButton from "../components/CCConnectButton";
import { CCWeb3Context, Wallet } from "../components/context/CCWeb3Provider";
import { XENFLEX_HHLOCAL, XEN_HHLOCAL } from "../constants/SmartContracts";
import { MintInfo } from "../types/XENTypes";
import { decode32ByteHexString } from "../utils/EVMHelper";

export default function dApp() {
    const {
        CCProvider,
        connectProvider,
        walletExists,
        isWalletConnected,
        isWalletUnlocked,
    } = useContext(CCWeb3Context);
    const [account, setAccount] = useState<string>("0x0");
    const [balance, setBalance] = useState<string>("0");
    const [walletFound, setWalletFound] = useState<boolean>(false);
    const [mintInfo, setMintInfo] = useState<MintInfo>();
    const [isRankMinted, setIsRankMinted] = useState<boolean>(false);

    useEffect(() => {
        if (walletExists()) {
            setWalletFound(true);

            if (CCProvider === undefined) {
                const connectedWallet: Wallet = isWalletConnected();

                if (connectedWallet !== null) {
                    isWalletUnlocked(connectedWallet)
                        ? connectProvider(connectedWallet)
                        : null;
                }
            }
        } else {
            setWalletFound(false);
        }
    }, []);

    useEffect(() => {
        async function getMintInfo() {
            await getUserMintInfo();
        }

        async function queryXenFlex() {
            await queryXenFlexTokenId();
        }

        if (CCProvider?.ethereum !== undefined) {
            //setup initial account/balance values.
            //I made them a useState object because updating the CCProvider properties weren't triggering a component update.
            //I thought this useEffect would trigger when the properties of CCProvider change, but it seems not.
            setAccount(CCProvider.account);
            setBalance(CCProvider.balance);

            getMintInfo();

            if (mintInfo !== undefined) queryXenFlex();

            CCProvider.ethereum.on("accountsChanged", handleAccountsChanged);
        }
        return () => {
            CCProvider?.ethereum.removeListener(
                "accountsChanged",
                handleAccountsChanged
            );
        };
    }, [CCProvider]);

    useEffect(() => {
        console.log(mintInfo);
    }, [mintInfo]);

    function showDapp(): boolean {
        if (CCProvider !== undefined) {
            //if no wallet connected dont display dapp
            if (!isWalletConnected) return false;
            //if connected wallet is not unlocked
            if (!isWalletUnlocked(CCProvider.wallet)) return false;
            //if it reaches here, should be safe to display dapp.
            return true;
        }

        return false;
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

    async function getUserMintInfo() {
        //tx response should be in 32 byte hex strings format.
        const txResponse = await CCProvider?.callContract(
            XEN_HHLOCAL,
            account,
            {
                function: "getUserMint()",
            }
        );

        if (txResponse !== undefined) {
            //slice off initial 0x of hex string
            //then match every 64th character
            const responseValues = txResponse.slice(2).match(/.{64}/g);

            if (responseValues === null) return;

            setUserMintInfo(responseValues);
        }
    }

    async function queryXenFlexTokenId() {
        const txResponse = await CCProvider?.callContract(
            XENFLEX_HHLOCAL,
            account,
            { function: "ownerOf(uint256)", tokenId: mintInfo!.rank }
        );

        if (txResponse !== undefined) {
            //this should just be an address, or an error. not entirely sure how this will test on HH local since its using an azure link for the base URI
            //if Address exists, then the account has already minted their cRank
            //if response returns an error or execution reverted, then invalid token
            //can assume cRank has not been minted.

            setIsRankMinted(true);
        }
    }

    async function handleAccountsChanged() {
        if (CCProvider !== undefined) {
            //change values in provider AND local useState values for account/balance.
            CCProvider.account = (await CCProvider.getAccounts())[0];
            CCProvider.balance = await CCProvider.getBalance(
                CCProvider.account
            );
            setAccount(CCProvider.account);
            setBalance(CCProvider.balance);
        }
    }

    async function handleXenClaimRank() {
        //I don't think we need to do anything with the txHash returned from MetaMask
        //await getUserMintInfo();
        const success = await CCProvider?.sendContractTransaction(
            XEN_HHLOCAL,
            account,
            {
                function: "claimRank(uint256)",
                termInDays: 100,
            }
        );

        success
            ? await getUserMintInfo()
            : console.log("Xen Claim Rank Failed.");
    }

    async function handleXenFlexMint() {
        const success = await CCProvider?.sendContractTransaction(
            XENFLEX_HHLOCAL,
            account,
            { function: "mintNft()" }
        );

        !success ? console.log("Xen Flex mint Failed.") : null;
    }

    return !walletFound ? (
        <div className="rounded-md bg-ls-back p-3 text-center  shadow-md dark:bg-dt-back">
            Please download either MetaMask or GameStop wallet.
        </div>
    ) : showDapp() ? (
        <div>
            <div className="flex space-x-8">
                <div className="rounded-lg bg-lt-back p-3 shadow-2xl dark:bg-dt-back">
                    {CCProvider!.chainName}
                </div>
                <div className="rounded-lg bg-lt-back p-3 shadow-2xl dark:bg-dt-back">
                    ETH {balance.slice(0, balance.indexOf(".") + 4)}
                    ...
                </div>
                <div className="rounded-lg bg-lt-back p-3 shadow-2xl dark:bg-dt-back">
                    {account.slice(0, 6)}...
                    {account.slice(CCProvider!.account.length - 4)}
                </div>
            </div>

            <div className="mt-10 flex-col rounded-lg bg-lt-back p-10 shadow-2xl dark:bg-dt-back">
                <div className="flex">
                    <div>
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

                    {mintInfo === undefined ? (
                        <div>
                            <input
                                className="border-red-500 text-gray-700 focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight shadow focus:outline-none"
                                id="termInput"
                                type="number"
                                placeholder="Term"
                            />
                            <CCButton
                                onClick={handleXenClaimRank}
                                title="ClaimXenRank"
                            >
                                CLAIM RANK
                            </CCButton>
                        </div>
                    ) : (
                        <div>XEN Rank : {mintInfo.rank}</div>
                    )}
                </div>
                <div className="flex">
                    <div>
                        <div>XenFlex NFT - Mint Your Xen cRank as an NFT</div>
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
                    {mintInfo === undefined ? (
                        <div>Claim Rank to Mint Xen Flex</div>
                    ) : isRankMinted ? (
                        <div>Rank {mintInfo.rank} Minted</div>
                    ) : (
                        <CCButton
                            onClick={handleXenFlexMint}
                            title="MintXenFlex"
                        >
                            MINT
                        </CCButton>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <div className="mt-5 items-center text-center sm:mt-0">
            <CCConnectButton />
        </div>
    );
}
