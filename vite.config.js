import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5174
    },
    build: {
        // Enable gzip compression
        reportCompressedSize: true,
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    'monaco': ['@monaco-editor/react'],
                    'vendor': ['react', 'react-dom', 'split.js']
                }
            }
        }
    },
    optimizeDeps: {
        include: ['@monaco-editor/react', 'split.js']
    }
});
