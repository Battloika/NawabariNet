module.exports = {
  entry: __dirname + "/src/browser_action/main.js",
  output: {
    path: __dirname + "/dist",
    filename: "browser_action.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        query: {
          presets: [
            "es2015",
            "stage-0",
            "react"
          ]
        }
      }
    ]
  }
};
