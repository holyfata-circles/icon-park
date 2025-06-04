import path from 'path';
import { JSDOM } from 'jsdom';
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'fs';

// SVG 节点类型定义
export interface SVGNode {
    type: string;
    attributes: Record<string, string>;
    children?: SVGNode[];
}

// SVG 根节点类型定义
export interface SVGRoot extends SVGNode {
    type: 'svg';
    width: string;
    height: string;
    viewBox: string;
    fill: string;
}

// 将 SVG 字符串解析为 AST
function svgToAST(svgString: string): SVGRoot {
    // 移除 XML 声明
    const cleanSvg = svgString.replace(/<\?xml[^>]*\?>/, '').trim();

    // 用 jsdom 解析 SVG
    const dom = new JSDOM(cleanSvg, { contentType: 'image/svg+xml' });
    const svgElement = dom.window.document.documentElement;

    // 递归解析节点为 AST
    function parseNode(node: Element): SVGNode {
        // 提取属性
        const attributes = Object.fromEntries(
            Array.from(node.attributes).map(attr => [attr.name, attr.value])
        );
        // 递归处理子节点
        const children = Array.from(node.children).map(parseNode);
        return {
            type: node.tagName.toLowerCase(),
            attributes,
            ...(children.length > 0 && { children })
        };
    }

    return parseNode(svgElement) as SVGRoot;
}

// 主流程：批量读取 SVG，转换为 AST 并输出为 JSON
function main() {
    const downloadDir = path.join(__dirname, '../../download');
    const outputDir = path.join(__dirname, '../output');

    // 删除icons目录下的所有文件
    if (existsSync(outputDir)) {
        const files = readdirSync(outputDir);
        for (const file of files) {
            const filePath = path.join(outputDir, file);
            if (filePath !== __filename) { // 确保不删除当前脚本文件
                writeFileSync(filePath, ''); // 清空文件内容
            }
        }
    } else {
        // 如果目录不存在，则创建目录
        mkdirSync(outputDir, { recursive: true });
    }

  const files = readdirSync(downloadDir);

  files.forEach((file, idx) => {
    const filePath = path.join(downloadDir, file);
    const svgString = readFileSync(filePath, 'utf-8');
    const ast = svgToAST(svgString);
    console.log(`${idx + 1}/${files.length} ${file}`);
    // 生成输出文件名
    const astName = file.split('_')[1]?.replace('svg', 'ast') || file.replace('.svg', '.ast');
    const outputPath = path.join(outputDir, `${astName}.json`);
    writeFileSync(outputPath, JSON.stringify(ast, null, 2));
  });
}

main();
