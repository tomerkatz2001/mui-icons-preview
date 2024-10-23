import * as Icons from '@mui/icons-material'; // Import all MUI icons
import React from 'react';
import { renderToString } from 'react-dom/server';
import { pink } from '@mui/material/colors';



export function getIconSVGByName(iconName:string)
{
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? extractSVG(renderToString(<IconComponent sx={{ color: pink[500] }} />)) : null
}

function extractSVG(renderString: string)
{
    const svgWithNamespace = renderString.replace(
        '<svg',
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    const START_TAG = "<svg"
    const END_TAG = "</svg>"
    const startTagIndex = svgWithNamespace.indexOf(START_TAG);
    const endTagIndex = svgWithNamespace.indexOf(END_TAG);
    return svgWithNamespace.substring(startTagIndex,endTagIndex + END_TAG.length)
}