import ShowCodeButton from "../components/ShowCodeButton";

export default function Audits() {
    return (
        <div className="text-center">
            Smart contracts are open for the world to see, and can be called by
            anyone, or even other smart contracts. They often handle large
            amounts of value, and a security breach can have severe consequences
            (check out the running{" "}
            <a
                className="underline hover:text-dp-back hover:dark:text-ls-fore"
                target="_blank"
                href="https://rekt.news/leaderboard/"
                rel="noopener noreferrer"
            >
                leaderboard
            </a>
            ). Audits help ensure that the smart contract is secure and
            functions as intended, protecting the assets and interests of all
            parties involved. Additionally, Audits give credibility to the
            project and increase the trust of the users and investors, which is
            vital in such a new and rapidly evolving field.
            <br />
            <br />I am interested in gaining experience in this sector, and with
            that being said, CrozierCreative is offering free smart contract
            audits! Now, it is generally good practice to obtain multiple audits
            of your project before deploying to a live chain, but since I am
            also new to this sector, I would reccommend you do not count my
            audits (yet, at least) as reputable.
            <br />
            <br />
            If you are interested, please send a message to{" "}
            <a
                className="underline hover:text-dp-back hover:dark:text-ls-fore"
                href="mailto:croziercreative@gmail.com?subject = Smart Contract Audit"
            >
                <span className="italic">croziercreative@gmail.com</span>
            </a>{" "}
            and we can get in touch. As you can probably guess, a proper audit
            requires back and forth between the developer and auditor. It is
            paramount that I understand exactly what you want your code to do to
            perform a proper audit. Depending the size of the project I may also
            request unit tests be written, if they weren&apos;t already.
            <br />
            <br />
            <ShowCodeButton codeToShow="audits" />
        </div>
    );
}
