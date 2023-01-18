//1. Create a grid large enough to scatter skill SVGs
//2. Add on hover animation/transition
//3. on click give some sort of information about experience.
export default function SkillCloud() {
    return (
        <div className="flex items-center justify-center">
            <svg viewBox="0 0 100 100">
                <circle
                    id="circle"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="black"
                />
            </svg>
            <div id="square" className="bg-dp-fore"></div>
        </div>
    );
}
