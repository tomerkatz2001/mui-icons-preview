import * as Icons from '@mui/icons-material'; // Import all MUI icons
import React from 'react';
import { renderToString } from 'react-dom/server';
import { DOMParser, XMLSerializer } from 'xmldom';



export function getIconSVGByName(iconName:string, color: string)
{
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? extractSVG(renderToString(<IconComponent tyle={{ color: 'secondary' }} />), color) : null
}

function extractSVG(renderString: string, color: string)
{
    const svgWithNamespace = renderString.replace(
        '<svg',
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    const START_TAG = "<svg"
    const END_TAG = "</svg>"
    const startTagIndex = svgWithNamespace.indexOf(START_TAG);
    const endTagIndex = svgWithNamespace.indexOf(END_TAG);
    const svg = svgWithNamespace.substring(startTagIndex,endTagIndex + END_TAG.length)
    return colorSVG(svg, color);
}

function colorSVG(svgString: string, color: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");

    // Get all elements that may have a fill property (e.g., paths, circles, rects)
    const elements = doc.getElementsByTagName("*");

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (["path", "circle", "rect", "polygon", "ellipse"].includes(element.tagName)) {
            element.setAttribute("fill", color);
        }
    }

    return new XMLSerializer().serializeToString(doc);
}