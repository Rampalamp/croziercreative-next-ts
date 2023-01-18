import Image from "next/image";
import React, { useContext } from "react";
import { CodeOverlayContext, CodeOverlay } from "./context/CodeOverlayProvider";
import CCButton from "./CCButton";

interface IShowCodeButtonProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    > {
    codeToShow: string;
}

export default function ShowCodeButton({
    codeToShow,
    className,
}: IShowCodeButtonProps) {
    const { codeOverlay, toggleOverlay, setOverlay } =
        useContext(CodeOverlayContext);

    function showCode() {
        codeToShow !== codeOverlay ? setOverlay(codeToShow as CodeOverlay) : {};
        toggleOverlay();
    }
    return (
        <CCButton className={className} onClick={showCode} title="ShowCode">
            <Image src="/code.svg" width={20} height={20} alt="Code svg" />
        </CCButton>
    );
}
