import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="mt-5 sm:mt-0 text-left items-center ">
            <div className="">
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        <span className="text-6xl sm:text-8xl uppercase text-transparent">
                            Hey.
                        </span>
                        <br />
                        <span className="text-5xl sm:text-7xl uppercase">
                            Hello.
                        </span>
                        <br />
                        <span className="text-4xl sm:text-6xl uppercase whitespace-nowrap">
                            Hi there.
                        </span>
                    </div>
                    <div className="col-span-1">
                        <Image
                            className="rounded-full sm:mt-10"
                            src="/zuko.png"
                            height={200}
                            width={200}
                            alt="Menu drop down"
                        />
                    </div>
                </div>
                <br />

                <span>
                    My name is Matthew, this is my website, and thats my dog
                    Zuko (if you were wondering). I hope you enjoy and interact
                    (Look for{" "}
                    <Image
                        className="inline"
                        src="/code.svg"
                        width={20}
                        height={20}
                        alt="Code svg"
                    />{" "}
                    to view the component source code, or visit my{" "}
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
            </div>
            <br />
            <div>
                I am a full stack software engineer with a passion for building
                scalable and efficient applications, please navigate to{" "}
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
