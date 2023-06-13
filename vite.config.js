import {defineConfig} from 'vite';
import path from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import {createStyleImportPlugin, AndDesignVueResolve} from 'vite-plugin-style-import'
import AutoImport from 'unplugin-auto-import/vite'
import rollup from './rollup-build'
import viteCompression from 'vite-plugin-compression';
import theme from "./src/config/theme";
import autoprefixer from 'autoprefixer'
import eslint from 'vite-plugin-eslint'


export default defineConfig({
    plugins: [
        vue(),
        eslint({
            cache: false,
            //fix:true
        }),
        viteCompression(),
        vueSetupExtend(),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: 'less'
                })
            ],
        }),
        createStyleImportPlugin({
            resolves: [AndDesignVueResolve()],
        }),
        AutoImport(
            {
                imports: ['vue', 'pinia', 'vue-router'], //需要自动引入的包
                dts: './auto-auto.js',//生成文件路径
                vueTemplate: true, //Auto import inside Vue template,
            }
        ),
    ],
    build: {
        sourcemap: true,
        cssTarget: "chrome61",
        outDir: "dist",
        rollupOptions: rollup,
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true, //去掉所有console
                drop_debugger: true//去掉所有debugger
            }
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: theme,
                javascriptEnabled: true
            },
            scss:{
                additionalData: `
                @import "@/theme/theme.scss"; 
                @import "@/theme/scroll.scss";
                @import "@/assets/font/iconfont.scss";
                @import "@/theme/antd.scss";
                `
            }
        },
        postcss: {
            plugins: [
                autoprefixer()
            ]
        }
    },
    server: {
        host: "0.0.0.0",
        port: 8081
    },
    resolve: {
        alias: {
            // eslint-disable-next-line no-undef
            '@': path.join(__dirname, 'src')
        }
    }
})


