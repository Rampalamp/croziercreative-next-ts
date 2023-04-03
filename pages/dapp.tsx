import { useContext } from "react";
import CCConnectButton from "../components/CCConnectButton";
import { CCWeb3Context } from "../components/context/CCWeb3Provider";

export default function dApp() {
    const { CCWebProvider } = useContext(CCWeb3Context);
    //console.log(provider);
    return CCWebProvider === undefined ? (
        <div className="mt-5 items-center text-center sm:mt-0">
            <CCConnectButton />
        </div>
    ) : (
        <div>{CCWebProvider.toString()}</div>
    );
}
