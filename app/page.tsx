import { readFileSync } from 'node:fs';
import path from 'node:path';

const htmlPath = path.join(process.cwd(), 'app', 'exemp9.html');
const htmlContent = readFileSync(htmlPath, 'utf8');

export default function HomePage() {
  return (
    <main style={{ margin: 0, padding: 0, minHeight: '100vh' }}>
      <iframe
        title="Editor da Placa"
        srcDoc={htmlContent}
        style={{ width: '100%', height: '100vh', border: 'none' }}
      />
    </main>
  );
}
