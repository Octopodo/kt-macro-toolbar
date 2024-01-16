(function (thisObj) {

var config = {
  version: version,
  id: "com.kt-toolbar.cep",
  displayName: "KT Toolbar",
  symlink: "local",
  port: 3000,
  servePort: 5000,
  startingDebugPort: 8860,
  extensionManifestVersion: 6.0,
  requiredRuntimeVersion: 9.0,
  hosts: [{
    name: "AEFT",
    version: "[0.0,99.9]"
  }, {
    name: "PPRO",
    version: "[0.0,99.9]"
  }],
  type: "Panel",
  iconDarkNormal: "./src/assets/light-icon.png",
  iconNormal: "./src/assets/dark-icon.png",
  iconDarkNormalRollOver: "./src/assets/light-icon.png",
  iconNormalRollOver: "./src/assets/dark-icon.png",
  parameters: ["--v=0", "--enable-nodejs", "--mixed-context"],
  width: 500,
  height: 550,
  panels: [{
    mainPath: "./main/index.html",
    name: "main",
    panelDisplayName: "KT Toolbar",
    autoVisible: true,
    width: 600,
    height: 650,
    scriptPath: "./jsx/kt/index.jsxinc"
  }, {
    mainPath: "./img-browser/index.html",
    name: "img-browser",
    panelDisplayName: "KT Browser",
    autoVisible: true,
    width: 600,
    height: 650,
    scriptPath: "./jsx/kt/index.jsxinc"
  }],
  build: {
    jsxBin: "off",
    sourceMap: true
  },
  zxp: {
    country: "US",
    province: "CA",
    org: "MyCompany",
    password: "mypassword",
    tsa: "http://timestamp.digicert.com/",
    sourceMap: false,
    jsxBin: "off"
  },
  installModules: [],
  copyAssets: ["./jsx/kt/"],
  copyZipAssets: []
};

var ns = config.id;

var example$1 = function example() {};

var aeft = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  example: example$1
});

var example = function example() {};

var ppro = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  example: example
});

var host = typeof $ !== "undefined" ? $ : window;
switch (BridgeTalk.appName) {
  case "aftereffects":
  case "aftereffectsbeta":
    host[ns] = aeft;
    break;
  case "premierepro":
  case "premiereprobeta":
    host[ns] = ppro;
    break;
}

// https://extendscript.docsforadobe.dev/interapplication-communication/bridgetalk-class.html?highlight=bridgetalk#appname
