import fs from 'fs';
import path from 'path';

const TARGET_DIR = path.join(process.cwd(), 'components');

async function main() {
  console.clear();
  console.log("\x1b[1m Component Installation\x1b[0m");

  if (fs.existsSync(TARGET_DIR)) {
    console.log("\x1b[32m Components folder already exists. No license is required.\x1b[0m");
    process.exit(0);
  }

  console.log("\x1b[33m Components folder not found. Creating local components directory...\x1b[0m");

  try {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    console.log("\x1b[32m Components directory created.\x1b[0m");
    process.exit(0);
  } catch (error: any) {
    console.error("\n\x1b[31m Failed to create components directory:\x1b[0m");
    console.error(`\x1b[31m  ${error.message}\x1b[0m\n`);
    process.exit(1);
  }
}

main();
