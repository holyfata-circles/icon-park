import React from "react";
import { SVGRoot, SVGNode } from "./toAST";

const renderNode = (node: SVGNode) => {
    const { type, attributes, children } = node;
    const props = { ...attributes };
    
    if (children && children.length > 0) {
        return React.createElement(
            type,
            props,
            children.map((child, index) => (
                <React.Fragment key={index}>
                    {renderNode(child)}
                </React.Fragment>
            ))
        );
    }
    
    return React.createElement(type, props);
};

const toTSX: React.FC<{ data: SVGRoot }> = ({ data }) => {
    return (
        <svg 
            width={data.width} 
            height={data.height} 
            viewBox={data.viewBox} 
            fill={data.fill}
            xmlns="http://www.w3.org/2000/svg"
        >
            {data.children?.map((child, index) => (
                <React.Fragment key={index}>
                    {renderNode(child)}
                </React.Fragment>
            ))}
        </svg>
    );
};

export default toTSX;
