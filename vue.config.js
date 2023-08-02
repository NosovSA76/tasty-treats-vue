const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: `/tasty-treats-vue/`,
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/_variables.scss";`,
      },
    },
  },
});
