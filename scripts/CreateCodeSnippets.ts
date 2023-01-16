import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const mdFiles: string[] = ["./public/header.md"];

async function CreateCodeSnippetFile() {
    const file = fs.readFileSync(mdFiles[0], "utf-8");

    const { content } = matter(file);

    // const processedContent = (
    //     await remark().use(html).process(content)
    // ).toString();

    const processedContent: string = (
        await remark().use(html).process(content)
    ).toString();
    //We want to add class="prettyprint" to the <code> tag that remark generates
    const tag: string = "<code";
    const index: number = processedContent.indexOf(tag) + tag.length;
    const prettyprintClass: string = ` class="prettyprint"`;
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
