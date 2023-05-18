import React, { useState } from "react";

interface ICCButtonProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    useProgress?: boolean;
}

export default function CCButton({
    className,
    onClick,
    children,
    title,
    useProgress,
}: ICCButtonProps) {
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const handleClick = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (onClick && useProgress) {
            setShowLoading(true);
            try {
                await onClick(event);
            } finally {
                setShowLoading(false);
            }
        } else {
            if (onClick) await onClick(event);
        }
    };
    return (
        <div className={className}>
            {showLoading ? (
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            ) : (
                <button
                    title={title}
                    onClick={handleClick}
                    className="hover:dark:shadow-cust-hover rounded-md bg-ls-back p-3 shadow-md hover:shadow-lt-fore dark:bg-dt-back hover:dark:shadow-dt-fore"
                >
                    {children}
                </button>
            )}
        </div>
    );
}
