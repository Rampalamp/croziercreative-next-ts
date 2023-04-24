/**
 * 1. Sort out interacting with the chrome wallet extensions, in window object most likely, will need to
 * useEffect and on load grab some values.
 * 2. Setup some basic provider functions like get Balance etc.
 * 3. Check chain ID? Probably just set it up to only work on mainnette and Goerlie to do some testing on.
 * 4. Start off with using Metamask and Gamestop wallet.
 *
 */

import Image from "next/image";
import { createContext, useEffect, useRef, useState } from "react";
import CCButton from "../CCButton";
import { ethers } from "ethers";
import { BigNumber } from "ethers/lib/ethers";
import { CCProvider as CCP } from "../../classes/CCProvider";

export type Wallet = "metamask" | "gamestop" | null;

type CCWeb3Context = {
    connectProvider: (wallet: Wallet) => Promise<boolean>;
    toggleWalletModal: () => void;
    CCProvider: CCP | undefined;
};

interface ICCWeb3ProviderProps {
    children: React.ReactNode;
}

export const CCWeb3Context = createContext<CCWeb3Context>({} as CCWeb3Context);

export default function CCWeb3Provider({ children }: ICCWeb3ProviderProps) {
    const [CCProvider, setCCProvider] = useState<CCP>();

    const walletsDiv = useRef<HTMLDivElement>(null);

    async function connectProvider(wallet: Wallet): Promise<boolean> {
        switch (wallet) {
            case "metamask": {
                if (typeof (window as any).ethereum !== "undefined") {
                    let ccProvider = new CCP((window as any).ethereum);

                    try {
                        //check if wallet has been connected already, if not make run connect.
                        if (!ccProvider.ethereum.isConnected()) {
                            await ccProvider.connect();
                        }
                        setCCProvider(ccProvider);
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    return false;
                }
                break;
            }
            case "gamestop": {
                if (typeof (window as any).ethereum !== "undefined") {
                    //const gs = (window as any).gamestop;
                    let ccProvider = new CCP((window as any).gamestop);
                    try {
                        if (!ccProvider.ethereum.isConnected()) {
                            await ccProvider.connect();
                        }
                        setCCProvider(ccProvider);
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    return false;
                }
                break;
            }
        }

        toggleWalletModal();
        return true;
    }

    function toggleWalletModal() {
        walletsDiv.current!.classList.toggle("hidden");
    }

    return (
        <CCWeb3Context.Provider
            value={{ connectProvider, toggleWalletModal, CCProvider }}
        >
            <div className="relative">
                <div
                    ref={walletsDiv}
                    className="absolute z-50 hidden h-screen w-screen text-lg font-bold text-lp-fore backdrop-blur-md dark:text-dp-fore "
                >
                    <div className="h-screen min-w-[380px] p-3 sm:p-14 md:py-24 md:px-28 xl:px-52 2xl:py-24 2xl:px-80">
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
