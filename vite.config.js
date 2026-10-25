import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: ['legacy-js-api'],
			},
		},
	},
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, './src/app'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@features': path.resolve(__dirname, './src/features'),
			'@entities': path.resolve(__dirname, './src/entities'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@shared': path.resolve(__dirname, './src/shared'),
		},
	},
	server: {
		port: 3000,
		open: true,
		proxy: {
			'/identity': {
				target: 'http://localhost:5000',
				changeOrigin: true,
			},
			'/teacher': {
				target: 'http://localhost:5000',
				changeOrigin: true,
			},
		},
	},
	build: {
		outDir: 'dist',
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom', 'react-router-dom'],
					redux: ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
					i18n: ['i18next', 'react-i18next'],
				},
			},
		},
	},
})
