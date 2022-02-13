
module.exports = {
  presets: ['module:metro-react-native-babel-preset','@babel/preset-env'],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-runtime"]
    }
  }
};