import path from "path"
import { readFileSync, writeFileSync } from "fs"
import { svgToAST } from "./parser/toAST"

const svgPath = path.resolve(__dirname, './icons/three-d-glasses.svg')
const svgContent = readFileSync(svgPath, 'utf-8')

const astContent = svgToAST(svgContent)
const astPath = path.resolve(__dirname, './asts/three-d-glasses.ast')
writeFileSync(astPath, JSON.stringify(astContent, null, 2))
