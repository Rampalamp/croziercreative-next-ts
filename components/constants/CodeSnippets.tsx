export const HeaderCode: string = `<pre><code class="prettyprint language-typescript">import Link from &quot;next/link&quot;;
import Image from &quot;next/image&quot;;
import { useEffect, useContext, useRef } from &quot;react&quot;;
import { ThemeContext } from &quot;./context/ThemeProvider&quot;;
import ShowCodeButton from &quot;./ShowCodeButton&quot;;
import CCButton from &quot;./CCButton&quot;;
import CCMenuIcon from &quot;./CCMenuIcon&quot;;
import { NavOptions } from &quot;./constants/Generics&quot;;
import CCThemeIcon from &quot;./CCThemeIcon&quot;;

let rootDiv: HTMLElement | null;
let themeIconDiv: HTMLElement | null;
//attemtping to useRef the menuSvg was being troublesome so just grabbing it like rootDiv
let menuSvg: HTMLElement | null;

export default function Header() {
    const { theme } = useContext(ThemeContext);

    const gitSvg = useRef&lt;HTMLImageElement&gt;(null);
    const linkedSvg = useRef&lt;HTMLImageElement&gt;(null);
    const sideNav = useRef&lt;HTMLDivElement&gt;(null);

    useEffect(() =&gt; {
        rootDiv === undefined
            ? (rootDiv = document.getElementById(&quot;rootDiv&quot;))
            : {};
        menuSvg === undefined
            ? (menuSvg = document.getElementById(&quot;burg&quot;))
            : {};
        themeIconDiv === undefined
            ? (themeIconDiv = document.getElementById(&quot;ThemeIconDiv&quot;))
            : {};

        //adjust element attributes accordingly.
        if (theme === &quot;dark&quot;) {
            rootDiv!.classList.add(&quot;dark&quot;);
            linkedSvg.current!.setAttribute(&quot;src&quot;, &quot;/linkedin-dark.svg&quot;);
            gitSvg.current!.setAttribute(&quot;src&quot;, &quot;/github-dark.svg&quot;);
        } else {
            rootDiv!.classList.remove(&quot;dark&quot;);
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
            &lt;nav className=&quot; backdrop-blur flex items-center flex-nowrap p-3 2xl:px-80 xl:px-60 lg:px-32 drop-shadow-xl&quot;&gt;
                &lt;div className=&quot;flex grow items-center mr-4&quot;&gt;
                    &lt;span className=&quot;font-extrabold text-xl hidden sm:block&quot;&gt;
                        &lt;Link href=&quot;/&quot; title=&quot;CrozierCreative&quot;&gt;
                            CrozierCreative
                        &lt;/Link&gt;
                    &lt;/span&gt;
                    &lt;span className=&quot;font-extrabold text-3xl block sm:hidden&quot;&gt;
                        &lt;Link href=&quot;/&quot; title=&quot;CrozierCreative&quot;&gt;
                            CC
                        &lt;/Link&gt;
                    &lt;/span&gt;
                    &lt;div className=&quot;flex  ml-3 space-x-2 min-h-fit min-w-fit&quot;&gt;
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
                &lt;div className=&quot;font-bold text-lg  md:mr-12 hidden sm:block&quot;&gt;
                    &lt;ul className=&quot;flex 2xl:space-x-20 xl:space-x-12 lg:space-x-10 md:space-x-8 space-x-4&quot;&gt;
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
                    className=&quot;rounded-md backdrop-blur sm:hidden font-bold text-lg absolute top-12 transition-all duration-500 -left-36 left-0&quot;
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
        &lt;div className=&quot;mt-5 sm:mt-0 text-center items-center &quot;&gt;
            &lt;div&gt;
                &lt;div className=&quot;grid grid-cols-2 p-3&quot;&gt;
                    &lt;div className=&quot;text-left skew-y-12 m-auto&quot;&gt;
                        {/**make-transparent is not a tailwind class, it is my work around, exists in globals.css */}
                        &lt;span className=&quot;make-transparent text-6xl sm:text-8xl lg:text-9xl uppercase bg-clip-text bg-gradient-to-r from-dp-back to-dp-fore dark:from-lp-back dark:to-lp-fore&quot;&gt;
                            Hey.
                        &lt;/span&gt;
                        &lt;br /&gt;
                        &lt;span className=&quot;make-transparent text-5xl sm:text-7xl lg:text-8xl uppercase bg-clip-text bg-gradient-to-r from-ds-fore to-ds-back dark:from-ls-back dark:to-ls-fore&quot;&gt;
                            Hello.
                        &lt;/span&gt;
                        &lt;br /&gt;
                        &lt;span className=&quot;make-transparent text-4xl sm:text-6xl lg:text-7xl uppercase whitespace-nowrap bg-clip-text bg-gradient-to-r from-dt-back to-dt-fore dark:from-lt-back dark:to-lt-fore&quot;&gt;
                            Hi there.
                        &lt;/span&gt;
                    &lt;/div&gt;
                    &lt;div className=&quot;m-auto&quot;&gt;
                        &lt;Image
                            className=&quot;rounded-full w-auto h-auto&quot;
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
                &lt;span className=&quot;font-extrabold text-xl &quot;&gt;
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
        &lt;div className=&quot;mt-5 sm:mt-0 text-center items-center&quot;&gt;
            &lt;SkillsProvider&gt;
                &lt;div className=&quot;&quot;&gt;
                    I am comfortable working on both the front-end and back-end
                    aspects of an application and have an understanding of the
                    entire development process, from ideation to deployment. I
                    am also experienced working in agile development
                    environments and am skilled at communicating with both
                    technical and non-technical stakeholders. Click on the
                    skills below to see specifics!{&quot; &quot;}
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
} from &quot;./constants/Svgs&quot;;
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
                className=&quot;m-auto p-5 myOrbit speedFast&quot;
                onClick={() =&gt; ShowSkill(&quot;blockchain&quot;)}
            &gt;
                &lt;HardHat /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;m-auto myOrbit speedSlow&quot;
                onClick={() =&gt; ShowSkill(&quot;blockchain&quot;)}
            &gt;
                &lt;Solidity /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;m-auto myOrbit speedMedium&quot;
                onClick={() =&gt; ShowSkill(&quot;blockchain&quot;)}
            &gt;
                &lt;Ethereum /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;m-auto myOrbit speedSlow&quot;
                onClick={() =&gt; ShowSkill(&quot;graph&quot;)}
            &gt;
                &lt;GraphQL /&gt;
            &lt;/div&gt;
            &lt;div className=&quot;m-auto myOrbit speedFast&quot;&gt;
                &lt;ShowCodeButton codeToShow=&quot;skillcloud&quot; /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;m-auto p-5 myOrbit speedFast&quot;
                onClick={() =&gt; ShowSkill(&quot;sql&quot;)}
            &gt;
                &lt;SQL /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;m-auto myOrbit speedFast&quot;
                onClick={() =&gt; ShowSkill(&quot;azure&quot;)}
            &gt;
                &lt;Azure /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;m-auto myOrbit speedMedium&quot;
                onClick={() =&gt; ShowSkill(&quot;cs&quot;)}
            &gt;
                &lt;CSharp /&gt;
            &lt;/div&gt;
            &lt;div
                className=&quot;m-auto myOrbit speedSlow&quot;
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
            &lt;br /&gt;I am interested in gaining experience in this sector, and I am
            at the point where I simply must start reading past audits or performing
            new audits. With that being said, CrozierCreative is offering free smart
            contract audits! Now, it is generally good practice to obtain multiple
            audits of your project before deploying to a live chain, but since I
            am also new to this sector, I would reccommend you do not count my audits
            (yet, at least) as reputable.
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
