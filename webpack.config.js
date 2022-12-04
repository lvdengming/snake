// 引入路径包
const path = require('path')
// 引入 webpack 插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // 以某个 .html 文件为模板，生成引用 TS 生成 .js 文件的 .html 文件
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin') // 每次 TS 生成 dist 文件夹时，都清空 dist 文件夹下的文件, 做到旧结果不干扰结果

// webpack 中的所有配置信息都应该写在 module.exports 中
module.exports = {
	// 指定入口文件
	entry: './src/index.ts',
	// 指定打包文件所在目录
	output: {
		// 指定打包文件的目录
		path: path.resolve(__dirname, 'dist'), // 当前目录下创建 dist 文件夹
		// 设置打包后的文件名
		filename: 'bundle.js',
		environment: {
			arrowFunction: false, // 告诉 webpack 不使用箭头函数
			const: false // 告诉 webpack 不使用 const
		}
	},
	// 指定 webpack 打包时要使用的模块
	module: {
		// 指定要加载的规则
		rules: [{
				// test 指定的是规则生效的文件
				test: /\.ts$/,
				// 要使用的 loader, babel 同样也需要对此进行加载
				use: [{ // 【再将 JS 代码通过 babel 转换】
						loader: 'babel-loader', // 指定加载器
						options: { // 设置 babel
							presets: [ // 设置预定义环境
								[
									"@babel/preset-env", // 指定环境插件
									// 配置信息
									{
										targets: { // 需要适配的浏览器版本
											"ie": "8"
										},
										"corejs": "3", // 指定 corejs 的版本
										"useBuiltIns": "usage" // 使用 corejs 的方式，"usage" 表示按需加载
									}
								]
							]
						}
					},
					'ts-loader' // 相对位置越靠后，越先执行【先将 TS 代码转换】
				],
				// 要排除的文件
				exclude: /node_modules/
			},
			{ // 设置 less 文件的处理
				test: /\.less$/,
				use: [ // 插件加载顺序，从后往前
					"style-loader",
					"css-loader",
					{ // 引入 postcss
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"postcss-preset-env", // 指定环境
										{ // 指定兼容的浏览器版本
											browsers: "last 2 versions" // 兼容浏览器最新的两个版本之内
										}
									]
								]
							}
						}
					},
					"less-loader",
				]
			}
		]
	},
	// 配置 webpack 插件
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new CleanWebpackPlugin()
	],
	// 设置引用模块
	resolve: {
		extensions: ['.ts', '.js']
	},
	mode: "production" // 打包的环境，"development" | "production" | "none"，开发|实际运用|无 
}