module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
        modules: false,
      },
    ],
  ],
  plugins: ["@vue/babel-plugin-jsx"],
  env: {
    utils: {
      presets: [
        [
          "@babel/env",
          {
            loose: true,
            modules: false,
          },
        ],
      ],
      plugins: [
        [
          "module-resolver",
          {
            root: ["yun-ui-next"],
            alias: { "yun-ui-next/src": "yun-ui-next/lib" },
          },
        ],
      ],
    },
  },
};
