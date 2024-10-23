
export function getMUIIconsImports(fileContent: string)
{
    const lines = fileContent.split('\n');
    const icons: string[] = [];
    const importPattern = /import\s+(\w+)\s+from\s+['"]@mui\/icons-material\/(\w+)['"]/;

    lines.forEach(line => {
        const match = line.match(importPattern);
        if (match) {
            const iconName = match[2]; // Capture the icon name from the import path
            icons.push(iconName);
        }
    });

    return icons;
}

export function getLinesIcon(line: string, iconsBank: string[])
{
    const sortedIconsBankByLength = iconsBank.sort((a, b) => b.length - a.length);

    for(const icon of sortedIconsBankByLength)
    {
        const IconName = icon + 'Icon';
        if (line.includes(IconName) && !line.includes("import"))
        {
            return icon;
        }
    }
    return null;
}