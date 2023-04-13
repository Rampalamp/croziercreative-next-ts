import { useContext, useEffect, useState } from "react";
import CCButton from "../components/CCButton";
import CCConnectButton from "../components/CCConnectButton";
import { CCWeb3Context } from "../components/context/CCWeb3Provider";
import { XEN_HHLOCAL } from "../constants/SmartContracts";

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
    /*CLAIM RANK FUNC
  function claimRank(uint256 term) external {
        uint256 termSec = term * SECONDS_IN_DAY;
        require(termSec > MIN_TERM, "CRank: Term less than min");
        require(termSec < _calculateMaxTerm() + 1, "CRank: Term more than current max term");
        require(userMints[_msgSender()].rank == 0, "CRank: Mint already in progress");

        // create and store new MintInfo
        MintInfo memory mintInfo = MintInfo({
            user: _msgSender(),
            term: term,
            maturityTs: block.timestamp + termSec,
            rank: globalRank,
            amplifier: _calculateRewardAmplifier(),
            eaaRate: _calculateEAARate()
        });
        userMints[_msgSender()] = mintInfo;
        activeMinters++;
        emit RankClaimed(_msgSender(), term, globalRank++);
    }

*/
    async function handleXenClaimRank() {
        await CCProvider?.sendContractTransaction(XEN_HHLOCAL, account, {
            function: "claimRank(uint256)",
            termInDays: 100,
        });
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
                <div className="flex">
                    XEN SMART CONTRACT
                    <CCButton onClick={handleXenClaimRank}>CLAIM RANK</CCButton>
                </div>
                <div>XEN FLEX SMART CONTRACT</div>
            </div>
        </div>
    );
}
