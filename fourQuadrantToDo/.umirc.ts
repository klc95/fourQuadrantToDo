import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  "proxy": {
    "/todo": {
      "target": "http://localhost:3000/",
      "changeOrigin": true,
    }
  }
});
