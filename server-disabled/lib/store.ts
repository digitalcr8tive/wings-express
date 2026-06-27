import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const dataDir = path.resolve('data');

export async function readStore<T>(name: string, fallback: T): Promise<T> {
  try { return JSON.parse(await readFile(path.join(dataDir, name), 'utf8')); }
  catch { return fallback; }
}

export async function writeStore<T>(name: string, value: T) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(path.join(dataDir, name), JSON.stringify(value, null, 2));
}
