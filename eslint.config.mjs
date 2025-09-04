// @ts-check
import vue from 'eslint-plugin-vue'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const nuxtEslintConfigPath = join(__dirname, '.nuxt/eslint.config.mjs')

// Vérifier si le fichier de configuration Nuxt ESLint existe
let withNuxt
if (existsSync(nuxtEslintConfigPath)) {
  withNuxt = (await import(nuxtEslintConfigPath)).default
} else {
  // Fallback pour l'environnement CI où .nuxt n'est pas encore généré
  withNuxt = (config: any) => config
}

export default withNuxt({
  files: ['**/*.vue'],
  plugins: {
    vue
  },
  rules: {
  }
}).override('nuxt/typescript/rules', {
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-useless-escape': 'warn',
    "indent": ["error", 2, {
      "SwitchCase": 1
    }],
    "vue/html-indent": ["error", 2, {
      "baseIndent": 0
    }],
    // "vue/component-tags-order": ["error", {
    //   "order": ["template", "script", "style"]
    // }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 1
      },
      "multiline": {
        "max": 1
      }
    }],
    "vue/no-unused-components": ["error", {
      "ignoreWhenBindingPresent": true
    }],
    "vue/no-unused-vars": ["error", {
      "ignorePattern": "^_"
    }],
    "vue/no-template-shadow": "off",
    "vue/v-on-event-hyphenation": "off",
    "vue/return-in-computed-property": "off",
    "vue/no-required-prop-with-default": "off",
    "no-console": ["warn", { "allow": ["warn", "error", "time", "timeEnd"] }],
    "curly": [0, "all"],
    "brace-style": [0, "stroustrup", { "allowSingleLine": false }],
    "@typescript-eslint/brace-style": [0, "stroustrup", { "allowSingleLine": false }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["off"],
    "arrow-parens": [2, "as-needed"],
    '@typescript-eslint/no-dynamic-delete': 'off',
    "@typescript-eslint/no-duplicate-enum-values": "off",
    "@typescript-eslint/no-empty-object-type": "off",
  }
})
