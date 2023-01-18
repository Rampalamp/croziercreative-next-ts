import SkillCloud from "../components/SkillCloud";

export default function Skills() {
    return (
        <div className="flex flex-col">
            <div>
                <p>
                    I have experience working with a variety of technologies
                    including C#, JavaScript/TypeScript, SQL, GraphQL, and
                    more(Set this as a link to the skills page). I am
                    comfortable working on both the front-end and back-end
                    aspects of an application and have an understanding of the
                    entire development process, from ideation to deployment. I
                    am also experienced working in agile development
                    environments and am skilled at communicating with both
                    technical and non-technical stakeholders.
                </p>
            </div>
            <div>
                <SkillCloud />
            </div>
        </div>
    );
}
