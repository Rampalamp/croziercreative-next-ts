/**
 * 1. Sort out interacting with the chrome wallet extensions, in window object most likely, will need to
 * useEffect and on load grab some values.
 * 2. Setup some basic provider functions like get Balance etc.
 * 3. Check chain ID? Probably just set it up to only work on mainnette and Goerlie to do some testing on.
 * 4. Start off with using Metamask and Gamestop wallet.
 *
 */

import { createContext, useEffect, useState } from "react";

type CCWeb3Context = {};

interface ICCWeb3ProviderProps {
    children: React.ReactNode;
}

export const CCWeb3Context = createContext<CCWeb3Context>({} as CCWeb3Context);

export default function CCWeb3Provider({ children }: ICCWeb3ProviderProps) {
    useEffect(() => {}, []);
    return <CCWeb3Provider>{children}</CCWeb3Provider>;
}
