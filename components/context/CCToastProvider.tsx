import { createContext, useRef, useState } from "react";
import Image from "next/image";

export type ToastType = "success" | "error" | "warning" | null;

type CCToastContext = {
    runToaster: (toastType: ToastType, message: string) => void;
};

interface ICCToastProviderProps {
    children: React.ReactNode;
}

export const CCToastContext = createContext<CCToastContext>(
    {} as CCToastContext
);

export default function CCToastProvider({ children }: ICCToastProviderProps) {
    const toasterImgDiv = useRef<HTMLImageElement>(null);

    const [srText, setSrText] = useState<string>("");
    const [toastText, setToastText] = useState<string>("");
    const [showToast, setShowToast] = useState<boolean>(false);

    function runToaster(toastType: ToastType, message: string) {
        setSrText(toastType as string);
        setToastText(message);

        if (toastType === "success") {
            toasterImgDiv.current!.setAttribute("src", "/toaster-success.svg");
        } else if (toastType === "error") {
            toasterImgDiv.current!.setAttribute("src", "/toaster-error.svg");
        } else if (toastType === "warning") {
            toasterImgDiv.current!.setAttribute("src", "/toaster-warning.svg");
        }

        setShowToast(true);
    }

    return (
        <CCToastContext.Provider value={{ runToaster }}>
            <div
                role="alert"
                className={`mb-6 flex w-full items-center space-x-4 divide-x rounded-lg bg-lt-back p-4 text-base shadow-2xl transition-all duration-[3500ms] ease-out dark:bg-dp-back ${
                    showToast ? "opacity-100" : "opacity-0"
                }`}
                onTransitionEnd={() => setShowToast(false)}
            >
                <div className="inline-flex flex-shrink-0 items-center justify-center">
                    <Image
                        ref={toasterImgDiv}
                        src="/toaster-success.svg"
                        alt="Toaster Icon"
                        width={32}
                        height={32}
                        title="ToasterIcon"
                    />
                    <span
                        className="
                sr-only"
                    >
                        {srText}
                    </span>
                </div>

                <div>
                    <span className="pl-4">{toastText}</span>
                </div>
            </div>
            {children}
        </CCToastContext.Provider>
    );
}
