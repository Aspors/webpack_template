const cssnano = require("cssnano")({ preset: "default" });

const plugins = ["postcss-preset-env"];

if (process.env.NODE_ENV === "production") {
  plugins.push(cssnano);
}

module.exports = {
  plugins,
};
