import React from 'react';
import ACane from './asts/a-cane.ast?raw';
import { SVGNode } from './libs/toAST';

const Icon = () => {
    const astJson = JSON.parse(ACane);

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

    return (
        <div>
            {renderNode(astJson)}
        </div>
    );
}

export default Icon;
