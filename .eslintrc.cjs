module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // node 全局变量可用，方便一些工具脚本
    jest: true, // 测试环境
  },
  parserOptions: {
    ecmaVersion: "latest", // 支持最新 ES 语法
    sourceType: "module",
    ecmaFeatures: {
      jsx: true, // 支持 JSX
    },
  },
  extends: [
    "eslint:recommended", // 基础推荐规则
    "plugin:react/recommended", // React 推荐规则
    "plugin:react-hooks/recommended", // React Hooks 推荐规则
    "plugin:prettier/recommended", // Prettier 集成
  ],
  plugins: ["react", "react-hooks"],
  settings: {
    react: {
      version: "detect", // 自动检测 React 版本
    },
  },
  rules: {
    // 基础 ESLint 规则
    "no-var": "error", // 禁止 var
    "no-multiple-empty-lines": ["warn", { max: 1 }],
    "no-unexpected-multiline": "error",
    "no-useless-escape": "off",
    "eqeqeq": ["error", "always"], // 必须使用全等
    "quotes": ["error", "single", { avoidEscape: true }], // 字符串统一用单引号
    "arrow-body-style": ["error", "as-needed"], // 箭头函数体尽量简洁
    "prefer-const": "error", // 优先使用 const
    "object-curly-spacing": ["error", "always"], // 对象大括号必须有空格
    "array-bracket-spacing": ["error", "never"], // 数组括号内不能有空格
    "comma-dangle": ["error", "always-multiline"], // 多行对象/数组最后必须有逗号
    "no-console": "warn", // 警告 console
    "no-debugger": "error", // 禁止 debugger

    // React 相关规则
    "react/prop-types": "off", // 不用 prop-types
    "react/react-in-jsx-scope": "off", // React 17+ 不需要 import React
    "react/jsx-uses-vars": "error",

    // Hooks 相关规则
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 使用规则
    "react-hooks/exhaustive-deps": "warn", // 检查 useEffect 依赖
  },
};