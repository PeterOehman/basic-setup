'use strict'

module.exports = {
  //where our dependency graph will start
  entry: './client/index.js',
  //where our bundled file will be
  output: {
      path: __dirname,
      filename: './public/bundle.js'
  },
  //makes debugging better with browser devtools
  //more to learn about on this one
  devtool: 'source-map',
  //webpack has two modes, development and production, more to learn here
  mode: 'development',
  //this is configuration for how webpack handles the modules
  module: {
    //rules for modules
    rules: [
      {
        //does the file name end in .js or .jsx, is it also not in node_modules, then use babels react transpiler to change jsx into regular js
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ]
        }
      },
      {
        //find a css file? use css loader to bundle them all together and style loader to automatically put it in the dom
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
