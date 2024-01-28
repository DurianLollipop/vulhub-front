import { ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import eslintPlugin from "vite-plugin-eslint";

import path, { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import IconResolver from 'unplugin-icons/resolver';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Icons from 'unplugin-icons/vite';
import vue from '@vitejs/plugin-vue';
const pathSrc = path.resolve(__dirname, 'src');
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const env = loadEnv(mode, process.cwd()); // 获取.env文件里定义的环境变量
	return {
		base: env.VITE_PUBLIC_PATH, // 开发公共基础路径
		resolve: {
			//配置项目的绝对路径
			alias: {
				'@': resolve(__dirname, 'src'), // 设置 @ 指向 /src 目录
			},
		},
		server: {
			port: 8818, //端口
			host: '0.0.0.0',
			cors: true, // 默认启用并允许任何源
			//代理
			proxy: {},
		},
		plugins: [
			vue(),
			//自动导入components下的自定义组件
			Components({
				// dirs 指定组件所在位置，默认为 src/components
				// 可以让我们使用自己定义组件的时候免去 import 的麻烦
				dirs: ['src/components/', 'src/layout'],
				// 配置需要将哪些后缀类型的文件进行自动按需引入，'vue'为默认值
				extensions: ['vue', 'ts'],
				// 解析组件，这里以 Element Plus 为例
				resolvers: [
					ElementPlusResolver({
						importStyle: 'sass', // 非官方，必要
					}),
					IconResolver({ enabledCollections: ['ep'] }),
				],
				// 遍历子目录
				deep: true,
				dts: path.resolve(pathSrc, 'types', 'components.d.ts'), // 指定自动导入组件TS类型声明文件路径
			}),
			//自动导入组件
			AutoImport({
				imports: ['vue', 'vuex', 'vue-router'],
				dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts'), // 指定自动导入函数TS类型声明文件路径
				eslintrc: {
					enabled: true,
					filepath: path.resolve(
						pathSrc,
						'types',
						'.eslintrc-auto-import.json'
					),
					globalsPropValue: true,
				},
				resolvers: [ElementPlusResolver(), IconResolver({ prefix: 'Icon' })],
			}),
			//自动导入图标
			Icons({ scale: 1, defaultClass: 'inline-block', autoInstall: true }),
			//vueJsx
			vueJsx({}),
      eslintPlugin(),
		],
	};
});


