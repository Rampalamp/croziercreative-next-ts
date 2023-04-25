import Image from "next/image";
import Link from "next/link";
import ShowCodeButton from "../components/ShowCodeButton";

export default function Home() {
    return (
        <div className="mt-5 items-center text-center sm:mt-0 ">
            <div>
                <div className="grid grid-cols-2 p-3">
                    <div className="m-auto skew-y-12 text-left">
                        {/**make-transparent is not a tailwind class, it is my work around, exists in globals.css */}
                        <span className="make-transparent bg-gradient-to-r from-dp-back to-dp-fore bg-clip-text text-6xl uppercase dark:from-lp-back dark:to-lp-fore sm:text-8xl lg:text-9xl">
                            Hey.
                        </span>
                        <br />
                        <span className="make-transparent bg-gradient-to-r from-ds-fore to-ds-back bg-clip-text text-5xl uppercase dark:from-ls-back dark:to-ls-fore sm:text-7xl lg:text-8xl">
                            Hello.
                        </span>
                        <br />
                        <span className="make-transparent whitespace-nowrap bg-gradient-to-r from-dt-back to-dt-fore bg-clip-text text-4xl uppercase dark:from-lt-back dark:to-lt-fore sm:text-6xl lg:text-7xl">
                            Hi there.
                        </span>
                    </div>
                    <div className="mt-auto mb-auto ml-6 xs:m-auto">
                        <Image
                            className="h-auto w-auto rounded-full"
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
                <span className="text-xl font-extrabold ">
                    My name is Matthew, that's my dog Zuko, and this is my
                    website. I hope you enjoy and interact (Look for{" "}
                    <ShowCodeButton codeToShow="index" className="inline" /> to
                    view some components source code, to see everything visit my{" "}
                    <a
                        className="underline hover:text-dp-back hover:dark:text-ls-fore"
                        target="_blank"
                        href="https://github.com/Rampalamp"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    !).
                </span>
                <br />
                <br />I am a full stack software engineer with a passion for
                building scalable and efficient applications, please see{" "}
                <Link
                    className="underline hover:text-dp-back hover:dark:text-ls-fore"
                    href="/skills"
                >
                    Skills
                </Link>{" "}
                for more specific experience. With a strong foundation in
                software engineering and a desire to constantly learn and
                improve, I have set my phasers to 'love me'
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
