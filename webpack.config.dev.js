// CONFIGURACIONES DEL PROYECTO

// - DEFINIR CONFIGURACIONES INICIALES
// - PUNTO DE ENTRADA
// - HACIA DONDE SE DIRIGE LA COMPILACION DEL PROYECTO
// - DEFINIR EXTENSIONES A UTILIZAR

/* Unos de las razones por que utilizamos webpack 
es porque nos permite optimizar y comprimir nuestro proyecto */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack');

// configuraciones
module.exports = {
  // elemento inicial de la app
  entry: './src/index.js',
  // ubicacion del archivo donde se almacena la compilacion de webpack
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // IDENTIFICAR CADA COMPILACION DEL PROYECTO CON UN HASH
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },

  mode: 'development',
  
  /* El modo watch hace que nuestro proyecto se 
  compile de forma automática. Es decir que está atento a cambios */
  watch: true, 

  // objeto resolve el cual nos permite configurar 
  // la forma en que webpack resolverá los módulos incorporados.
  resolve: {
    extensions: ['.js'],
    alias: { // ALIAS PARA DEFINIR DIRECCIONES DE FORMA AMIGABLES
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    },

  },

  module: {
    rules: [
      {
        // INDICAMOS A WEBPACK COMO IDENTIFICAR LOS ARCHIVOS .JS
        /* Babel te permite hacer que tu código JavaScript sea 
        compatible con todos los navegadores */
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        // INDICAMOS A WEBPACK COMO IDENTIFICAR LOS ARCHIVOS CSS 
        // Y TAMBIEN LOS PREPROCESADORES DE CSS COMO: SASS, STYLUS, ETC.
        // npm i -D node-sass sass-loader
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      },

      {
        // INDICAMOS A WEBPACK COMO IDENTIFICAR LOS ARCHIVOS PNG
        
        /* Este loader nos permite importar de forma dinámica en 
        nuestros archivos JavaScript imágenes, el loader le genera 
        un hash unico para cada imagen. */

        /* Puedes usar una forma de importar las imágenes haciendo un 
        import de las mismas y generando una variable No es necesario 
        instalar ninguna dependencia, webpack ya lo tiene incluido 
        debemos agregar la siguiente configuración */

        test: /\.png/,
        type: 'asset/resource'
      },

      {
        // INDICAMOS A WEBPACK COMO IDENTIFICAR LAS FONTS
        test: /\.(woff|woff2)$/, //expresion regular
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000, // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
            // Habilita o deshabilita la transformación de archivos en base64.
            mimetype: 'aplication/font-woff',
            // Especifica el tipo MIME con el que se alineará el archivo. 
            // Los MIME Types (Multipurpose Internet Mail Extensions)
            // son la manera standard de mandar contenido a través de la red.
            name: "[name].[contenthash].[ext]",
            // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
            // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
            // ubuntu-regularhola.woff
            outputPath: './assets/fonts/',
            // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
            publicPath: './assets/fonts/',
            // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
            esModule: false
            // AVISAR EXPLICITAMENTE SI ES UN MODULO
          }
        }
      },

    ]
  },

  // AGREGA PLUGIN PARA PROCESAR HTML
  plugins: [
    /* Es un plugin para inyectar javascript, css, favicons, 
    y nos facilita la tarea de enlazar los bundles a nuestro template HTML. */

    new HtmlWebpackPlugin({
      inject: true, //injecta el codigo js en el html
      template: './public/index.html',
      filename: './index.html'
    }),

    // AGREGA EL PLUGIN PARA CSS
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),

    // PLUGIN PARA COPIAR ARCHIVOS A EL DIRECTORIO DE PRODUCCION DIST
    /* Si tienes la necesidad de mover un archivo o directorio a tu proyecto 
    final podemos usar un plugin llamado “copy-webpack-plugin” */
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),

    new Dotenv(),
    
  ],


}