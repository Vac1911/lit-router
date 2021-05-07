import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: "src/main.js",
    output: {
        file: "public/index.js",
        format: "umd",
    },
    plugins: [nodeResolve()]
};
