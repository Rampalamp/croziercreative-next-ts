import { useContext, useEffect, useState } from "react";
import CCButton from "../components/CCButton";
import CCConnectButton from "../components/CCConnectButton";
import { CCWeb3Context, Wallet } from "../components/context/CCWeb3Provider";
import { XEN_HHLOCAL } from "../constants/SmartContracts";

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
        if (CCProvider?.ethereum !== undefined) {
            //setup initial account/balance values.
            //I made them a useState object because updating the CCProvider properties weren't triggering a component update.
            //I thought this useEffect would trigger when the properties of CCProvider change, but it seems not.
            setAccount(CCProvider.account);
            setBalance(CCProvider.balance);
            CCProvider.ethereum.on("accountsChanged", handleAccountsChanged);
        }
        return () => {
            CCProvider?.ethereum.removeListener(
                "accountsChanged",
                handleAccountsChanged
            );
        };
    }, [CCProvider]);

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
        await CCProvider?.sendContractTransaction(XEN_HHLOCAL, account, {
            function: "g(uint256[][],string[])",
            ints: [[1, 2], [3]],
            strings: ["one", "two", "three"],
        });
        // await CCProvider?.sendContractTransaction(XEN_HHLOCAL, account, {
        //     function: "claimRank(uint256)",
        //     termInDays: 100,
        // });
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
                    XEN SMART CONTRACT
                    <CCButton onClick={handleXenClaimRank} title="ClaimXenRank">
                        CLAIM RANK
                    </CCButton>
                </div>
                <div>XEN FLEX SMART CONTRACT</div>
            </div>
        </div>
    ) : (
        <div className="mt-5 items-center text-center sm:mt-0">
            <CCConnectButton />
        </div>
    );
}
