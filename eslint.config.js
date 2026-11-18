import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist/']),
  js.configs.recommended,
  {
    files: ['scripts/*.mjs'],
    languageOptions: {
      globals: { URL: 'readonly', URLSearchParams: 'readonly', fetch: 'readonly', AbortSignal: 'readonly', console: 'readonly' },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.recommended],
  },
])
