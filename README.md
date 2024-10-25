# mui-icons-preview README

`mui-icons-preview` is a Visual Studio Code extension that displays Material UI (MUI) icons directly in the editor's gutter next to the line numbers. This enhances your code's readability and provides a visual reference, especially when working with MUI-based projects.

## Features

- Display MUI icons in the gutter next to the code line numbers.
- Customize which MUI icons appear and on which lines.
- Easily toggle icons on/off using configuration settings.
- Works seamlessly with MUI's extensive icon library to enhance the development experience.

Here's an example of the extension in action:

![mui-icons-preview](https://raw.githubusercontent.com/tomerkatz2001/mui-icons-preview/master/images/mui-icons-preview.png)

> Tip: Add as many icons as you need and adjust their placement according to your project’s structure!

<!-- ## Requirements

- **Visual Studio Code**: Version 1.60.0 or higher is required to run this extension.
- **Material UI Icons Library**: Ensure that `@mui/icons-material` is installed in your project.

To install the MUI Icons library, run:

```bash
npm install @mui/icons-material -->

## Extension Settings

This extension contributes the following settings:

- `mui-icons-preview.enable`: Enable or disable the extension.

## Known Issues

- Performance may slow down in large files with many decorations.

## Release Notes

### 1.0.0

Initial release of `mui-icons-preview` with basic functionality for displaying icons in the gutter.

### 1.0.1
bug fix:
removing icons after the code is removed.

### 1.0.2
bug fix:
changing the color of the icons according to the theme of the editor.