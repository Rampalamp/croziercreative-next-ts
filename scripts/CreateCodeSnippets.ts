import fs from "fs";
import { marked } from "marked";

const mdFiles: string[] = ["./public/markdown/header.md"];

async function CreateCodeSnippetFile() {
    const file = fs.readFileSync(mdFiles[0], "utf-8");

    const processedContent: string = marked(file);
    //Insert the prettyprint class onto code tag
    const insertAt: string = `<code class="`;

    const index: number = processedContent.indexOf(insertAt) + insertAt.length;

    const prettyprintClass: string = "prettyprint ";

    const finalContent: string = [
        processedContent.slice(0, index),
        prettyprintClass,
        processedContent.slice(index),
    ].join("");

    fs.writeFileSync(
        "./components/CodeSnippets.tsx",
        `export const HeaderCode = \`${finalContent}\`;`
    );
}

CreateCodeSnippetFile()
    .then(() => process.exit(0))
    .catch((error) => console.log(error));
