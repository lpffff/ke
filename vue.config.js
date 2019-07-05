module.exports = {
  // webpack-dev-server 相关配置
  devServer: {
    disableHostCheck: true,
    inline: true,
    proxy: {
      "/api.php": {
        target: "http://ke.sh.com:80/"
      }
    }
  }
};
