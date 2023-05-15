import { createContext, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
    HeaderCode,
    IndexCode,
    SkillsCode,
    SkillCloudCode,
    AuditsCode,
    DappCode,
} from "../../constants/CodeSnippets";
import CCButton from "../CCButton";

export type CodeOverlay =
    | "header"
    | "index"
    | "skills"
    | "skillcloud"
    | "audits"
    | "dapp"
    | null;

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
    const [copyModalText, setCopyModalText] = useState<string>("");
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
            case "skills": {
                setCodeText(SkillsCode);
                break;
            }
            case "skillcloud": {
                setCodeText(SkillCloudCode);
                break;
            }
            case "audits": {
                setCodeText(AuditsCode);
                break;
            }
            case "dapp": {
                setCodeText(DappCode);
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
        if (navigator.clipboard) {
            navigator.clipboard.writeText(codeDiv.current!.textContent!);
            setCopyModalText("Code Copied!");
            setCopied(true);
        } else {
            setCopyModalText("Error!");
            setCopied(true);
        }
    }

    return (
        <CodeOverlayContext.Provider
            value={{ codeOverlay, toggleOverlay, setOverlay }}
        >
            <div className="relative">
                <div
                    ref={overlayDiv}
                    className="absolute z-50 hidden h-screen w-screen items-center justify-center backdrop-blur-md"
                >
                    <div className="flex h-screen min-w-[380px] flex-col p-3 sm:p-14 md:py-24 md:px-28 xl:px-52 2xl:py-24 2xl:px-80">
                        <div className="flex justify-end space-x-3">
                            <div
                                className={`rounded-md bg-ls-back bg-opacity-90 p-3 shadow-lg transition-all duration-[1500ms] ease-out dark:bg-dt-back dark:bg-opacity-90	 ${
                                    copied ? "opacity-100" : "opacity-0"
                                }`}
                                onTransitionEnd={() => setCopied(false)}
                            >
                                <span className="font-bold text-lt-fore  dark:text-dp-fore">
                                    {copyModalText}
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
                        <div className="mt-3 overflow-scroll rounded-md bg-dp-back p-4 shadow-2xl dark:bg-dt-back">
                            <div
                                ref={codeDiv}
                                dangerouslySetInnerHTML={{
                                    __html: codeText,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </CodeOverlayContext.Provider>
    );
}
