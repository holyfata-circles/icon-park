import toTSX from "./parser/toTSX"
import { readFileSync } from "fs"
import path from "path"

const IconThreeDGlasses = () => {
    const astPath = path.resolve(__dirname, './asts/three-d-glasses.ast')
    const ast = JSON.parse(readFileSync(astPath, 'utf-8'))
    return toTSX({ data: ast })
}

export default IconThreeDGlasses
