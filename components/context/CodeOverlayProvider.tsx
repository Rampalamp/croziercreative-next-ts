import { createContext, useState } from "react";

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

    return (
        <CodeOverlayContext.Provider
            value={{ codeOverlay, toggleOverlay, setOverlay }}
        >
            <div className="relative">
                {showOverlay ? (
                    <div className="absolute z-20 h-screen w-screen flex flex-col grow items-center justify-center backdrop-blur-md">
                        <div className="">
                            <div>testsetsetsetset</div>
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
