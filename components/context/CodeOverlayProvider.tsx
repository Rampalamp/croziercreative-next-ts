import { createContext, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { HeaderCode, IndexCode } from "../../constants/CodeSnippets";
import CCButton from "../CCButton";

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
    const [codeText, setCodeText] = useState<string>("");
    const [copied, setCopied] = useState(false);
    const overlayDiv = useRef<HTMLDivElement>(null);
    const codeDiv = useRef<HTMLDivElement>(null);

    useMemo(() => {
        //setCodeText accordingly
        switch (codeOverlay) {
            case "header": {
                setCodeText(HeaderCode);
                break;
            }
            case "index": {
                setCodeText(IndexCode);
                break;
            }
        }
        if (typeof document !== "undefined") {
            const script = document.createElement("script");

            script.src =
                "https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js";
            document.body.append(script);
        }
    }, [codeOverlay]);

    function setOverlay(codeOverlay: CodeOverlay) {
        setCodeOverlay(codeOverlay);
    }

    function toggleOverlay() {
        overlayDiv.current!.classList.toggle("hidden");
        setCopied(false);
    }

    function copyCode() {
        navigator.clipboard.writeText(codeDiv.current!.textContent!);
        setCopied(true);
    }

    return (
        <CodeOverlayContext.Provider
            value={{ codeOverlay, toggleOverlay, setOverlay }}
        >
            <div className="relative">
                <div
                    ref={overlayDiv}
                    className="absolute z-50 h-screen w-screen items-center justify-center backdrop-blur-md hidden"
                >
                    <div className="flex flex-col h-screen min-w-[380px] p-3 sm:py-24 sm:px-28 xl:px-52 2xl:py-24 2xl:px-80">
                        <div className="flex space-x-3 justify-end">
                            <div
                                className={`rounded-md shadow-lg p-3 bg-opacity-90 dark:bg-opacity-90 bg-ls-back dark:bg-dt-back transition-all duration-[1500ms] ease-out	 ${
                                    copied ? "opacity-100" : "opacity-0"
                                }`}
                                onTransitionEnd={() => setCopied(false)}
                            >
                                <span className="font-bold text-ls-fore  dark:text-dp-fore">
                                    Code Copied!
                                </span>
                            </div>

                            <CCButton onClick={copyCode}>
                                <Image
                                    src="/copy.svg"
                                    width={20}
                                    height={20}
                                    alt="Copy svg"
                                />
                            </CCButton>

                            <CCButton onClick={toggleOverlay}>
                                <Image
                                    src="/x.svg"
                                    width={20}
                                    height={20}
                                    alt="X(Close) svg"
                                />
                            </CCButton>
                        </div>
                        <div className="mt-3 overflow-scroll p-4 rounded-md shadow-2xl bg-dp-back dark:bg-dt-back">
                            <div
                                ref={codeDiv}
                                dangerouslySetInnerHTML={{
                                    __html: codeText,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {children}
            </div>
        </CodeOverlayContext.Provider>
    );
}
