import * as fs from 'fs';
import * as path from 'path';
import { getIconSVGByName } from './svg-creator';


export async function getIconSVGAbsulotePath(icon:string, color:string,  extensionPath:string)
{
    const iconSvg = getIconSVGByName(icon, color);
    if(!iconSvg)
    {
        console.log(`could not file icon: [${icon}]`);
        return null;
    }
   return await saveIconFile(iconSvg, `${icon}_${color}`, extensionPath);
}

async function saveIconFile(iconContent: string, iconName:string, extensionPath:string): Promise<string> {
    const LOCAL_ICONS_DIR_NAME = "icons";
    const iconFileName = `${iconName}.svg`; // Define your icon file name
    const iconFilePath = path.join(extensionPath, LOCAL_ICONS_DIR_NAME, iconFileName);

    // Write the content to the file
    fs.mkdirSync(path.dirname(iconFilePath), { recursive: true });
    fs.writeFileSync(iconFilePath, iconContent, 'utf8');

    return iconFilePath;
}