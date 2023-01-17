import React from "react";

interface ICCButtonProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {}

export default function CCButton({
    className,
    onClick,
    children,
}: ICCButtonProps) {
    return (
        <div className={className}>
            <button
                onClick={onClick}
                className="rounded-md shadow-lg p-3 hover:bg-opacity-25 hover:dark:bg-opacity-25 hover:bg-lbtn-hov hover:dark:bg-dbtn-hov bg-ls-back dark:bg-dt-back"
            >
                {children}
            </button>
        </div>
    );
}
