module.exports = {
  entry: {
    browser_action: [
      __dirname + "/src/browser_action/PaintModeForm.js",
      __dirname + "/src/browser_action/main.js"
    ],
    background: [
      __dirname + "/src/background/extension_click_listener.js"
    ],
    content_script: [
      __dirname + "/src/content_script/paint.js"
    ]
  },
  output: {
    path: __dirname + "/dist/",
    filename: "[name].js"
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
