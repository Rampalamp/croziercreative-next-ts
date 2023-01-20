import Link from "next/link";

export function NavOptions() {
    return (
        <>
            <li className="hover:text-dp-back hover:dark:text-ls-fore">
                <Link href="/" title="Home">
                    Home
                </Link>
            </li>
            <li className="hover:text-dp-back hover:dark:text-ls-fore">
                <Link href="/skills" title="Skills">
                    Skills
                </Link>
            </li>
            <li className="hover:text-dp-back hover:dark:text-ls-fore">
                <Link href="/dapp" title="dApp">
                    dApp
                </Link>
            </li>
            <li className="hover:text-dp-back hover:dark:text-ls-fore">
                <Link href="/audits" title="Audits">
                    Audits
                </Link>
            </li>
        </>
    );
}
