import Image from "next/image";
import React, { useContext, useState } from "react";
import { CodeOverlayContext, CodeOverlay } from "./context/CodeOverlayProvider";

interface IShowCodeButtonProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
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
        <div className={className}>
            <button
                className="rounded-md shadow-lg p-3 hover:bg-opacity-25 hover:dark:bg-opacity-25 hover:bg-lbtn-hov hover:dark:bg-dbtn-hov bg-ls-back dark:bg-dt-back"
                onClick={showCode}
            >
                <Image src="/code.svg" width={20} height={20} alt="Code svg" />
            </button>
        </div>
    );
}
