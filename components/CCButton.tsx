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
                className="hover:dark:shadow-cust-hover rounded-md bg-ls-back p-3 shadow-md hover:shadow-lt-fore dark:bg-dt-back hover:dark:shadow-dt-fore"
            >
                {children}
            </button>
        </div>
    );
}
