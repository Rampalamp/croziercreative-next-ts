export const HeaderCode: string = `<pre><code class="prettyprint language-typescript">import Link from &quot;next/link&quot;;
import Image from &quot;next/image&quot;;
import { useEffect, useContext, useRef } from &quot;react&quot;;
import { ThemeContext } from &quot;./context/ThemeProvider&quot;;
import ShowCodeButton from &quot;./ShowCodeButton&quot;;

let rootDiv: HTMLElement | null;

function NavOptions() {
    return (
        &lt;&gt;
            &lt;li className=&quot;hover:text-dp-back hover:dark:text-ls-fore&quot;&gt;
                &lt;Link href=&quot;/&quot;&gt;Home&lt;/Link&gt;
            &lt;/li&gt;
            &lt;li className=&quot;hover:text-dp-back hover:dark:text-ls-fore&quot;&gt;
                &lt;Link href=&quot;/skills&quot;&gt;Skills&lt;/Link&gt;
            &lt;/li&gt;
            &lt;li className=&quot;hover:text-dp-back hover:dark:text-ls-fore&quot;&gt;
                &lt;Link href=&quot;/dapp&quot;&gt;dApp&lt;/Link&gt;
            &lt;/li&gt;
            &lt;li className=&quot;hover:text-dp-back hover:dark:text-ls-fore&quot;&gt;
                &lt;Link href=&quot;/audits&quot;&gt;Audits&lt;/Link&gt;
            &lt;/li&gt;
        &lt;/&gt;
    );
}

export default function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const gitSvg = useRef&lt;HTMLImageElement&gt;(null);
    const linkedSvg = useRef&lt;HTMLImageElement&gt;(null);
    const themeToggleSvg = useRef&lt;HTMLImageElement&gt;(null);
    const menuSvg = useRef&lt;HTMLImageElement&gt;(null);
    const sideNav = useRef&lt;HTMLDivElement&gt;(null);

    useEffect(() =&gt; {
        rootDiv === undefined
            ? (rootDiv = document.getElementById(&quot;rootDiv&quot;))
            : {};

        //adjust element attributes accordingly.
        if (theme === &quot;dark&quot;) {
            rootDiv!.classList.add(&quot;dark&quot;);
            linkedSvg.current!.setAttribute(&quot;src&quot;, &quot;/linkedin-dark.svg&quot;);
            gitSvg.current!.setAttribute(&quot;src&quot;, &quot;/github-dark.svg&quot;);
            menuSvg.current!.setAttribute(&quot;src&quot;, &quot;menu-dark.svg&quot;);
            themeToggleSvg.current!.setAttribute(&quot;src&quot;, &quot;/sun.svg&quot;);
        } else {
            rootDiv!.classList.remove(&quot;dark&quot;);
            linkedSvg.current!.setAttribute(&quot;src&quot;, &quot;/linkedin.svg&quot;);
            gitSvg.current!.setAttribute(&quot;src&quot;, &quot;/github.svg&quot;);
            menuSvg.current!.setAttribute(&quot;src&quot;, &quot;menu.svg&quot;);
            themeToggleSvg.current!.setAttribute(&quot;src&quot;, &quot;/moon.svg&quot;);
        }
    }, [theme]);

    function toggleSideNav() {
        //for some strange reason toggling for left-0 wasn&#39;t working
        //toggling -left-36 did work though, not sure why its acting like this.
        sideNav.current!.classList.toggle(&quot;-left-36&quot;);
    }

    return (
        &lt;div className=&quot;bg-gradient-to-r from-lt-fore to-ls-back dark:from-dt-back dark:to-ds-back bg-ls-back text-ls-fore dark:bg-ds-back dark:text-ds-fore&quot;&gt;
            &lt;nav className=&quot;flex items-center flex-nowrap p-3 2xl:px-80 xl:px-60 lg:px-32 drop-shadow-xl&quot;&gt;
                &lt;div className=&quot;flex grow items-center mr-4&quot;&gt;
                    &lt;span className=&quot;font-extrabold text-xl hidden sm:block&quot;&gt;
                        &lt;Link href=&quot;/&quot;&gt;CrozierCreative&lt;/Link&gt;
                    &lt;/span&gt;
                    &lt;span className=&quot;font-extrabold text-3xl block sm:hidden&quot;&gt;
                        &lt;Link href=&quot;/&quot;&gt;CC&lt;/Link&gt;
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
                            /&gt;
                        &lt;/a&gt;
                    &lt;/div&gt;
                &lt;/div&gt;

                {/**Nav options for medium and up screen sizes */}
                &lt;div className=&quot;font-bold text-lg mr-1 md:mr-12 hidden sm:block&quot;&gt;
                    &lt;ul className=&quot;flex space-x-5 2xl:space-x-20 xl:space-x-12 lg:space-x-10 md:space-x-8&quot;&gt;
                        &lt;NavOptions /&gt;
                    &lt;/ul&gt;
                &lt;/div&gt;

                {/**Menu icon for small screen size */}

                &lt;div className=&quot;flex space-x-3&quot;&gt;
                    &lt;div className=&quot;min-h-fit min-w-fit sm:hidden&quot;&gt;
                        &lt;button
                            className=&quot;rounded-md shadow-lg p-3 hover:bg-opacity-25 hover:dark:bg-opacity-25 hover:bg-lbtn-hov hover:dark:bg-dbtn-hov bg-ls-back dark:bg-dt-back&quot;
                            onClick={toggleSideNav}
                        &gt;
                            &lt;Image
                                ref={menuSvg}
                                src=&quot;/menu-dark.svg&quot;
                                alt=&quot;Menu drop down&quot;
                                width={20}
                                height={20}
                            /&gt;
                        &lt;/button&gt;
                    &lt;/div&gt;
                    &lt;div className=&quot;min-h-fit min-w-fit&quot;&gt;
                        &lt;button
                            className=&quot;rounded-md shadow-lg p-3 hover:bg-opacity-25 hover:dark:bg-opacity-25 hover:bg-lbtn-hov hover:dark:bg-dbtn-hov bg-ls-back dark:bg-dt-back&quot;
                            onClick={toggleTheme}
                        &gt;
                            &lt;Image
                                ref={themeToggleSvg}
                                src=&quot;/sun.svg&quot;
                                alt=&quot;Theme toggler&quot;
                                width={20}
                                height={20}
                            /&gt;
                        &lt;/button&gt;
                    &lt;/div&gt;
                    &lt;div className=&quot;min-h-fit min-w-fit&quot;&gt;
                        &lt;ShowCodeButton codeToShow=&quot;header&quot; /&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/nav&gt;
            &lt;nav className=&quot;relative drop-shadow-xl z-10&quot;&gt;
                {/**Nav options for small screen format */}
                &lt;div
                    ref={sideNav}
                    className=&quot;sm:hidden font-bold text-lg absolute top-12 transition-all duration-500 -left-36 left-0&quot;
                &gt;
                    &lt;ul className=&quot;rounded space-y-10 p-7   bg-gradient-to-b opacity-90 dark:opacity-90 from-ls-back to-lt-fore dark:from-ds-back dark:to-dt-back&quot;&gt;
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
                    &lt;div className=&quot;text-left col-span-1 skew-y-12 m-auto&quot;&gt;
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
                    &lt;div className=&quot;col-span-1 m-auto&quot;&gt;
                        &lt;Image
                            className=&quot;rounded-full&quot;
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
                    My name is Matthew, thats my dog Zuko, and this is my
                    website. I hope you enjoy and interact (Look for{&quot; &quot;}
                    &lt;ShowCodeButton codeToShow={&quot;&quot;} className=&quot;inline&quot; /&gt; to
                    view the component source code, or visit my{&quot; &quot;}
                    &lt;a
                        className=&quot;underline hover:text-dp-back hover:dark:text-ls-fore&quot;
                        target=&quot;_blank&quot;
                        href=&quot;https://github.com/Rampalamp&quot;
                        rel=&quot;noopener noreferrer&quot;
                    &gt;
                        GitHub
                    &lt;/a&gt;
                    ).
                &lt;/span&gt;
                &lt;br /&gt;
                &lt;br /&gt;I am a full stack software engineer with a passion for
                building scalable and efficient applications, please navigate to{&quot; &quot;}
                &lt;Link
                    className=&quot;underline hover:text-dp-back hover:dark:text-ls-fore&quot;
                    href=&quot;/skills&quot;
                &gt;
                    Skills
                &lt;/Link&gt;{&quot; &quot;}
                for my specific experience. With a strong foundation in software
                engineering and a desire to constantly learn and improve, I have
                set my phasers to &#39;love me&#39;
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
