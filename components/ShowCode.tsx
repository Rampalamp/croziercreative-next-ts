import Image from "next/image";
import React from "react";

interface IShowCodeProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    codeToShow: string;
}

export default function ShowCode({ codeToShow, className }: IShowCodeProps) {
    function showCode() {
        switch (codeToShow) {
            case "": {
                break;
            }
            case "": {
                break;
            }
            case "": {
                break;
            }
            default: {
                break;
            }
        }
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
