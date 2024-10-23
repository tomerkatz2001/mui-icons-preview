import * as fs from 'fs';
import * as path from 'path';
import { getIconSVGByName } from './svg-creator';


export async function getIconSVGAbsulotePath(icon:string, extensionPath:string)
{
    const iconSvg = getIconSVGByName(icon);
    if(!iconSvg)
    {
        console.log(`could not file icon: [${icon}]`);
        return null;
    }
   return await saveIconFile(iconSvg, icon, extensionPath);
}

async function saveIconFile(iconContent: string, iconName:string, extensionPath:string): Promise<string> {
    const iconFileName = `${iconName}.svg`; // Define your icon file name
    const iconFilePath = path.join(extensionPath, iconFileName);

    // Write the content to the file
    fs.writeFileSync(iconFilePath, iconContent, 'utf8');

    return iconFilePath;
}