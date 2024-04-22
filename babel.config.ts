// babel.config.ts
export default {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "current",
            esmodules: true
          },
          modules: 'commonjs'
        },
      ],
    ],
  }