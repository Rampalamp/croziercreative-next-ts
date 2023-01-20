import fs from "fs";
import { marked } from "marked";

const mdFiles: { [key: string]: string } = {
    HeaderCode: "./public/markdown/header.md",
    IndexCode: "./public/markdown/index.md",
    SkillsCode: "./public/markdown/skills.md",
    SkillCloudCode: "./public/markdown/skillcloud.md",
    AuditsCode: "./public/markdown/audits.md",
};

async function CreateCodeSnippetFile() {
    let fileContent: string = "";

    for (const [key, value] of Object.entries(mdFiles)) {
        const file = fs.readFileSync(value, "utf-8");

        const processedContent: string = marked(file);

        //Insert the prettyprint class onto code tag
        const insertAt: string = `<code class="`;

        const index: number =
            processedContent.indexOf(insertAt) + insertAt.length;

        const prettyprintClass: string = "prettyprint ";

        const finalContent: string = [
            processedContent.slice(0, index),
            prettyprintClass,
            processedContent.slice(index),
        ].join("");
        //     `export const ${key.toString()} = \`${finalContent.toString()}\`;`
        fileContent = fileContent.concat(
            `export const ${key}: string = \`${finalContent}\`;\n`
        );
    }

    // fs.writeFileSync(
    //     "./components/CodeSnippets.tsx",
    //     `export const HeaderCode = \`${finalContent}\`;`
    // );
    fs.writeFileSync("./constants/CodeSnippets.tsx", fileContent);
}

CreateCodeSnippetFile()
    .then(() => process.exit(0))
    .catch((error) => console.log(error));
