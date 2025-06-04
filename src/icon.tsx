import React, { useEffect, useState } from 'react';
import { SVGNode } from './libs/toAST';

const Icon: React.FC<{ name: string }> = ({ name }) => {
    const [astJson, setAstJson] = useState<SVGNode | null>(null);

    useEffect(() => {
        const loadAST = async () => {
            try {
                const module = await import(`./asts/${name}.ast?raw`);
                setAstJson(JSON.parse(module.default));
            } catch (error) {
                console.error(`Failed to load AST for icon: ${name}`, error);
            }
        };

        loadAST();
    }, [name]);

    const renderNode = (node: SVGNode): React.ReactNode => {
        const { type, attributes, children } = node;
        
        const props = {
            ...attributes,
            key: Math.random().toString(36).substr(2, 9)
        };

        if (children) {
            return React.createElement(
                type,
                props,
                children.map(child => renderNode(child))
            );
        }

        return React.createElement(type, props);
    };

    if (!astJson) {
        return null;
    }

    return (
        <div>
            {renderNode(astJson)}
        </div>
    );
}

export default Icon;
