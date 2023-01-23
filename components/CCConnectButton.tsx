import React, { useContext } from "react";
import { CCWeb3Context } from "./context/CCWeb3Provider";
import CCButton from "./CCButton";

interface IShowCodeButtonProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    > {}

export default function CCConnectButton({ className }: IShowCodeButtonProps) {
    const { showWalletModal } = useContext(CCWeb3Context);

    return (
        <CCButton
            className={className}
            onClick={showWalletModal}
            title="ShowCode"
        >
            CONNECT
        </CCButton>
    );
}
