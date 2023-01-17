import Image from "next/image";
import Link from "next/link";
import ShowCodeButton from "../components/ShowCodeButton";

export default function Home() {
    return (
        <div className="mt-5 sm:mt-0 text-center items-center ">
            <div>
                <div className="grid grid-cols-2 p-3">
                    <div className="text-left col-span-1 skew-y-12 m-auto">
                        {/**make-transparent is not a tailwind class, it is my work around, exists in globals.css */}
                        <span className="make-transparent text-6xl sm:text-8xl lg:text-9xl uppercase bg-clip-text bg-gradient-to-r from-dp-back to-dp-fore dark:from-lp-back dark:to-lp-fore">
                            Hey.
                        </span>
                        <br />
                        <span className="make-transparent text-5xl sm:text-7xl lg:text-8xl uppercase bg-clip-text bg-gradient-to-r from-ds-fore to-ds-back dark:from-ls-back dark:to-ls-fore">
                            Hello.
                        </span>
                        <br />
                        <span className="make-transparent text-4xl sm:text-6xl lg:text-7xl uppercase whitespace-nowrap bg-clip-text bg-gradient-to-r from-dt-back to-dt-fore dark:from-lt-back dark:to-lt-fore">
                            Hi there.
                        </span>
                    </div>
                    <div className="col-span-1 m-auto">
                        <Image
                            className="rounded-full"
                            src="/zuko.png"
                            width={250}
                            height={250}
                            alt="Menu drop down"
                        />
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div>
                <span className="font-extrabold text-xl ">
                    My name is Matthew, thats my dog Zuko, and this is my
                    website. I hope you enjoy and interact (Look for{" "}
                    <ShowCodeButton codeToShow="index" className="inline" /> to
                    view the component source code, or visit my{" "}
                    <a
                        className="underline hover:text-dp-back hover:dark:text-ls-fore"
                        target="_blank"
                        href="https://github.com/Rampalamp"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    ).
                </span>
                <br />
                <br />I am a full stack software engineer with a passion for
                building scalable and efficient applications, please navigate to{" "}
                <Link
                    className="underline hover:text-dp-back hover:dark:text-ls-fore"
                    href="/skills"
                >
                    Skills
                </Link>{" "}
                for my specific experience. With a strong foundation in software
                engineering and a desire to constantly learn and improve, I have
                set my phasers to 'love me'
                <span className="italic"> as well as </span>
                blockchain development / technologies. Feel free to connect and
                play around in the{" "}
                <Link
                    className="underline hover:text-dp-back hover:dark:text-ls-fore"
                    href="/dapp"
                >
                    dApp
                </Link>{" "}
                page. I am also interested in Smart Contract auditing, with that
                being said, I am currently offering free Smart Contract audits.
                Please visit{" "}
                <Link
                    className="underline hover:text-dp-back hover:dark:text-ls-fore"
                    href="/audits"
                >
                    Audits
                </Link>{" "}
                for more details.
            </div>
        </div>
    );
}
