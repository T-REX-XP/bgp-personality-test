import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxFactory: 'React.createElement', // Use React.createElement for React 16
      jsxFragment: 'React.Fragment',    // Use React.Fragment for React 16
    }),
  ],
});
