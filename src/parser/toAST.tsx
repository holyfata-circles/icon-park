import { JSDOM } from 'jsdom';

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

export function svgToAST(svgString: string): SVGRoot {
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
