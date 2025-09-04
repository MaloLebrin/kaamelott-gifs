// @ts-check
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

// Configuration ESLint de base pour Kaamelott GIFs
const config = [
  {
    ignores: [
      '.nuxt/**',
      '.output/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.min.js',
      '*.min.css'
    ]
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-useless-escape': 'warn',
      "indent": ["error", 2, {
        "SwitchCase": 1
      }],
      "no-console": ["warn", { "allow": ["warn", "error", "time", "timeEnd"] }],
      "curly": [0, "all"],
      "brace-style": [0, "stroustrup", { "allowSingleLine": false }],
      "no-unused-vars": "off",
      "arrow-parens": [2, "as-needed"],
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      'no-useless-escape': 'warn',
      "indent": ["error", 2, {
        "SwitchCase": 1
      }],
      "no-console": ["warn", { "allow": ["warn", "error", "time", "timeEnd"] }],
      "curly": [0, "all"],
      "brace-style": [0, "stroustrup", { "allowSingleLine": false }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "arrow-parens": [2, "as-needed"],
      "@typescript-eslint/no-explicit-any": "warn",
    }
  }
]

export default config
