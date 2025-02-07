import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    assetsInclude: ['**/*.hdr'],
    plugins: [react()],
    base: '/portfolio-abir/',
    sourcemap: true,

});