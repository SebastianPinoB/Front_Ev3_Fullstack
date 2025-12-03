const path = require("path");
process.env.CHROME_BIN = "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe";

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "webpack"],

    files: [
      { pattern: "app/**/*.spec.ts", watched: false }
    ],

    preprocessors: {
      "app/**/*.spec.ts": ["webpack"]
    },

    webpack: {
      mode: "development",
      resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
          "~": path.resolve(__dirname, "app")
        }
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/
          }
        ]
      }
    },

    reporters: ["progress"],
    browsers: ["ChromeHeadless"],
    singleRun: true
  });
};
