/**
 * 1. Sort out interacting with the chrome wallet extensions, in window object most likely, will need to
 * useEffect and on load grab some values.
 * 2. Setup some basic provider functions like get Balance etc.
 * 3. Check chain ID? Probably just set it up to only work on mainnette and Goerlie to do some testing on.
 * 4. Start off with using Metamask and Gamestop wallet.
 *
 */

/**
 *
 * Below is a function used by web3Onboard, looks like it just uses the window.ethereum.providers like any other.
 *  function getInjectedInterface(
  identity: string,
  checkOtherProviderFlags?: boolean
): () => Promise<{ provider: EIP1193Provider }> {
  return async () => ({
    provider: (window.ethereum.providers &&
    Array.isArray(window.ethereum.providers)
      ? getInterfaceFromProvidersArray(identity, checkOtherProviderFlags)
      : window.ethereum) as EIP1193Provider
  })
}
 */

import Image from "next/image";
import { createContext, useEffect, useRef, useState } from "react";

export type Wallet = "metamask" | "gamestop" | null;

type CCWeb3Context = {
    connectProvider: (wallet: Wallet) => Promise<boolean>;
    showWalletModal: () => void;
};

interface ICCWeb3ProviderProps {
    children: React.ReactNode;
}

export const CCWeb3Context = createContext<CCWeb3Context>({} as CCWeb3Context);

export default function CCWeb3Provider({ children }: ICCWeb3ProviderProps) {
    const walletsDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {}, []);

    async function connectProvider(wallet: Wallet): Promise<boolean> {
        switch (wallet) {
            case "metamask": {
                if (typeof (window as any).ethereum !== "undefined") {
                    const eth = (window as any).ethereum;

                    try {
                        await eth.request({
                            method: "eth_requestAccounts",
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                break;
            }
            case "gamestop": {
                if (typeof (window as any).ethereum !== "undefined") {
                    const gs = (window as any).gamestop;

                    try {
                        await gs.request({
                            method: "eth_requestAccounts",
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }

        return true;
    }

    function showWalletModal() {
        walletsDiv.current!.classList.toggle("hidden");
    }

    return (
        <CCWeb3Context.Provider value={{ connectProvider, showWalletModal }}>
            <div className="relative">
                <div
                    ref={walletsDiv}
                    className="absolute z-50 h-screen w-screen backdrop-blur-md hidden font-bold text-lg text-lp-fore dark:text-dp-fore "
                >
                    <div className="h-screen min-w-[380px] p-3 sm:p-14 md:py-24 md:px-28 xl:px-52 2xl:py-24 2xl:px-80">
                        <div className="flex flex-col cursor-pointer p-12 rounded-lg shadow-2xl bg-lt-back dark:bg-dt-back">
                            <div
                                className="flex items-center p-12 space-x-10 justify-center hover:bg-dt-fore hover:dark:bg-lp-back/25"
                                onClick={() => {
                                    connectProvider("gamestop");
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
                                className="flex items-center p-12  space-x-10  justify-center hover:bg-dt-fore hover:dark:bg-lp-back/25"
                                onClick={() => {
                                    connectProvider("gamestop");
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
