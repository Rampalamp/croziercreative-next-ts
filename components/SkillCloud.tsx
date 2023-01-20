import {
    HardHat,
    Solidity,
    Ethereum,
    GraphQL,
    SQL,
    Azure,
    CSharp,
    TypeScript,
} from "../constants/Svgs";
import ShowCodeButton from "./ShowCodeButton";
import { SkillsContext, Skill } from "./context/SkillsProvider";
import { useContext } from "react";

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
        <div className="grid grid-cols-3 grid-rows-3">
            {/* Supposedly applying padding to the any grid element applies it to all */}
            <div
                className="m-auto p-5 myOrbit speedFast"
                onClick={() => ShowSkill("blockchain")}
            >
                <HardHat />
            </div>
            <div
                className="m-auto myOrbit speedSlow"
                onClick={() => ShowSkill("blockchain")}
            >
                <Solidity />
            </div>
            <div
                className="m-auto myOrbit speedMedium"
                onClick={() => ShowSkill("blockchain")}
            >
                <Ethereum />
            </div>
            <div
                className="m-auto myOrbit speedSlow"
                onClick={() => ShowSkill("graph")}
            >
                <GraphQL />
            </div>
            <div className="m-auto myOrbit speedFast">
                <ShowCodeButton codeToShow="skillcloud" />
            </div>
            <div
                className="m-auto p-5 myOrbit speedFast"
                onClick={() => ShowSkill("sql")}
            >
                <SQL />
            </div>
            <div
                className="m-auto myOrbit speedFast"
                onClick={() => ShowSkill("azure")}
            >
                <Azure />
            </div>
            <div
                className="m-auto myOrbit speedMedium"
                onClick={() => ShowSkill("cs")}
            >
                <CSharp />
            </div>
            <div
                className="m-auto myOrbit speedSlow"
                onClick={() => ShowSkill("ts")}
            >
                <TypeScript />
            </div>
        </div>
    );
}
