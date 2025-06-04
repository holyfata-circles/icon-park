import { SVGRoot, SVGNode } from './toAST';

export function astToSVGRoot(ast: any): SVGRoot {
  // 验证根节点是否为 svg 类型
  if (ast.type !== 'svg') {
    throw new Error('Invalid AST: root node must be of type "svg"');
  }

  // 验证必需的属性
  const requiredAttributes = ['width', 'height', 'viewBox'];
  for (const attr of requiredAttributes) {
    if (!ast.attributes[attr]) {
      throw new Error(`Invalid AST: missing required attribute "${attr}"`);
    }
  }

  // 递归处理子节点
  function processNode(node: any): SVGNode {
    const processedNode: SVGNode = {
      type: node.type,
      attributes: { ...node.attributes }
    };

    if (node.children && Array.isArray(node.children)) {
      processedNode.children = node.children.map(processNode);
    }

    return processedNode;
  }

  // 处理根节点
  const root: SVGRoot = {
    type: 'svg',
    width: ast.attributes.width,
    height: ast.attributes.height,
    viewBox: ast.attributes.viewBox,
    fill: ast.attributes.fill,
    attributes: { ...ast.attributes },
    children: ast.children ? ast.children.map(processNode) : undefined
  };

  return root;
}
