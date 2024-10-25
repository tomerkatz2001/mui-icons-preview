type Theme = "dark" | "light";

export class ThemeHolder {
    private currentTheme: Theme = "dark";
    private darkThemes = [
        'Default Dark+',
        'Monokai',
        'Solarized Dark',
        'Abyss',
        'Dark+ (default dark)',
        'Visual Studio Dark',
        'Visual Studio 2017 Dark - C++',
        'Visual Studio Dark - C++',
        'Kimbie Dark'

        // Add other dark themes as needed
    ];
    private lightThemes = [
        'Default Light+',
        'Solarized Light',
        'Light+ (default light)',
        // Add other light themes as needed
    ];

    public setTheme(themeName: string) {
        this.currentTheme = this.isDarkTheme(themeName) ? "dark" : "light";
    }

    public getIconsColor() {
        const BLACK = "#000000";
        const WHITE = "#FFFFFF";
        return (this.currentTheme === "dark") ? WHITE : BLACK;
    }

    private isDarkTheme(themeName: string): boolean {
        return this.darkThemes.includes(themeName);
    }

}