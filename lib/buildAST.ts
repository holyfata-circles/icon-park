import { JSDOM } from 'jsdom';
import path from 'path';
import { readFileSync, readdirSync, writeFileSync } from 'fs';

export interface SVGNode {
  type: string;
  attributes: Record<string, string>;
  children?: SVGNode[];
}

export interface SVGRoot extends SVGNode {
  type: 'svg';
  width: string;
  height: string;
  viewBox: string;
  fill: string;
}

function svgToAST(svgString: string): SVGRoot {
  // 移除XML声明
  const cleanSvg = svgString.replace(/<\?xml[^>]*\?>/, '').trim();
  
  // 使用jsdom解析SVG
  const dom = new JSDOM(cleanSvg, { contentType: 'image/svg+xml' });
  const svgElement = dom.window.document.documentElement;

  function parseNode(node: Element): SVGNode {
    const attributes: Record<string, string> = {};
    for (const attr of Array.from(node.attributes)) {
      attributes[attr.name] = attr.value;
    }

    const children: SVGNode[] = [];
    for (const child of Array.from(node.children)) {
      children.push(parseNode(child));
    }

    return {
      type: node.tagName.toLowerCase(),
      attributes,
      children: children.length > 0 ? children : undefined
    };
  }

  const root = parseNode(svgElement) as SVGRoot;
  return root;
}

const main = () => {
    const downloadDir = path.join(__dirname, '..', 'download');
    const outputDir = path.join(__dirname, '..', 'output');
    const files = readdirSync(downloadDir);
    const total = files.length;
    let count = 0;
    for (const file of files) {
        const filePath = path.join(downloadDir, file);
        const svgString = readFileSync(filePath, 'utf-8');
        const ast = svgToAST(svgString);
        count++;
        console.log(`${count}/${total} ${file}`);
        const astName = file.split('_')[1].replace('svg', 'ast');
        const outputPath = path.join(outputDir, `${astName}.json`);
        writeFileSync(outputPath, JSON.stringify(ast, null, 2));
    }
}

main()
