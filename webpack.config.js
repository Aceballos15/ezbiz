const path = require('path');

module.exports = {
  entry: './src/index.js', // El punto de entrada de tu aplicación
  output: {
    path: path.resolve(__dirname, 'dist'), // La carpeta de salida donde se generará el bundle
    filename: 'bundle.js', // El nombre del archivo de salida
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Permite importar archivos .js y .jsx sin especificar su extensión
  },
};