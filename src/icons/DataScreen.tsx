import React from 'react';
import dataJSON from '../../output/>data-screen.ast.json';
import { SVGNode } from '../build';

const DataScreen = () => {

    const astJson = dataJSON;

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

export default DataScreen;
