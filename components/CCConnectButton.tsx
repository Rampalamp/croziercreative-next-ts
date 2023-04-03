import React, { useContext } from "react";
import { CCWeb3Context } from "./context/CCWeb3Provider";
import CCButton from "./CCButton";

interface IShowCodeButtonProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    > {}

export default function CCConnectButton({ className }: IShowCodeButtonProps) {
    const { toggleWalletModal } = useContext(CCWeb3Context);

    return (
        <CCButton
            className={className}
            onClick={toggleWalletModal}
            title="ShowCode"
        >
            CONNECT
        </CCButton>
    );
}
