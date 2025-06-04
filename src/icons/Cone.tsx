import React from 'react';
import dataJSON from '../../output/cone.ast.json';
import { SVGNode, SVGRoot } from '../build';

const Cone = () => {

    const astJson = dataJSON as unknown as SVGRoot;

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

export default Cone;
