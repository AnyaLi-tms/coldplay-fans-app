module.exports = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['node_modules/**', 'dist/**', '*.min.css'], // <-- 代替 .stylelintignore
  rules: {
    'color-hex-length': 'short',
    'no-empty-source': null,
  },
};