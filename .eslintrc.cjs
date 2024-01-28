module.exports = {
    // 环境:
      env: {
          // 浏览器
          browser: true,
          // 最新es语法
          es2021: true,
          // node环境
          node: true,
      },
    // 扩展的eslint规范语法，可以被继承的规则
      // 字符串数组：每个配置继承它前面的配置
      // 分别是：
      // eslint-plugin-vue提供的
      // eslint-config-airbnb-base提供的
      // eslint-config-prettier提供的
      // 前缀 eslint-config-, 可省略
      extends: ['plugin:vue/vue3-strongly-recommended', 'airbnb-base', 'prettier'],
      // eslint 会对我们的代码进行检验
      // parser的作用是将我们写的代码转换为ESTree（AST）
      // ESLint会对ESTree进行校验
      parser: 'vue-eslint-parser',
      // 解析器的配置项
      parserOptions: {
          // es的版本号，或者年份都可以
          ecmaVersion: 'latest',
          parser: '@typescript-eslint/parser',
          // 源码类型 默认是script，es模块用module
          sourceType: 'module',
          // 额外的语言类型
          ecmaFeatures: {
              tsx: true,
              jsx: true,
          },
      },
    // 全局自定义的宏，这样在源文件中使用全局变量就不会报错或者警告
      globals: {
          defineProps: 'readonly',
          defineEmits: 'readonly',
          defineExpose: 'readonly',
          withDefault: 'readonly',
      },
    // 插件
      // 前缀 eslint-plugin-, 可省略
      // vue官方提供了一个ESLint插件 eslint-plugin-vue，它提供了parser和rules
      // parser为 vue-eslint-parser，放在上面的parser字段，rules放在extends字段里，选择合适的规则
      plugins: ['vue', '@typescript-eslint', 'unused-imports'],
    settings: {
          // 设置项目内的别名
          'import/resolver': {
              alias: {
                  map: [['@', './src'],['/assets', './src/assets']],
          extensions: ['.ts', '.js', 'tsx', 'jsx'] // 解决：Unable to resolve path to module
              },
        // "node": {
        //   "extensions": [".js", ".jsx", ".ts", ".tsx"]
        // }
          },
          // 允许的扩展名
          'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
      },
    overrides: [
      {
        env: {
          node: true,
        },
        files: [".eslintrc.{js,cjs}"],
        parserOptions: {
          sourceType: "script",
        },
      },
    ],
    rules: {
      'no-console': 0,   // 项目中可以使用console.log()
          'vue/valid-template-root': 0,
      'import/no-extraneous-dependencies': 0,   // 解决vite.config.ts的引入报错
          'vue/multi-word-component-names': 0,
          'vue/attribute-hyphenation': 0,
          'vue/v-on-event-hyphenation': 0,
          // 'eslint-plugin-unused-vars': 0,
          "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
          "unused-imports/no-unused-imports": "error",
          "unused-imports/no-unused-vars": [
              "warn",
              { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
          ],
      "func-names": 0,    // 关闭匿名函数的校验
      "import/extensions": 0,   // import时省略后缀名
      "vue/no-mutating-props": 0,  // 关闭子组件改变props时的报错  baseForm
      'no-undef': 0,  // 解决按需导入ElMessage  未定义的问题
      //  already declared in the upper scope
      "no-shadow": 0,
      "spaced-comment":0,
      "import/newline-after-import": 0, 
      "import/no-unresolved":0,
      "import/no-named-as-default":0,
      "import/no-named-as-default-member":0,
      "import/no-relative-packages":0,
      "import/no-cycle":0,
      "import/no-self-import":0,
      "import/order":0,
      "import/no-duplicates":0
    },
  };
  
  