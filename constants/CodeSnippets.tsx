export const HeaderCode: string = `<pre><code class="prettyprint language-typescript">import Link from &quot;next/link&quot;;
import Image from &quot;next/image&quot;;
import { useEffect, useContext, useRef } from &quot;react&quot;;
import { ThemeContext } from &quot;./context/ThemeProvider&quot;;
import ShowCodeButton from &quot;./ShowCodeButton&quot;;
import CCButton from &quot;./CCButton&quot;;
import CCMenuIcon from &quot;./CCMenuIcon&quot;;
import { NavOptions } from &quot;../constants/Generics&quot;;
import CCThemeIcon from &quot;./CCThemeIcon&quot;;

let themeIconDiv: HTMLElement | null;
//attempting to useRef the menuSvg was being troublesome so just grabbing it like rootDiv
let menuSvg: HTMLElement | null;

export default function Header() {
    const { theme } = useContext(ThemeContext);

    const gitSvg = useRef&lt;HTMLImageElement&gt;(null);
    const linkedSvg = useRef&lt;HTMLImageElement&gt;(null);
    const sideNav = useRef&lt;HTMLDivElement&gt;(null);

    useEffect(() =&gt; {
        menuSvg === undefined
            ? (menuSvg = document.getElementById(&quot;burg&quot;))
            : {};
        themeIconDiv === undefined
            ? (themeIconDiv = document.getElementById(&quot;ThemeIconDiv&quot;))
            : {};

        //adjust element attributes accordingly.
        if (theme === &quot;dark&quot;) {
            linkedSvg.current!.setAttribute(&quot;src&quot;, &quot;/linkedin-dark.svg&quot;);
            gitSvg.current!.setAttribute(&quot;src&quot;, &quot;/github-dark.svg&quot;);
        } else {
            linkedSvg.current!.setAttribute(&quot;src&quot;, &quot;/linkedin.svg&quot;);
            gitSvg.current!.setAttribute(&quot;src&quot;, &quot;/github.svg&quot;);
        }
    }, [theme]);

    function toggleSideNav() {
        //for some strange reason toggling for left-0 wasn&#39;t working
        //toggling -left-36 did work though, not sure why its acting like this.
        sideNav.current!.classList.toggle(&quot;-left-36&quot;);
        //animate the menuSvg on open.
        menuSvg!.classList.toggle(&quot;is-opened&quot;);
    }

    return (
        &lt;div className=&quot;sticky top-0 z-40 w-full text-lt-fore dark:text-ds-fore&quot;&gt;
            &lt;nav className=&quot; flex flex-nowrap items-center p-3 drop-shadow-xl backdrop-blur lg:px-32 xl:px-60 2xl:px-80&quot;&gt;
                &lt;div className=&quot;mr-4 flex grow items-center&quot;&gt;
                    &lt;span className=&quot;hidden text-xl font-extrabold sm:block&quot;&gt;
                        &lt;Link href=&quot;/&quot; title=&quot;CrozierCreative&quot;&gt;
                            CrozierCreative
                        &lt;/Link&gt;
                    &lt;/span&gt;
                    &lt;span className=&quot;block text-3xl font-extrabold sm:hidden&quot;&gt;
                        &lt;Link href=&quot;/&quot; title=&quot;CrozierCreative&quot;&gt;
                            CC
                        &lt;/Link&gt;
                    &lt;/span&gt;
                    &lt;div className=&quot;ml-3  flex min-h-fit min-w-fit space-x-2&quot;&gt;
                        &lt;a
                            target=&quot;_blank&quot;
                            href=&quot;https://www.linkedin.com/in/matthew-rampen-7883b5b1/&quot;
                            rel=&quot;noopener noreferrer&quot;
                        &gt;
                            &lt;Image
                                ref={linkedSvg}
                                src=&quot;/linkedin-dark.svg&quot;
                                alt=&quot;LinkedIn URL&quot;
                                width={20}
                                height={20}
                                title=&quot;LinkedIn.&quot;
                            /&gt;
                        &lt;/a&gt;
                        &lt;a
                            target=&quot;_blank&quot;
                            href=&quot;https://github.com/Rampalamp&quot;
                            rel=&quot;noopener noreferrer&quot;
                        &gt;
                            &lt;Image
                                ref={gitSvg}
                                src=&quot;/github-dark.svg&quot;
                                alt=&quot;GitHub URL&quot;
                                width={20}
                                height={20}
                                title=&quot;GitHub&quot;
                            /&gt;
                        &lt;/a&gt;
                    &lt;/div&gt;
                &lt;/div&gt;

                {/**Nav options for medium and up screen sizes */}
                &lt;div className=&quot;hidden text-lg  font-bold sm:block md:mr-12&quot;&gt;
                    &lt;ul className=&quot;flex space-x-4 md:space-x-8 lg:space-x-10 xl:space-x-12 2xl:space-x-20&quot;&gt;
                        &lt;NavOptions /&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;

                {/**Menu icon for small screen size */}

                &lt;div className=&quot;flex space-x-3&quot;&gt;
                    &lt;div className=&quot;min-h-fit min-w-fit sm:hidden&quot;&gt;
                        &lt;CCButton onClick={toggleSideNav} title=&quot;Menu&quot;&gt;
                            &lt;CCMenuIcon /&gt;
                        &lt;/CCButton&gt;
                    &lt;/div&gt;
                    &lt;div className=&quot;min-h-fit min-w-fit&quot;&gt;
                        &lt;CCButton
                            onClick={() =&gt; {
                                themeIconDiv?.classList.toggle(&quot;spinTheme&quot;);
                            }}
                            title=&quot;ThemeToggle&quot;
                        &gt;
                            {/* CCThemeIcon triggers the toggleTheme function using onAnimationEnd event
                                So toggling spinTheme starts the animation inside CCThemeIcon, which in turn calls toggleTheme
                            */}
                            &lt;CCThemeIcon /&gt;
                        &lt;/CCButton&gt;
                    &lt;/div&gt;
                    &lt;div className=&quot;min-h-fit min-w-fit&quot;&gt;
                        &lt;ShowCodeButton codeToShow=&quot;header&quot; /&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/nav&gt;
            &lt;nav className=&quot;relative&quot;&gt;
                {/**Nav options for small screen format */}

                &lt;div
                    ref={sideNav}
                    className=&quot;absolute top-12 -left-36 left-0 rounded-md text-lg font-bold backdrop-blur transition-all duration-500 sm:hidden&quot;
                &gt;
                    &lt;ul className=&quot;space-y-10 p-7&quot;&gt;
                        &lt;NavOptions /&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;
            &lt;/nav&gt;
        &lt;/div&gt;
    );
}
</code></pre>
`;
export const IndexCode: string = `<pre><code class="prettyprint language-typescript">import Image from &quot;next/image&quot;;
import Link from &quot;next/link&quot;;
import ShowCodeButton from &quot;../components/ShowCodeButton&quot;;

export default function Home() {
    return (
        &lt;div className=&quot;mt-5 items-center text-center sm:mt-0 &quot;&gt;
            &lt;div&gt;
                &lt;div className=&quot;grid grid-cols-2 p-3&quot;&gt;
                    &lt;div className=&quot;m-auto skew-y-12 text-left&quot;&gt;
                        {/**make-transparent is not a tailwind class, it is my work around, exists in globals.css */}
                        &lt;span className=&quot;make-transparent bg-gradient-to-r from-dp-back to-dp-fore bg-clip-text text-6xl uppercase dark:from-lp-back dark:to-lp-fore sm:text-8xl lg:text-9xl&quot;&gt;
                            Hey.
                        &lt;/span&gt;
                        &lt;br /&gt;
                        &lt;span className=&quot;make-transparent bg-gradient-to-r from-ds-fore to-ds-back bg-clip-text text-5xl uppercase dark:from-ls-back dark:to-ls-fore sm:text-7xl lg:text-8xl&quot;&gt;
                            Hello.
                        &lt;/span&gt;
                        &lt;br /&gt;
                        &lt;span className=&quot;make-transparent whitespace-nowrap bg-gradient-to-r from-dt-back to-dt-fore bg-clip-text text-4xl uppercase dark:from-lt-back dark:to-lt-fore sm:text-6xl lg:text-7xl&quot;&gt;
                            Hi there.
                        &lt;/span&gt;
                    &lt;/div&gt;
                    &lt;div className=&quot;mt-auto mb-auto ml-6 xs:m-auto&quot;&gt;
                        &lt;Image
                            className=&quot;h-auto w-auto rounded-full&quot;
                            src=&quot;/zuko.png&quot;
                            width={250}
                            height={250}
                            alt=&quot;Menu drop down&quot;
                        /&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;br /&gt;
            &lt;br /&gt;
            &lt;div&gt;
                &lt;span className=&quot;text-xl font-extrabold &quot;&gt;
                    My name is Matthew, that&#39;s my dog Zuko, and this is my
                    website. I hope you enjoy and interact (Look for{&quot; &quot;}
                    &lt;ShowCodeButton codeToShow=&quot;index&quot; className=&quot;inline&quot; /&gt; to
                    view some components source code, to see everything visit my{&quot; &quot;}
                    &lt;a
                        className=&quot;underline hover:text-dp-back hover:dark:text-ls-fore&quot;
                        target=&quot;_blank&quot;
                        href=&quot;https://github.com/Rampalamp&quot;
                        rel=&quot;noopener noreferrer&quot;
                    &gt;
                        GitHub
                    &lt;/a&gt;
                    !).
                &lt;/span&gt;
                &lt;br /&gt;
                &lt;br /&gt;I am a full stack software engineer with a passion for
                building scalable and efficient applications, please see{&quot; &quot;}
                &lt;Link
                    className=&quot;underline hover:text-dp-back hover:dark:text-ls-fore&quot;
                    href=&quot;/skills&quot;
                &gt;
                    Skills
                &lt;/Link&gt;{&quot; &quot;}
                for more specific experience. With a strong foundation in
                software engineering and a desire to constantly learn and
                improve, I have set my phasers to &#39;love me&#39;
                &lt;span className=&quot;italic&quot;&gt; as well as &lt;/span&gt;
                blockchain development / technologies. Feel free to connect and
                play around in the{&quot; &quot;}
                &lt;Link
                    className=&quot;underline hover:text-dp-back hover:dark:text-ls-fore&quot;
                    href=&quot;/dapp&quot;
                &gt;
                    dApp
                &lt;/Link&gt;{&quot; &quot;}
                page. I am also interested in Smart Contract auditing, with that
                being said, I am currently offering free Smart Contract audits.
                Please visit{&quot; &quot;}
                &lt;Link
                    className=&quot;underline hover:text-dp-back hover:dark:text-ls-fore&quot;
                    href=&quot;/audits&quot;
                &gt;
                    Audits
                &lt;/Link&gt;{&quot; &quot;}
                for more details.
            &lt;/div&gt;
        &lt;/div&gt;
    );
}
</code></pre>
`;
export const SkillsCode: string = `<pre><code class="prettyprint language-typescript">import SkillCloud from &quot;../components/SkillCloud&quot;;
import SkillsProvider from &quot;../components/context/SkillsProvider&quot;;
import ShowCodeButton from &quot;../components/ShowCodeButton&quot;;

export default function Skills() {
    return (
        &lt;div className=&quot;mt-5 items-center text-center sm:mt-0&quot;&gt;
            &lt;SkillsProvider&gt;
                &lt;div className=&quot;&quot;&gt;
                    I am comfortable working on both the front-end and back-end
                    aspects of an application and have an understanding of the
                    entire development process, from ideation to deployment. I
                    am also experienced working in agile development
                    environments and am skilled at communicating with both
                    technical and non-technical stakeholders. Click on the
                    skills below to see more specifics!{&quot; &quot;}
                    &lt;ShowCodeButton codeToShow=&quot;skills&quot; className=&quot;inline&quot; /&gt;
                &lt;/div&gt;
                &lt;div className=&quot;mt-20&quot;&gt;
                    &lt;SkillCloud /&gt;
                &lt;/div&gt;
            &lt;/SkillsProvider&gt;
        &lt;/div&gt;
    );
}
</code></pre>
`;
export const SkillCloudCode: string = `<pre><code class="prettyprint language-typescript">import {
    HardHat,
    Solidity,
    Ethereum,
    GraphQL,
    SQL,
    Azure,
    CSharp,
    TypeScript,
} from &quot;../constants/Svgs&quot;;
import ShowCodeButton from &quot;./ShowCodeButton&quot;;
import { SkillsContext, Skill } from &quot;./context/SkillsProvider&quot;;
import { useContext } from &quot;react&quot;;

//1. Create a grid large enough to scatter skill SVGs
//2. Add on hover animation/transition
//3. on click give some sort of information about experience.
export default function SkillCloud() {
    const { skill, setSkill, toggleSkill } = useContext(SkillsContext);

    function ShowSkill(skillToShow: Skill) {
        skillToShow !== skill ? setSkill(skillToShow) : {};
        toggleSkill();
    }
    return (
        &lt;div className=&quot;grid grid-cols-3 grid-rows-3&quot;&gt;
            {/* Supposedly applying padding to the any grid element applies it to all */}
            &lt;div
                className=&quot;myOrbit speedFast m-auto p-5&quot;
                onClick={() =&gt; ShowSkill(&quot;blockchain&quot;)}
            &gt;
                &lt;HardHat /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;myOrbit speedSlow m-auto&quot;
                onClick={() =&gt; ShowSkill(&quot;blockchain&quot;)}
            &gt;
                &lt;Solidity /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;myOrbit speedMedium m-auto&quot;
                onClick={() =&gt; ShowSkill(&quot;blockchain&quot;)}
            &gt;
                &lt;Ethereum /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;myOrbit speedSlow m-auto&quot;
                onClick={() =&gt; ShowSkill(&quot;graph&quot;)}
            &gt;
                &lt;GraphQL /&gt;
            &lt;/div&gt;
            &lt;div className=&quot;myOrbit speedFast m-auto&quot;&gt;
                &lt;ShowCodeButton codeToShow=&quot;skillcloud&quot; /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;myOrbit speedFast m-auto p-5&quot;
                onClick={() =&gt; ShowSkill(&quot;sql&quot;)}
            &gt;
                &lt;SQL /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;myOrbit speedFast m-auto&quot;
                onClick={() =&gt; ShowSkill(&quot;azure&quot;)}
            &gt;
                &lt;Azure /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;myOrbit speedMedium m-auto&quot;
                onClick={() =&gt; ShowSkill(&quot;cs&quot;)}
            &gt;
                &lt;CSharp /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;myOrbit speedSlow m-auto&quot;
                onClick={() =&gt; ShowSkill(&quot;ts&quot;)}
            &gt;
                &lt;TypeScript /&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    );
}
</code></pre>
`;
export const AuditsCode: string = `<pre><code class="prettyprint language-typescript">import ShowCodeButton from &quot;../components/ShowCodeButton&quot;;

export default function Audits() {
    return (
        &lt;div className=&quot;text-center&quot;&gt;
            Smart contracts are open for the world to see, and can be called by
            anyone, or even other smart contracts. They often handle large
            amounts of value, and a security breach can have severe consequences
            (check out the running{&quot; &quot;}
            &lt;a
                className=&quot;underline hover:text-dp-back hover:dark:text-ls-fore&quot;
                target=&quot;_blank&quot;
                href=&quot;https://rekt.news/leaderboard/&quot;
                rel=&quot;noopener noreferrer&quot;
            &gt;
                leaderboard
            &lt;/a&gt;
            ). Audits help ensure that the smart contract is secure and functions
            as intended, protecting the assets and interests of all parties involved.
            Additionally, Audits give credibility to the project and increase the
            trust of the users and investors, which is vital in such a new and rapidly
            evolving field.
            &lt;br /&gt;
            &lt;br /&gt;I am interested in gaining experience in this sector, and with
            that being said, CrozierCreative is offering free smart contract audits!
            Now, it is generally good practice to obtain multiple audits of your
            project before deploying to a live chain, but since I am also new to
            this sector, I would reccommend you do not count my audits (yet, at least)
            as reputable.
            &lt;br /&gt;
            &lt;br /&gt;
            If you are interested, please send a message to{&quot; &quot;}
            &lt;a
                className=&quot;underline hover:text-dp-back hover:dark:text-ls-fore&quot;
                href=&quot;mailto:croziercreative@gmail.com?subject = Smart Contract Audit&quot;
            &gt;
                &lt;span className=&quot;italic&quot;&gt;croziercreative@gmail.com&lt;/span&gt;
            &lt;/a&gt;{&quot; &quot;}
            and we can get in touch. As you can probably guess, a proper audit
            requires back and forth between the developer and auditor. It is
            paramount that I understand exactly what you want your code to do to
            perform a proper audit. Depending the size of the project I may also
            request unit tests be written, if they weren&#39;t already.
            &lt;br /&gt;
            &lt;br /&gt;
            &lt;ShowCodeButton codeToShow=&quot;audits&quot; /&gt;
        &lt;/div&gt;
    );
}
</code></pre>
`;
export const DappCode: string = `<pre><code class="prettyprint language-typescript">import { useContext, useEffect, useState } from &quot;react&quot;;
import CCButton from &quot;../components/CCButton&quot;;
import CCConnectButton from &quot;../components/CCConnectButton&quot;;
import { CCToastContext } from &quot;../components/context/CCToastProvider&quot;;
import { CCWeb3Context, Wallet } from &quot;../components/context/CCWeb3Provider&quot;;
import ShowCodeButton from &quot;../components/ShowCodeButton&quot;;
import {
    XENFLEX_HHLOCAL,
    XENFLEX_MAINNET,
    XEN_HHLOCAL,
    XEN_MAINNET,
} from &quot;../constants/SmartContracts&quot;;
import { MintInfo } from &quot;../types/XENTypes&quot;;
import { decode32ByteHexString } from &quot;../utils/EVMHelper&quot;;

export default function dApp() {
    const {
        CCProvider,
        connectProvider,
        walletExists,
        isAccountConnected,
        isWalletUnlocked,
    } = useContext(CCWeb3Context);
    const { runToaster } = useContext(CCToastContext);
    const [account, setAccount] = useState&lt;string&gt;(&quot;0x0&quot;);
    const [balance, setBalance] = useState&lt;string&gt;(&quot;0&quot;);
    const [chainName, setChainName] = useState&lt;string&gt;(&quot;&quot;);
    const [walletFound, setWalletFound] = useState&lt;boolean&gt;(false);
    const [mintInfo, setMintInfo] = useState&lt;MintInfo&gt;();
    const [isRankMinted, setIsRankMinted] = useState&lt;boolean&gt;(false);
    const [maxTerm, setMaxTerm] = useState&lt;number&gt;(0);
    const [term, setTerm] = useState&lt;number&gt;(0);

    //Initial effect on load to handle wallet checks.
    useEffect(() =&gt; {
        if (walletExists()) {
            setWalletFound(true);

            if (CCProvider === undefined) {
                //check for unlocked metamask first, then gamestop.
                if (isWalletUnlocked(&quot;metamask&quot;)) {
                    connectProvider(&quot;metamask&quot;);
                } else if (isWalletUnlocked(&quot;gamestop&quot;)) {
                    connectProvider(&quot;gamestop&quot;);
                }
            }
        } else {
            setWalletFound(false);
        }
    }, []);

    //account based effects, when account has been set, call some smart contracts for information.
    useEffect(() =&gt; {
        //if account is set, get MaxTerm and check to see if MintInfo exists for address.
        if (account !== &quot;0x0&quot;) {
            getMaxTerm();

            getUserMintInfo();
        }
    }, [account]);

    //mintInfo based effects, when mintInfo has been set query xenFlex to check if cRank has been minted.
    useEffect(() =&gt; {
        async function queryXenFlex() {
            await queryXenFlexTokenId();
        }
        if (mintInfo !== undefined) {
            queryXenFlex();
        } else {
            setIsRankMinted(false);
        }
    }, [mintInfo]);

    //Initial set of CCProvider, when its set grab accounts and balances, and setup an event for accounts changed.
    useEffect(() =&gt; {
        if (CCProvider?.ethereum !== undefined) {
            //setup initial account/balance values.
            //I made them a useState object because updating the CCProvider properties weren&#39;t triggering a component update.
            //I thought this useEffect would trigger when the properties of CCProvider change, but it seems not.
            setAccount(CCProvider.account);
            setBalance(CCProvider.balance);
            setChainName(CCProvider.chainName);

            CCProvider.ethereum.on(&quot;accountsChanged&quot;, handleAccountsChanged);
            CCProvider.ethereum.on(&quot;chainChanged&quot;, handleChainChanged);
            if (CCProvider.wallet === &quot;gamestop&quot;) {
                CCProvider.ethereum.on(&quot;disconnect&quot;, handleDisconnect);
            }
        }
        return () =&gt; {
            CCProvider?.ethereum.removeListener(
                &quot;accountsChanged&quot;,
                handleAccountsChanged
            );
            CCProvider?.ethereum.removeListener(
                &quot;chainChanged&quot;,
                handleChainChanged
            );
            if (CCProvider?.wallet === &quot;gamestop&quot;) {
                CCProvider.ethereum.removeListener(
                    &quot;disconnect&quot;,
                    handleDisconnect
                );
            }
        };
    }, [CCProvider]);
    /**
     * Handles disconnect event, this is primarily just for gamestop wallet
     * as far as I can tell. Metamask handles disconnects a little differently.
     * With metamask we can just check if there is a selectedAddress.
     * With gamestop the selectedAddress turns into an error, metamask its just null.
     * the disconnect event for metamask is due to no connection to the RPC url.
     */
    async function handleDisconnect() {
        CCProvider!.account = &quot;0x0&quot;;

        setAccount(&quot;0x0&quot;);
        setBalance(&quot;0&quot;);
    }

    /**
     * Handles account changes on wallet and sets various state objects accordingly.
     */
    async function handleAccountsChanged() {
        if (CCProvider !== undefined) {
            //change values in provider AND local useState values for account/balance.

            CCProvider.account = CCProvider.ethereum.selectedAddress;
            //if CCProvider.account === null, assume all accounts are disconnected
            //setAccount and setBalance accordingly.
            if (CCProvider.account === null) {
                setAccount(&quot;0x0&quot;);
                setBalance(&quot;0&quot;);
                return;
            }

            //if CCProvider.account !== null get balance and set account/balance.
            CCProvider.balance = await CCProvider.getBalance(
                CCProvider.account
            );

            setAccount(CCProvider.account);
            setBalance(CCProvider.balance);
        }
    }
    /**
     * Handles change of chains, only acceptable chains currently
     * are Ethereum Mainnet and Hardhat Local Node
     */
    async function handleChainChanged() {
        if (CCProvider !== undefined) {
            CCProvider.chainId = await CCProvider.getChainId();
            CCProvider.chainName = await CCProvider.getChainName(
                CCProvider.chainId
            );

            setChainName(CCProvider.chainName);
        }
    }

    /**
     * This iterates over the MintInfo property keys, populating a MintInfo object.
     * It then calls the setMintInfo state function.
     * Since our type MintInfo has exact same structure as the struct
     * in XENCrypto.sol, we use data[i] as our data to decode.
     * There is probably a more graceful way of doing this
     * but this is okay for now.
     * @param data array of 64 char long hex strings (32 byte hex strings)
     */
    function setUserMintInfo(data: string[]) {
        //create local userMintInfo to populate
        const userMintInfo: MintInfo = {
            user: &quot;&quot;,
            term: 0,
            maturityTs: 0,
            rank: 0,
            amplifier: 0,
            eaaRate: 0,
        };

        const props = Object.keys(userMintInfo) as (keyof MintInfo)[];

        for (let i = 0; i &lt; props.length; i++) {
            const prop: keyof MintInfo = props[i];
            if (prop === &quot;user&quot;) {
                userMintInfo.user = decode32ByteHexString(
                    data[i],
                    &quot;address&quot;
                ) as string;
            } else if (prop === &quot;term&quot;) {
                userMintInfo[prop] = decode32ByteHexString(
                    data[i],
                    &quot;number&quot;
                ) as number;
            } else if (prop === &quot;maturityTs&quot;) {
                userMintInfo[prop] = decode32ByteHexString(
                    data[i],
                    &quot;number&quot;
                ) as number;
            } else if (prop === &quot;rank&quot;) {
                userMintInfo[prop] = decode32ByteHexString(
                    data[i],
                    &quot;number&quot;
                ) as number;
            } else if (prop === &quot;amplifier&quot;) {
                userMintInfo[prop] = decode32ByteHexString(
                    data[i],
                    &quot;number&quot;
                ) as number;
            } else if (prop === &quot;eaaRate&quot;) {
                userMintInfo[prop] = decode32ByteHexString(
                    data[i],
                    &quot;number&quot;
                ) as number;
            }
        }

        setMintInfo(userMintInfo);
    }
    /**
     * Calls XENCrypto getUserMint() function, if mint found, calls setUserMintInfo
     * @returns
     */
    async function getUserMintInfo() {
        //if chainId is 1, set to XEN_MAINNET
        //if chain is anything else but 1, set to XEN_HHLOCAL
        const contractAddress =
            CCProvider?.chainId === 1 ? XEN_MAINNET : XEN_HHLOCAL;
        //tx response should be in 32 byte hex strings format.
        const txResponse = await CCProvider?.callContract(
            contractAddress,
            account,
            {
                function: &quot;getUserMint()&quot;,
            }
        );
        //not sure if txResponse will ever be returned as undefined
        if (txResponse !== undefined) {
            //slice off initial 0x of hex string
            //then match every 64th character
            const responseValues = txResponse.slice(2).match(/.{64}/g);
            //if first value in array is all 0&#39;s no mint info found.
            if (/^0+$/.test(responseValues![0])) {
                //set mintInfo back to undefined if enters here.
                setMintInfo(undefined);
                return;
            }

            setUserMintInfo(responseValues!);
        }
    }

    /**
     * Calls XENCrypto getCurrentMaxTerm() and then calls setMaxTerm state with retrieved value.
     */
    async function getMaxTerm() {
        const contractAddress =
            CCProvider?.chainId === 1 ? XEN_MAINNET : XEN_HHLOCAL;

        const txResponse = await CCProvider?.callContract(
            contractAddress,
            account,
            { function: &quot;getCurrentMaxTerm()&quot; }
        );

        if (txResponse !== undefined) {
            //not 100% sure the format this will come back in, if its just one 32 byte string
            //can decode and set max term?
            //might need to add some more here.
            const termInSeconds = decode32ByteHexString(
                txResponse.slice(2),
                &quot;number&quot;
            ) as number;
            //divide term in seconds by 86400 to get # of days.
            setMaxTerm(termInSeconds / 86400);
        }
    }

    /**
     * Calls XenFlex ownerOf(uint256) to see if cRank has already been minted.
     */
    async function queryXenFlexTokenId() {
        const contractAddress =
            CCProvider?.chainId === 1 ? XENFLEX_MAINNET : XENFLEX_HHLOCAL;

        const txResponse = await CCProvider?.callContract(
            contractAddress,
            account,
            { function: &quot;ownerOf(uint256)&quot;, tokenId: mintInfo!.rank }
        );
        //if contract call errors ie ownerOf gets given an invalid token ID
        //txResponse will be indeed undefined, and console would have errors logged in them.
        if (txResponse !== undefined) {
            //in this case if txResponse is not undefined, then it will be an 20 byte address object
            //don&#39;t need to do anything with the response though, just confirms the cRank is minted.
            setIsRankMinted(true);
        }
    }

    /**
     * Calls XENCrypto claimRank(uint256)
     * @returns
     */
    async function handleXenClaimRank() {
        if (!isAccountConnected(CCProvider!.wallet)) {
            console.log(CCProvider);
            console.log(&quot;ENTERED ESCAPING&quot;);
            return;
        }
        if (term &lt;= 0) {
            runToaster(&quot;error&quot;, &quot;Term must be greater then 0&quot;);
            return;
        }

        if (term &gt; maxTerm) {
            runToaster(&quot;error&quot;, &quot;Max term exceeded : &quot; + maxTerm.toString());
            return;
        }

        const contractAddress =
            CCProvider?.chainId === 1 ? XEN_MAINNET : XEN_HHLOCAL;

        const success = await CCProvider?.sendContractTransaction(
            contractAddress,
            account,
            {
                function: &quot;claimRank(uint256)&quot;,
                termInDays: term,
            }
        );

        if (!success) {
            console.log(&quot;Xen Claim Rank Failed.&quot;);
            return;
        }

        await getUserMintInfo();

        runToaster(&quot;success&quot;, &quot;Transaction Successful, Rank Claimed!&quot;);
    }
    /**
     * Calls XenFlex mintNft()
     * @returns
     */
    async function handleXenFlexMint() {
        const contractAddress =
            CCProvider?.chainId === 1 ? XENFLEX_MAINNET : XENFLEX_HHLOCAL;

        const success = await CCProvider?.sendContractTransaction(
            contractAddress,
            account,
            { function: &quot;mintNft()&quot; }
        );

        if (!success) {
            console.log(&quot;Xen Flex mint Failed.&quot;);
            return;
        }

        setIsRankMinted(true);

        runToaster(&quot;success&quot;, &quot;Transaction Successful, cRank Minted!&quot;);
    }

    /**
     * Basic function determining whether or not to show the dapp to user.
     * @returns boolean
     */
    function showDapp(): boolean {
        if (CCProvider !== undefined) {
            if (!isWalletUnlocked(CCProvider.wallet)) return false;
            //if no wallet connected dont display dapp
            if (!isAccountConnected(CCProvider.wallet)) return false;
            //if it reaches here, should be safe to display dapp.
            return true;
        }

        return false;
    }
    /**
     * Checks that the chainName is either Ethereum Mainnet or Hardhat Local Node
     * @returns boolean
     */
    function isChainGood(): boolean {
        if (chainName === &quot;Ethereum Mainnet&quot;) return true;

        if (chainName === &quot;Hardhat Local Node&quot;) return true;

        return false;
    }

    return (
        &lt;div className=&quot;flex-col space-y-5 &quot;&gt;
            {!walletFound ? (
                &lt;div className=&quot;rounded-md bg-ls-back p-3 text-center  shadow-md dark:bg-dt-back&quot;&gt;
                    Please download either MetaMask or GameStop wallet.
                &lt;/div&gt;
            ) : showDapp() ? (
                isChainGood() ? (
                    &lt;div&gt;
                        &lt;div className=&quot;flex space-x-8&quot;&gt;
                            &lt;div className=&quot;flex flex-auto items-center rounded-lg bg-lt-back p-3 shadow-2xl dark:bg-dp-back&quot;&gt;
                                {CCProvider!.chainName}
                            &lt;/div&gt;
                            &lt;div className=&quot;flex flex-auto items-center rounded-lg bg-lt-back p-3 shadow-2xl dark:bg-dp-back&quot;&gt;
                                ETH {balance.slice(0, balance.indexOf(&quot;.&quot;) + 4)}
                                ...
                            &lt;/div&gt;
                            &lt;div className=&quot;flex flex-auto items-center rounded-lg bg-lt-back p-3 shadow-2xl dark:bg-dp-back&quot;&gt;
                                {account.slice(0, 6)}...
                                {account.slice(CCProvider!.account.length - 4)}
                            &lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div className=&quot;mt-10 flex-col space-y-4 rounded-lg bg-lt-back p-10 shadow-2xl dark:bg-dp-back&quot;&gt;
                            &lt;div className=&quot;flex items-center&quot;&gt;
                                &lt;div className=&quot;grow&quot;&gt;
                                    &lt;div&gt;XEN Crypto&lt;/div&gt;
                                    &lt;div&gt;
                                        &lt;a
                                            className=&quot;underline hover:text-dp-back hover:dark:text-ls-fore&quot;
                                            target=&quot;_blank&quot;
                                            href=&quot;https://etherscan.io/token/0x06450dEe7FD2Fb8E39061434BAbCFC05599a6Fb8&quot;
                                            rel=&quot;noopener noreferrer&quot;
                                        &gt;
                                            Etherscan
                                        &lt;/a&gt;
                                    &lt;/div&gt;
                                    &lt;div&gt;
                                        &lt;a
                                            className=&quot;underline hover:text-dp-back hover:dark:text-ls-fore&quot;
                                            target=&quot;_blank&quot;
                                            href=&quot;https://xen.network/&quot;
                                            rel=&quot;noopener noreferrer&quot;
                                        &gt;
                                            XEN DAPP
                                        &lt;/a&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;
                                &lt;div className=&quot;flex justify-end px-2&quot;&gt;
                                    {mintInfo === undefined ? (
                                        &lt;div&gt;
                                            &lt;div&gt;
                                                &lt;span className=&quot;text-base&quot;&gt;
                                                    Term : (Max: {maxTerm} Days)
                                                &lt;/span&gt;
                                            &lt;/div&gt;
                                            &lt;input
                                                className=&quot;focus:shadow-outline mb-3 w-full appearance-none rounded border bg-lt-back py-2 px-3 leading-tight shadow focus:outline-none dark:bg-ds-back&quot;
                                                id=&quot;termInput&quot;
                                                type=&quot;number&quot;
                                                onChange={(e) =&gt; {
                                                    if (
                                                        !Number.isNaN(
                                                            e.currentTarget
                                                                .valueAsNumber
                                                        )
                                                    ) {
                                                        setTerm(
                                                            e.currentTarget
                                                                .valueAsNumber
                                                        );
                                                    } else {
                                                        //if current value is not a number, set term to 0.
                                                        setTerm(0);
                                                    }
                                                }}
                                            /&gt;
                                            &lt;CCButton
                                                onClick={handleXenClaimRank}
                                                title=&quot;ClaimXenRank&quot;
                                                className=&quot;flex flex-row-reverse&quot;
                                                useLoadingCircle={true}
                                            &gt;
                                                CLAIM RANK
                                            &lt;/CCButton&gt;
                                        &lt;/div&gt;
                                    ) : (
                                        &lt;div&gt;XEN Rank : {mintInfo.rank}&lt;/div&gt;
                                    )}
                                &lt;/div&gt;
                            &lt;/div&gt;
                            &lt;hr /&gt; &lt;div className=&quot;flex&quot;&gt;
                                &lt;div className=&quot;grow&quot;&gt;
                                    &lt;div&gt;
                                        XenFlex NFT &lt;br /&gt;
                                        &lt;span className=&quot;text-sm&quot;&gt;
                                            Mint Xen cRank as NFT
                                        &lt;/span&gt;
                                    &lt;/div&gt;
                                    &lt;div&gt;
                                        &lt;a
                                            className=&quot;underline hover:text-dp-back hover:dark:text-ls-fore&quot;
                                            target=&quot;_blank&quot;
                                            href=&quot;https://etherscan.io/address/0x7b812443599ba2307c14b80825de0429ee0bae3d&quot;
                                            rel=&quot;noopener noreferrer&quot;
                                        &gt;
                                            Etherscan
                                        &lt;/a&gt;
                                    &lt;/div&gt;
                                    &lt;div&gt;
                                        &lt;a
                                            className=&quot;underline hover:text-dp-back hover:dark:text-ls-fore&quot;
                                            target=&quot;_blank&quot;
                                            href=&quot;https://www.xenflex.io/#/&quot;
                                            rel=&quot;noopener noreferrer&quot;
                                        &gt;
                                            XenFlex DAPP
                                        &lt;/a&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;
                                &lt;div className=&quot;flex items-center justify-end px-2&quot;&gt;
                                    {mintInfo === undefined ? (
                                        &lt;div&gt;No Rank&lt;/div&gt;
                                    ) : isRankMinted ? (
                                        &lt;div&gt;Rank {mintInfo.rank} Minted&lt;/div&gt;
                                    ) : (
                                        &lt;CCButton
                                            onClick={handleXenFlexMint}
                                            title=&quot;MintXenFlex&quot;
                                            useLoadingCircle={true}
                                        &gt;
                                            MINT NFT
                                        &lt;/CCButton&gt;
                                    )}
                                &lt;/div&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                ) : (
                    &lt;div className=&quot;rounded-md bg-ls-back p-3 text-center  shadow-md dark:bg-dt-back&quot;&gt;
                        Chain must be Ethereum Mainnet or Hardhat Local Node.
                    &lt;/div&gt;
                )
            ) : (
                &lt;div className=&quot;mt-5 items-center text-center sm:mt-0&quot;&gt;
                    &lt;CCConnectButton /&gt;
                &lt;/div&gt;
            )}
            &lt;ShowCodeButton codeToShow=&quot;dapp&quot; className=&quot;flex justify-center&quot; /&gt;
        &lt;/div&gt;
    );
}
</code></pre>
`;
