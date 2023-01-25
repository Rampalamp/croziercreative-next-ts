import React, { createContext, useRef, useState } from "react";
import {
    CS,
    MicrosoftAzure,
    Graph,
    TS,
    Blockchain,
    MySql,
} from "../../constants/SkillDescriptions";
import CCButton from "../CCButton";
import Image from "next/image";

export type Skill =
    | "blockchain"
    | "graph"
    | "sql"
    | "azure"
    | "cs"
    | "ts"
    | null;

type SkillsContext = {
    skill: Skill;
    toggleSkill: () => void;
    setSkill: (skill: Skill) => void;
};

interface ISkillsProviderProps {
    children: React.ReactNode;
}

const SkillComponents: Map<Skill, React.ReactNode> = new Map<
    Skill,
    React.ReactNode
>([
    ["blockchain", <Blockchain />],
    ["graph", <Graph />],
    ["sql", <MySql />],
    ["azure", <MicrosoftAzure />],
    ["cs", <CS />],
    ["ts", <TS />],
]);

export const SkillsContext = createContext<SkillsContext>({} as SkillsContext);

export default function SkillsProvider({ children }: ISkillsProviderProps) {
    const [skill, setSkill] = useState<Skill>(null);
    const skillDiv = useRef<HTMLDivElement>(null);

    function toggleSkill() {
        skillDiv.current!.classList.toggle("hidden");
    }

    return (
        <SkillsContext.Provider value={{ skill, setSkill, toggleSkill }}>
            <div className="relative">
                <div
                    ref={skillDiv}
                    className="absolute z-10 backdrop-blur-sm hidden"
                >
                    <div className="flex flex-col  h-[40rem] mb-20 -mt-5 sm:mb-0">
                        <div className="flex justify-end">
                            <CCButton onClick={toggleSkill}>
                                <Image
                                    src="/x.svg"
                                    width={20}
                                    height={20}
                                    alt="X(Close) svg"
                                />
                            </CCButton>
                        </div>
                        <div className="mt-3 overflow-auto  p-4 rounded-lg shadow-2xl bg-lt-back dark:bg-dt-back">
                            {SkillComponents.get(skill)}
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </SkillsContext.Provider>
    );
}
