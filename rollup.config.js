import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sass from 'rollup-plugin-sass';

export default {
    input: "src/main.js",
    treeshake: false,
    output: {
        file: "public/index.js",
        sourcemap: true,
        format: "umd",
    },
    plugins: [nodeResolve(), commonjs(), sass({
        options: {
            includePaths: ['node_modules'],
        },
        output: 'public/app.css'
    })]
};
