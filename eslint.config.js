import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'quotes': ['error', 'single', { avoidEscape: true }], // 字符串统一用单引号
      'arrow-body-style': ['error', 'as-needed'], // 箭头函数体尽量简洁
      'prefer-const': 'error', // 优先使用const
      'no-var': 'error', // 禁止var声明
      'eqeqeq': ['error', 'always'], // 必须使用全等
      'object-curly-spacing': ['error', 'always'], // 对象大括号内必须有空格
      'array-bracket-spacing': ['error', 'never'], // 数组括号内不能有空格
      'comma-dangle': ['error', 'always-multiline'], // 多行对象/数组最后一个元素必须有逗号
  'no-console': ['warn', { allow: ['log', 'warn', 'error'] }], // 允许console.log、warn、error
      'no-debugger': 'error', // 禁止debugger
    },
  },
])
