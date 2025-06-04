import path from "path"
import { readdirSync, readFileSync, writeFileSync } from "fs"
import { svgToAST } from "./libs/toAST"

const iconDir = path.resolve(__dirname, './icons')
const iconFiles = readdirSync(iconDir)

iconFiles.forEach(iconFile => {
    const iconPath = path.resolve(iconDir, iconFile)
    const iconContent = readFileSync(iconPath, 'utf-8')
    const ast = svgToAST(iconContent)
    const astName = iconFile.split('_')[1].replace('.svg', '.ast')
    const astPath = path.resolve(__dirname, `./asts/${astName}`)
    writeFileSync(astPath, JSON.stringify(ast, null, 2))
})
