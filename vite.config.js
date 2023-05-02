import { resolve } from 'path'
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";


export default defineConfig({
    plugins: [react(), svgr({
        include: '**/*.svg'
    })],
    root: "./src",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, './src/index.html')
            }
        }
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, './src'),
            '@assets': resolve(__dirname, './src/assets'),
            '@pages': resolve(__dirname, './src/pages'),
            '@components': resolve(__dirname, './src/components'),
            '@utils': resolve(__dirname, './src/utils'),
            '@models': resolve(__dirname, './src/models'),
            '@store': resolve(__dirname, './src/store'),
        }
    },
})