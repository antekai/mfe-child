const singleSpaApplicationPlugin = require("craco-plugin-single-spa-application");

const singleSpaPlugin = {
  plugin: singleSpaApplicationPlugin,
  options: {
    orgName: "ante",
    projectName: "sispa-mfe-child",
    entry: "src/single-spa-index.js", //defaults to src/index.js,
    orgPackagesAsExternal: false, // defaults to false. marks packages that has @my-org prefix as external so they are not included in the bundle
    reactPackagesAsExternal: true, // defaults to true. marks react and react-dom as external so they are not included in the bundle
    // externals: ["react-router", "react-router-dom"], // defaults to []. marks the specified modules as external so they are not included in the bundle
    minimize: false, // defaults to false, sets optimization.minimize value
  },
};

const getPlugins = () => {
  let plugins = [];

  if (process.env.REACT_APP_MODE !== "standalone") {
    // standalone mode is used only for development script: yarn start:standalone
    plugins.push(singleSpaPlugin);
  }

  return plugins;
};

module.exports = {
  plugins: getPlugins(),
  externals: ["@ante/sispa-mfe-child"],
};
