import { HardHat, Solidity, Ethereum } from "../constants/Svgs";
import ShowCodeButton from "./ShowCodeButton";

//1. Create a grid large enough to scatter skill SVGs
//2. Add on hover animation/transition
//3. on click give some sort of information about experience.
export default function SkillCloud() {
    return (
        <div className="grid grid-cols-3 grid-rows-3">
            {/* Supposedly applying padding to the any grid element applies it to all */}
            <div className="m-auto p-5 myOrbit skillFast">
                <HardHat />
            </div>
            <div className="m-auto myOrbit skillSlow">
                <Solidity />
            </div>
            <div className=" m-auto myOrbit skillMedium">
                <Ethereum />
            </div>
            <div className=" m-auto myOrbit skillSlow">
                <Ethereum />
            </div>
            <div className="  m-auto myOrbit skillFast">
                <ShowCodeButton codeToShow="skillcloud" />
            </div>
            <div className=" m-auto p-5 myOrbit skillFast">
                <HardHat />
            </div>
            <div className=" m-auto myOrbit skillSlow">
                <Solidity />
            </div>
            <div className=" m-auto myOrbit skillMedium">
                <Ethereum />
            </div>
            <div className=" m-auto myOrbit skillSlow">
                <Ethereum />
            </div>
        </div>
    );
}
