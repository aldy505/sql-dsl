import { defineConfig } from "rollup";
import ts from "@rollup/plugin-typescript";

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
    },
  ],
  plugins: [
    ts({ tsconfig: "./tsconfig.json" }),
  ],
});
