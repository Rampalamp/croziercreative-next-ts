import SkillCloud from "../components/SkillCloud";

export default function Skills() {
    return (
        <div className="flex flex-col">
            <div className="text-center">
                <p>
                    I am comfortable working on both the front-end and back-end
                    aspects of an application and have an understanding of the
                    entire development process, from ideation to deployment. I
                    am also experienced working in agile development
                    environments and am skilled at communicating with both
                    technical and non-technical stakeholders. Click on the
                    skills below to see specifics!
                </p>
            </div>
            <div className="mt-20">
                <SkillCloud />
            </div>
        </div>
    );
}
