import { createContext, useMemo, useRef, useState } from "react";
import {
    CS,
    MicrosoftAzure,
    Graph,
    TS,
    Blockchain,
    MySql,
} from "../constants/SkillDescriptions";
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

export const SkillsContext = createContext<SkillsContext>({} as SkillsContext);

export default function SkillsProvider({ children }: ISkillsProviderProps) {
    const [skill, setSkill] = useState<Skill>(null);
    const [component, setComponent] = useState<React.ReactNode>();
    const skillDiv = useRef<HTMLDivElement>(null);

    useMemo(() => {
        switch (skill) {
            case "azure": {
                setComponent(MicrosoftAzure());
                break;
            }
            case "blockchain": {
                setComponent(Blockchain());
                break;
            }
            case "graph": {
                setComponent(Graph());
                break;
            }
            case "sql": {
                setComponent(MySql());
                break;
            }
            case "cs": {
                setComponent(CS());
                break;
            }
            case "ts": {
                setComponent(TS());
                break;
            }
        }
    }, [skill]);

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
                    <div className="flex flex-col  h-[40rem] mb-9">
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
                            {component}
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </SkillsContext.Provider>
    );
}
