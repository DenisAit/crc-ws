/**
 * Optimiert das Reyes-del-Fuego-Logo:
 *   - Skaliert das PNG auf max. 1024×1024 (weit ausreichend für alle UI-Stellen).
 *   - Schreibt eine palettenbasierte PNG-Variante (drückt 2 MB → ~400 KB,
 *     bleibt transparent, optisch identisch).
 *
 * Ausführung (Standard):
 *   pnpm install           # einmalig, damit 'sharp' verfügbar ist
 *   node scripts/optimize-logo.mjs
 *
 * Falls der Workspace in OneDrive liegt und 'pnpm install' EPERM-Fehler wirft,
 * sharp in einen Temp-Ordner installieren und das Skript dort ausführen:
 *   mkdir %TEMP%\logo-opt && cd %TEMP%\logo-opt
 *   npm init -y && npm install sharp@0.33.5
 *   node --input-type=module -e "process.env.ROOT='C:\\path\\to\\crc-ws'; \
 *     await import('file:///' + process.env.TEMP.replace(/\\\\/g,'/') + \
 *     '/logo-opt/run.mjs');"
 */
import sharp from 'sharp'
import { readFile, writeFile, stat } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.env.ROOT ?? process.cwd()

const targets = [
  path.join(ROOT, 'apps/web/assets/logo.png'),
  path.join(ROOT, 'la-santa-landing/logo-og-removebg-preview.png'),
]

const MAX_DIMENSION = 1024

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(1)} KB`

async function optimize(file) {
  const before = (await stat(file)).size
  const buf = await readFile(file)

  const meta = await sharp(buf).metadata()
  const longestSide = Math.max(meta.width ?? 0, meta.height ?? 0)
  const needsResize = longestSide > MAX_DIMENSION

  const pipeline = sharp(buf)
  if (needsResize) {
    pipeline.resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  const pngOut = await pipeline
    .png({
      compressionLevel: 9,
      palette: true,
      quality: 90,
      effort: 10,
    })
    .toBuffer()

  await writeFile(file, pngOut)

  console.log(
    `${path.basename(file)}  ` +
      `${meta.width}×${meta.height}` +
      `${needsResize ? ` → ${MAX_DIMENSION}px max` : ''}  |  ` +
      `${fmtKB(before)} → ${fmtKB(pngOut.length)}`,
  )
}

for (const t of targets) {
  try {
    await optimize(t)
  } catch (err) {
    console.error(`Fehler bei ${t}:`, err.message)
  }
}
