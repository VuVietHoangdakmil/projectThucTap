
const { override, addWebpackModuleRule } = require("customize-cra");

module.exports = override(
  addWebpackModuleRule({
    test: /\.less$/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
       
      },
      {
        loader: "less-loader",
      },
     
    ],
  })
);

