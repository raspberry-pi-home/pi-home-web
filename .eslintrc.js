module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      modules: true
    }
  },
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "object-curly-spacing": ["error", "always"],
    "no-console": [ "error", { allow: ["warn", "error"] }],
    semi: ["error", "never"],
    indent: ["error", 2],
    quotes: ["error", "single"],
    "comma-dangle": ["error", "always-multiline"]
  }
}
