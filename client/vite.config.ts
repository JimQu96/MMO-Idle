import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7043', // 后端服务的地址
        changeOrigin: true, // 是否改变请求的源
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径
      },
    },
  },
})
