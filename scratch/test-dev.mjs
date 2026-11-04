import { spawn } from 'child_process';
import http from 'http';

const dev = spawn('node', ['node_modules/next/dist/bin/next', 'dev', '-p', '3005'], {
  cwd: process.cwd(),
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: true
});

let output = '';
dev.stdout.on('data', d => { output += d.toString(); console.log('[STDOUT]', d.toString()); });
dev.stderr.on('data', d => { output += d.toString(); console.error('[STDERR]', d.toString()); });

function check(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3005${path}`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, body: data.slice(0, 300) });
      });
    }).on('error', reject);
  });
}

async function waitAndTest() {
  console.log('Waiting for dev server...');
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 1000));
    try {
      const res = await check('/');
      console.log('ROOT CHECK:', res.status, res.body.slice(0, 100));
      const resDisputes = await check('/disputes');
      console.log('DISPUTES CHECK:', resDisputes.status);
      const resAdmin = await check('/admin');
      console.log('ADMIN CHECK:', resAdmin.status);
      const resPortal = await check('/portal');
      console.log('PORTAL CHECK:', resPortal.status);
      break;
    } catch (e) {
      // still starting
    }
  }
  dev.kill();
  process.exit(0);
}

waitAndTest();

