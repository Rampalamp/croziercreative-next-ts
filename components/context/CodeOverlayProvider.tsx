import { createContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HeaderCode } from "../CodeSnippets";

export type CodeOverlay = "header" | "index" | null;

type CodeOverlayContext = {
    codeOverlay: CodeOverlay;
    toggleOverlay: () => void;
    setOverlay: (codeOverlay: CodeOverlay) => void;
};

interface ICodeOverlayProviderProps {
    children: React.ReactNode;
}

export const CodeOverlayContext = createContext<CodeOverlayContext>(
    {} as CodeOverlayContext
);

export default function CodeOverlayProvider({
    children,
}: ICodeOverlayProviderProps) {
    const [codeOverlay, setCodeOverlay] = useState<CodeOverlay>(null);
    const [showOverlay, setShowOverlay] = useState(false);

    function setOverlay(codeOverlay: CodeOverlay) {
        setCodeOverlay(codeOverlay);
    }

    function toggleOverlay() {
        setShowOverlay(!showOverlay);
    }

    function copyCode() {
        //not sure how to do this just yet
    }

    function generateCode() {
        if (codeOverlay === "header") {
        }
    }

    return (
        <CodeOverlayContext.Provider
            value={{ codeOverlay, toggleOverlay, setOverlay }}
        >
            <div className="relative">
                {showOverlay ? (
                    <div className="absolute z-20 h-screen w-screen items-center justify-center backdrop-blur-md">
                        <div className="p-16">
                            <div className="flex flex-col">
                                <div className="flex space-x-3 justify-end">
                                    <button
                                        className="rounded-md shadow-lg p-3 hover:bg-opacity-25 hover:dark:bg-opacity-25 hover:bg-lbtn-hov hover:dark:bg-dbtn-hov bg-ls-back dark:bg-dt-back"
                                        onClick={copyCode}
                                    >
                                        <Image
                                            src="/copy.svg"
                                            width={20}
                                            height={20}
                                            alt="Copy svg"
                                        />
                                    </button>
                                    <button
                                        className="rounded-md shadow-lg p-3 hover:bg-opacity-25 hover:dark:bg-opacity-25 hover:bg-lbtn-hov hover:dark:bg-dbtn-hov bg-ls-back dark:bg-dt-back"
                                        onClick={toggleOverlay}
                                    >
                                        <Image
                                            src="/x.svg"
                                            width={20}
                                            height={20}
                                            alt="X(Close) svg"
                                        />
                                    </button>
                                </div>
                                <div className="markdown-body overflow-y-auto mt-3 p-4 rounded-md shadow-2xl bg-lt-back dark:bg-dt-back">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: HeaderCode,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                {children}
            </div>
        </CodeOverlayContext.Provider>
    );
}