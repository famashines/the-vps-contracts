import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { compile } from "json-schema-to-typescript";

const root = dirname(fileURLToPath(import.meta.resolve("@famashines/the-vps-schemas/package.json")));
const { files } = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const out = "src/generated";

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const names = [];
for (const dir of files) {
  for (const file of readdirSync(join(root, dir), { recursive: true }).filter((f) => f.endsWith(".json")).sort()) {
    const name = basename(file, ".json");
    const schema = JSON.parse(readFileSync(join(root, dir, file), "utf8"));
    const type = await compile(structuredClone(schema), name, { bannerComment: "", additionalProperties: false, maxItems: -1 });
    writeFileSync(join(out, `${name}.ts`), `${type}\nexport const ${name}Schema = ${JSON.stringify(schema, null, 2)} as const;\n`);
    names.push(name);
  }
}

writeFileSync("src/index.ts", names.map((n) => `export * from "./generated/${n}.js";\n`).join(""));
console.log(`generated ${names.length} contracts`);
