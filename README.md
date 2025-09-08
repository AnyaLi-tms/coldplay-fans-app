# ColdPlay Fans App
## 运行项目
`npm run dev`
## 检查错误
`npm run lint:all`
## 提交
- `git add .`
- `git commit -m 'commit msg'`
  - 此时会触发husky钩子
  - 先检查错误并自动修复，
  - 然后检查commit msg是否规范
### Commit Msg 规范 (Conventional Commits )
#### 格式示例：
- <type>[optional scope]: <description>
  - 常见type
    - feat       # 新功能
    - fix        # 修复 bug
    - docs       # 文档变更
    - style      # 格式/空格/分号等，不影响逻辑
    - refactor   # 重构
    - perf       # 性能优化
    - test       # 测试相关
    - chore      # 构建/工具/依赖更新等
- [optional body]
- [optional footer(s)]
#### 示例：
- `feat: add login page`
- `fix(api): handle error response`
- `docs: update README` 

