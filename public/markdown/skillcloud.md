```typescript
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
                className="myOrbit speedFast m-auto p-5"
                onClick={() => ShowSkill("blockchain")}
            >
                <HardHat />
            </div>
            <div
                className="myOrbit speedSlow m-auto"
                onClick={() => ShowSkill("blockchain")}
            >
                <Solidity />
            </div>
            <div
                className="myOrbit speedMedium m-auto"
                onClick={() => ShowSkill("blockchain")}
            >
                <Ethereum />
            </div>
            <div
                className="myOrbit speedSlow m-auto"
                onClick={() => ShowSkill("graph")}
            >
                <GraphQL />
            </div>
            <div className="myOrbit speedFast m-auto">
                <ShowCodeButton codeToShow="skillcloud" />
            </div>
            <div
                className="myOrbit speedFast m-auto p-5"
                onClick={() => ShowSkill("sql")}
            >
                <SQL />
            </div>
            <div
                className="myOrbit speedFast m-auto"
                onClick={() => ShowSkill("azure")}
            >
                <Azure />
            </div>
            <div
                className="myOrbit speedMedium m-auto"
                onClick={() => ShowSkill("cs")}
            >
                <CSharp />
            </div>
            <div
                className="myOrbit speedSlow m-auto"
                onClick={() => ShowSkill("ts")}
            >
                <TypeScript />
            </div>
        </div>
    );
}
```
