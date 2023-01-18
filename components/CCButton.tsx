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
    title,
}: ICCButtonProps) {
    return (
        <div className={className}>
            <button
                title={title}
                onClick={onClick}
                className="rounded-md shadow-md hover:dark:shadow-cust-hover p-3 bg-ls-back dark:bg-dt-back hover:shadow-lt-fore hover:dark:shadow-dt-fore"
            >
                {children}
            </button>
        </div>
    );
}
