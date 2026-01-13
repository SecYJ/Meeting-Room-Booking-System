import { defineConfig, globalIgnores } from 'eslint/config'
import { tanstackConfig } from '@tanstack/eslint-config'
import convexPlugin from '@convex-dev/eslint-plugin'
import prettierConfig from 'eslint-config-prettier'

export default defineConfig([
  ...tanstackConfig,
  ...convexPlugin.configs.recommended,
  prettierConfig,
  globalIgnores(['convex/_generated', 'dist', '.output', 'src/routeTree.gen.ts']),
])
