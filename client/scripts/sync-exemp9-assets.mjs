import { cpSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');
const publicDir = path.join(repoRoot, 'public');

const binaryAssets = [
  'BID.JPG',
  'Capturar77.JPG',
  'EDUQ-1.PNG',
  'Gotham-Light.otf',
  'LOGOFUNDEPAR1.PNG',
  'Montserrat-Light.ttf',
  'SDG-1.PNG',
  'SEAP.png',
  'SECID.PNG',
  'SECOM.png',
  'SEIMT.png',
  'SESP.JPG',
  'bar.JPG',
  'ghimg45.PNG',
  'gimg5.PNG',
  'logofundepar.PNG',
  'secadm.PNG',
  'secagab.PNG',
  'seccom.PNG',
  'seccte.PNG',
  'seccul.PNG',
  'secedu.PNG',
  'secfez.PNG',
  'secics.PNG',
  'secido.PNG',
  'secinf.PNG',
  'secinv.PNG',
  'secjuscid.PNG'
];

mkdirSync(publicDir, { recursive: true });

for (const asset of binaryAssets) {
  const source = path.join(repoRoot, asset);
  const target = path.join(publicDir, asset);

  if (!existsSync(source)) {
    console.warn(`[sync-exemp9-assets] Missing source asset: ${asset}`);
    continue;
  }

  cpSync(source, target, { force: true });
}

console.log(`[sync-exemp9-assets] Synced ${binaryAssets.length} binary assets into public/.`);
