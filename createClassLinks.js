const {readdirSync, writeFileSync } = require('fs')
const path = require('path')

let files = readdirSync("./")


files = files.filter(file1 => file1 != "classLinks.md")

files = files.filter(file1 => {
    return (path.extname(file1) === '.md')
})

const boilerplate = `--- \
\nlayout: \"../../layouts/genericMarkdownFile.astro\" \
\ntitle: classLinks \
\ndescription: Links to all the files in this directory \
\n---\n\n`
writeFileSync("./classLinks.md", boilerplate)
files.forEach((file1) => {
    const fileBase = path.basename(file1, ".md")
    writeFileSync("./classLinks.md",`- [${file1}](${fileBase})\n`, {flag: "a"})
})
