import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import { uglify } from 'rollup-plugin-uglify';
export default {
    input: './src/index.ts',
    external: [
        'react'
    ],
    output: {
        file: './build/build.js',
        format: 'esm',
        sourcemap: true,
        name: 'useReactTabTrap',
        globals: {
            'react' : 'React'
        }
    },
    plugins: [
        peerDepsExternal(),
        nodeResolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
        }),
        process.env.NODE_ENV === 'production' && uglify(),
    ]
}