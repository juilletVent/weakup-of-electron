const path = require("path");

module.exports = {
  target: "electron-main",
  entry: "./src/main.ts",
  context: path.resolve(__dirname),
  output: {
    path: path.join(__dirname, "./build"),
    filename: "main.js",
  },
  mode: "production",
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
};
