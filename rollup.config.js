import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: "src/main.js",
    treeshake: false,
    output: {
        file: "public/index.js",
        format: "umd",
    },
    plugins: [nodeResolve(), commonjs()]
};
