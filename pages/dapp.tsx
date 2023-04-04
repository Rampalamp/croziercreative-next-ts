import { useContext, useEffect, useState } from "react";
import CCConnectButton from "../components/CCConnectButton";
import { CCWeb3Context } from "../components/context/CCWeb3Provider";

export default function dApp() {
    const { CCProvider } = useContext(CCWeb3Context);
    const [account, setAccount] = useState<string>("0x0");
    const [balance, setBalance] = useState<string>("0");

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
    return CCProvider === undefined ? (
        <div className="mt-5 items-center text-center sm:mt-0">
            <CCConnectButton />
        </div>
    ) : (
        <div>
            <div className="flex space-x-8">
                <div className="rounded-lg bg-lt-back p-3 shadow-2xl dark:bg-dt-back">
                    {CCProvider.chainName}
                </div>
                <div className="rounded-lg bg-lt-back p-3 shadow-2xl dark:bg-dt-back">
                    ETH {balance.slice(0, balance.indexOf(".") + 4)}
                    ...
                </div>
                <div className="rounded-lg bg-lt-back p-3 shadow-2xl dark:bg-dt-back">
                    {account.slice(0, 6)}...
                    {account.slice(CCProvider.account.length - 4)}
                </div>
            </div>

            <div className="mt-10 flex-col rounded-lg bg-lt-back p-10 shadow-2xl dark:bg-dt-back">
                <div>XEN SMART CONTRACT</div>
                <div>XEN FLEX SMART CONTRACT</div>
            </div>
        </div>
    );
}
