import { readFileSync, writeFileSync } from "fs";
import { NodeHtmlMarkdown } from "node-html-markdown";
const nhm = new NodeHtmlMarkdown();

import fetch from "node-fetch";

const getMD = async (slug) => {
  const pagedata = await fetch(
    "https://learn.codethedream.org/wp-json/wp/v2/pages?" + "slug=" + slug
  );
  const pagejsonarray = await pagedata.json();
  pagejsonarray.forEach((pagejson, i) => {
    const md = nhm.translate(
      "<h1>" + pagejson.title.rendered + "</h1>\n" + pagejson.content.rendered
    );
    const title = pagejson.title.rendered;
    const titleYaml = '"' + title + '"';
    const description = '"imported from WordPress,' + title + '"';
    const boilerplate = `--- \
    \nlayout: \"../../layouts/genericMarkdownFile.astro\" \
    \ntitle: ${titleYaml} \
    \ndescription: ${description} \
    \n---\n\n`;
    let fn = slug;
    if (i > 0) fn += `-${i}`;
    writeFileSync(fn + ".md", boilerplate + md);
  });
};

const slugData = readFileSync(process.argv[2], "utf8");
const slugArray = slugData.split("\n");
slugArray.forEach((slug) => {
  getMD(slug);
});
