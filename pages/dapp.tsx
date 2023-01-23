import CCConnectButton from "../components/CCConnectButton";
import CCWeb3Provider from "../components/context/CCWeb3Provider";

export default function dApp() {
    return (
        <div className="mt-5 sm:mt-0 text-center items-center">
            <CCConnectButton />
        </div>
    );
}
