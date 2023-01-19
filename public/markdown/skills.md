```typescript
import SkillCloud from "../components/SkillCloud";
import SkillsProvider from "../components/context/SkillsProvider";
import ShowCodeButton from "../components/ShowCodeButton";

export default function Skills() {
    return (
        <div className="mt-5 sm:mt-0 text-center items-center">
            <SkillsProvider>
                <div className="">
                    I am comfortable working on both the front-end and back-end
                    aspects of an application and have an understanding of the
                    entire development process, from ideation to deployment. I
                    am also experienced working in agile development
                    environments and am skilled at communicating with both
                    technical and non-technical stakeholders. Click on the
                    skills below to see specifics!{" "}
                    <ShowCodeButton codeToShow="skills" className="inline" />
                </div>
                <div className="mt-20">
                    <SkillCloud />
                </div>
            </SkillsProvider>
        </div>
    );
}
```
