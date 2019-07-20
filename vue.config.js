let path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // webpack-dev-server 相关配置

  publicPath:
    process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
  devServer: {
    disableHostCheck: true,
    inline: true,
    proxy: {
      "/api.php": {
        target: "http://ke.sh.com:80/"
      },
      "/open-course.php": {
        target: "http://ke.sh.com:80/"
      },
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src")); // key,value自行定义，比如.set('@@', resolve('src/components'))
  }
};
