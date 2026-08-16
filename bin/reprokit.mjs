#!/usr/bin/env node

import { run } from "../src/index.mjs";

run(process.argv.slice(2)).catch((error) => {
  console.error(`reprokit: ${error.message}`);
  process.exitCode = 1;
});
