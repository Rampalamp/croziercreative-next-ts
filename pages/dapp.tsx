import { useContext } from "react";
import CCConnectButton from "../components/CCConnectButton";
import { CCWeb3Context } from "../components/context/CCWeb3Provider";

export default function dApp() {
    const { CCProvider } = useContext(CCWeb3Context);
    //console.log(provider);
    return CCProvider === undefined ? (
        <div className="mt-5 items-center text-center sm:mt-0">
            <CCConnectButton />
        </div>
    ) : (
        <div>
            <div>{CCProvider.account}</div>
            <div>{CCProvider.chainId}</div>
            <div>{CCProvider.balance}</div>
            <div>{CCProvider.chainName}</div>
        </div>
    );
}
