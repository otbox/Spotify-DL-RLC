import { defineConfig } from 'vite';

export default defineConfig({
  root: path.resolve(__dirname),
  server: {
    port: 3000, // Porta do servidor local
  },
  resolve: {
    alias: {
      // Adicione aliases personalizados aqui, se necessário
    },
  },
});
