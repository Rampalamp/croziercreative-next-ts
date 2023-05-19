import Image from "next/image";
import { createContext, useRef, useState } from "react";
import CCButton from "../CCButton";
import { CCProvider as CCP } from "../../classes/CCProvider";

export type Wallet = "metamask" | "gamestop" | null;

type CCWeb3Context = {
    connectProvider: (wallet: Wallet) => Promise<boolean>;
    toggleWalletModal: () => void;
    walletExists: () => boolean;
    isAccountConnected: (wallet: Wallet) => boolean;
    isWalletUnlocked: (wallet: Wallet) => boolean;
    CCProvider: CCP | undefined;
};

interface ICCWeb3ProviderProps {
    children: React.ReactNode;
}

export const CCWeb3Context = createContext<CCWeb3Context>({} as CCWeb3Context);

export default function CCWeb3Provider({ children }: ICCWeb3ProviderProps) {
    const [CCProvider, setCCProvider] = useState<CCP>();

    const walletsDiv = useRef<HTMLDivElement>(null);
    /**
     * Takes a wallet type and attempts to create a CCProvider and connect/request
     * permissions from specified wallet. Only setup for gamestop or metamask currently.
     * @param wallet Wallet type, gamestop or metamask
     * @returns true/false if successfully connected or not
     */
    async function connectProvider(wallet: Wallet): Promise<boolean> {
        let ccProvider: CCP | undefined = undefined;
        switch (wallet) {
            case "metamask": {
                if (typeof (window as any).ethereum !== "undefined") {
                    ccProvider = new CCP((window as any).ethereum, wallet);
                } else {
                    return false;
                }
                break;
            }
            case "gamestop": {
                if (typeof (window as any).gamestop !== "undefined") {
                    ccProvider = new CCP((window as any).gamestop, wallet);
                } else {
                    return false;
                }
                break;
            }
        }

        if (ccProvider !== undefined) {
            try {
                if (
                    !isWalletUnlocked(ccProvider.wallet) ||
                    !isAccountConnected(ccProvider.wallet)
                ) {
                    await ccProvider.connect();
                }
                if (
                    isWalletUnlocked(ccProvider.wallet) &&
                    isAccountConnected(ccProvider.wallet)
                ) {
                    await ccProvider.initializeProvider();
                }
                setCCProvider(ccProvider);
            } catch (error) {
                console.log(error);
            }
        }

        return true;
    }

    /**
     * Checks to see if a gamestop or ethereum injected object exists in the window browser
     * @returns Returns true if either a window.gamestop or window.ethereum object exists
     */
    function walletExists(): boolean {
        if (
            typeof (window as any).ethereum !== "undefined" ||
            typeof (window as any).gamestop !== "undefined"
        ) {
            return true;
        }
        return false;
    }
    /**
     * Checks if the parameter wallet is connected to the dapp
     * gamestop checks the .connected property
     * metamask just checks if a selectedAddress exists or not null.
     * @param wallet Type of wallet to check
     * @returns true/false if checked wallet is connected
     */
    function isAccountConnected(wallet: Wallet): boolean {
        //gamestop works a bit differently, can't just check selectedAddress
        //it returns an error, works fine for metamask though
        //the two wallets seem to use the connected/IsConnected() feature/events differently
        if (wallet === "gamestop") {
            return (window as any).gamestop.connected as boolean;
        } else if (wallet === "metamask") {
            return (window as any).ethereum.selectedAddress !== null
                ? true
                : false;
        }
        return false;
    }

    /**
     * Checks if the parameter wallet is unlocked for use by the dapp.
     * @param wallet Type of wallet to check
     * @returns true/false if checked wallet is unlocked
     */
    function isWalletUnlocked(wallet: Wallet): boolean {
        //return first unlocked wallet.
        if (wallet === "metamask") {
            return (window as any).ethereum._state.isUnlocked;
        } else if (wallet === "gamestop") {
            //gamestop wallet seems to not actually update the embedded window object
            //so after locking it, gamestop.isUnlocked will return true still
            //until the window is refreshed.
            return (window as any).gamestop.isUnlocked;
        }

        return false;
    }
    /**
     * Shows or hides the wallet modal to select from.
     */
    function toggleWalletModal() {
        walletsDiv.current!.classList.toggle("hidden");
    }

    return (
        <CCWeb3Context.Provider
            value={{
                connectProvider,
                toggleWalletModal,
                walletExists,
                isAccountConnected,
                isWalletUnlocked,
                CCProvider,
            }}
        >
            <div className="relative">
                <div
                    ref={walletsDiv}
                    className="absolute z-50 hidden h-screen w-screen text-lg font-bold text-lp-fore backdrop-blur-md dark:text-dp-fore "
                >
                    <div className="sticky top-[10%] p-3 sm:p-14 md:py-24 md:px-28 xl:px-52 2xl:py-24 2xl:px-80">
                        <div className="mb-3 flex justify-end">
                            <CCButton onClick={toggleWalletModal}>
                                <Image
                                    src="/x.svg"
                                    width={20}
                                    height={20}
                                    alt="X(Close) svg"
                                />
                            </CCButton>
                        </div>
                        <div className="flex cursor-pointer flex-col rounded-lg bg-lt-back p-12 shadow-2xl dark:bg-dt-back">
                            <div
                                className="flex items-center justify-center space-x-10 p-12 hover:bg-dt-fore hover:dark:bg-lp-back/25"
                                onClick={() => {
                                    connectProvider("metamask");
                                    toggleWalletModal();
                                }}
                            >
                                <Image
                                    className="h-auto w-auto"
                                    src={"/meta-mask.svg"}
                                    alt={"MetaMask Wallet"}
                                    width={30}
                                    height={30}
                                />
                                <div>MetaMask</div>
                            </div>
                            <div
                                className="flex items-center justify-center  space-x-10  p-12 hover:bg-dt-fore hover:dark:bg-lp-back/25"
                                onClick={() => {
                                    connectProvider("gamestop");
                                    toggleWalletModal();
                                }}
                            >
                                <Image
                                    className="h-auto w-auto"
                                    src={"/gs.svg"}
                                    alt={"GameStop Wallet"}
                                    width={30}
                                    height={30}
                                />
                                <div>GameStop</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </CCWeb3Context.Provider>
    );
}
