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

    const processedContent = (
        await remark().use(html).process(content)
    ).toString();

    fs.writeFileSync(
        "./components/CodeSnippets.tsx",
        `export const HeaderCode = \`${processedContent}\`;`
    );
}

CreateCodeSnippetFile()
    .then(() => process.exit(0))
    .catch((error) => console.log(error));
