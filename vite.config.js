import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        target: 'es2015',
        minify: 'esbuild',
        cssMinify: true,
        sourcemap: false,
        chunkSizeWarningLimit: 1000,
        reportCompressedSize: true,
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                format: 'esm',
                manualChunks: {
                    jsonWorker: ['monaco-editor/esm/vs/language/json/json.worker'],
                    cssWorker: ['monaco-editor/esm/vs/language/css/css.worker'],
                    htmlWorker: ['monaco-editor/esm/vs/language/html/html.worker'],
                    tsWorker: ['monaco-editor/esm/vs/language/typescript/ts.worker'],
                    editorWorker: ['monaco-editor/esm/vs/editor/editor.worker'],
                    vendor: ['react', 'react-dom'],
                    // Split other common dependencies
                    commons: ['monaco-editor'],
                },
                compact: true,
                inlineDynamicImports: false,
                assetFileNames: 'assets/[name].[hash].[ext]',
                chunkFileNames: 'chunks/[name].[hash].js',
                entryFileNames: 'entries/[name].[hash].js',
            }
        }
    },
    optimizeDeps: {
        include: [
            'monaco-editor/esm/vs/editor/editor.api',
            'react',
            'react-dom'
        ],
        disabled: false,
        force: true,
        esbuildOptions: {
            target: 'es2015',
            treeShaking: true,
            minify: true,
            minifySyntax: true,
            minifyWhitespace: true,
            minifyIdentifiers: true
        }
    },
    server: {
        fs: {
            strict: false,
            allow: ['..']
        }
    }
});
