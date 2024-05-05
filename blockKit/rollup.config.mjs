import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import graphql from "@apollo-elements/rollup-plugin-graphql";
import json from "@rollup/plugin-json";


const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: false,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: false,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      terser(),
      graphql(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      json(),
    ],
    external: ["react", "react-dom", "react-router-dom"],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/types.d.ts", format: "esm" }],
    plugins: [dts.default()],
  },
];
