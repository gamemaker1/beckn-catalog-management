// config/rollup.js
// Rollup configuration

import svelte from 'rollup-plugin-svelte'

import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

import livereload from 'rollup-plugin-livereload'
import css from 'rollup-plugin-css-only'
import { terser } from 'rollup-plugin-terser'

import preprocess from 'svelte-preprocess'

const production = !process.env.ROLLUP_WATCH

const serve = () => {
	let server

	const toExit = () => server && server.kill(0)

	return {
		writeBundle: () => {
			if (!server)
				server = require('child_process').spawn(
					'pnpm',
					['run', 'start', '--', '--dev'],
					{
						stdio: ['ignore', 'inherit', 'inherit'],
						shell: true,
					}
				)

			process.on('SIGTERM', toExit)
			process.on('exit', toExit)
		},
	}
}

export default {
	input: 'source/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
	},
	plugins: [
		svelte({
			preprocess: preprocess({
				sourceMap: !production,
			}),
			compilerOptions: {
				dev: !production,
			},
		}),
		css({ output: 'bundle.css' }),
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		commonjs(),
		typescript({
			tsconfig: './tsconfig.json',
			sourceMap: !production,
			inlineSources: !production,
		}),
		!production && serve(),
		!production && livereload('public'),
		production && terser(),
	],
}
