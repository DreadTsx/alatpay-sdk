// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  test: false,
  package: {
    // package.json properties
    name: "@gray-adeyi/alatpay-sdk",
    version: Deno.args[0],
    description: "An ALATPay client SDK for the javascript runtime.",
    author: "Gbenga Adeyi <adeyigbenga005@gmail.com>, Oluwola Emmanuel <hallowpahe@gmail.com>",
    license: "MIT",
    keywords: ["node", "bun", "deno", "typescript", "wema", "alat", "ALATPay"],
    dependencies: {},
    devDependencies: {},
    repository: {
      type: "git",
      url: "git+https://github.com/DreadTsk/alatpay-sdk.git",
    },
    bugs: {
      url: "https://github.com/DreadTsk/alatpay-sdk/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
