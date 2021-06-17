const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'main-bundle-[hash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss'],
    alias: {
      '@domain': path.join(__dirname, 'src/domain'),
      '@data': path.join(__dirname, 'src/data'),
      '@infra': path.join(__dirname, 'src/infra'),
      '@main': path.join(__dirname, 'src/main'),
      '@shared': path.join(__dirname, 'src/shared'),
      '@validation': path.join(__dirname, 'src/validation')
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
