import typescript from 'rollup-plugin-typescript2';
import commonjs from "@rollup/plugin-commonjs";
import { uglify } from 'rollup-plugin-uglify';
export default {
    input: './src/index.ts',
    external: [
        'react'
    ],
    output: {
        file: './build/build.js',
        format: 'iife',
        sourcemap: true,
        name: 'useReactTabTrap',
        globals: {
            'react' : 'React'
        }
    },
    plugins: [
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
        }),
        process.env.NODE_ENV === 'production' && uglify(),
    ]
}