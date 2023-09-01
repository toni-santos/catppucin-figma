// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

const latteColors = [
  "#dc8a78",
  "#dd7878",
  "#ea76cb",
  "#8839ef",
  "#d20f39",
  "#e64553",
  "#fe640b",
  "#df8e1d",
  "#40a02b",
  "#179299",
  "#04a5e5",
  "#209fb5",
  "#1e66f5",
  "#7287fd",
  "#4c4f69",
  "#5c5f77",
  "#6c6f85",
  "#7c7f93",
  "#8c8fa1",
  "#9ca0b0",
  "#acb0be",
  "#bcc0cc",
  "#ccd0da",
  "#eff1f5",
  "#e6e9ef",
  "#dce0e8"
];

const frappeColors = [
  "#f2d5cf",
  "#eebebe",
  "#f4b8e4",
  "#ca9ee6",
  "#e78284",
  "#ea999c",
  "#ef9f76",
  "#e5c890",
  "#a6d189",
  "#81c8be",
  "#99d1db",
  "#85c1dc",
  "#8caaee",
  "#babbf1",
  "#c6d0f5",
  "#b5bfe2",
  "#a5adce",
  "#949cbb",
  "#838ba7",
  "#737994",
  "#626880",
  "#51576d",
  "#414559",
  "#303446",
  "#292c3c",
  "#232634"
];

const macchiatoColors = [
  "#f4dbd6",
  "#f0c6c6",
  "#f5bde6",
  "#c6a0f6",
  "#ed8796",
  "#ee99a0",
  "#f5a97f",
  "#eed49f",
  "#a6da95",
  "#8bd5ca",
  "#91d7e3",
  "#7dc4e4",
  "#8aadf4",
  "#b7bdf8",
  "#cad3f5",
  "#b8c0e0",
  "#a5adcb",
  "#939ab7",
  "#8087a2",
  "#6e738d",
  "#5b6078",
  "#494d64",
  "#363a4f",
  "#24273a",
  "#1e2030",
  "#181926"
];

const mochaColors = [
  "#f5e0dc",
  "#f2cdcd",
  "#f5c2e7",
  "#cba6f7",
  "#f38ba8",
  "#eba0ac",
  "#fab387",
  "#f9e2af",
  "#a6e3a1",
  "#94e2d5",
  "#89dceb",
  "#74c7ec",
  "#89b4fa",
  "#b4befe",
  "#cdd6f4",
  "#bac2de",
  "#a6adc8",
  "#9399b2",
  "#7f849c",
  "#6c7086",
  "#585b70",
  "#45475a",
  "#313244",
  "#1e1e2e",
  "#181825",
  "#11111b"
];

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-palette') {
    const nodes: SceneNode[] = [];
    
    let cnt = 0;
    let palette = [""];    

    switch (msg.value) {
      case "latte":
        palette = latteColors;
        break;
      case "frappe":
        palette = frappeColors;
        break;
      case "macchiato":
        palette = macchiatoColors;
        break;
      case "mocha":
        palette = mochaColors;
        break;
    }

    for (const color of palette) {
      const rect = figma.createRectangle();
      rect.x = cnt * 150;
      rect.fills = [{type: 'SOLID', color: figma.util.rgb(color)}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
      cnt++;
    }
    figma.currentPage.selection = nodes;
    const group = figma.group(figma.currentPage.selection, figma.currentPage);
    group.name = msg.value.toUpperCase();
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
