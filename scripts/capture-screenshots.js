const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SCREENSHOTS_DIR = path.join(ROOT, 'docs', 'screenshots');
fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function capture() {
  const PORT = 3458;
  const token = Buffer.from(
    JSON.stringify({ email: 'admin@suntechsolar.in', role: 'admin', iat: Date.now() })
  ).toString('base64');

  // Temporary auth injector page
  const authHtml = `<!DOCTYPE html>
<html>
<head>
<script>
  document.cookie = "admin_session=${token}; path=/; max-age=86400";
  setTimeout(() => { window.location.href = "/admin"; }, 200);
</script>
</head>
<body>Redirecting to Admin...</body>
</html>`;
  fs.writeFileSync(path.join(ROOT, 'public', 'temp-auth.html'), authHtml);

  // Temporary leads auth page
  const leadsHtml = `<!DOCTYPE html>
<html>
<head>
<script>
  document.cookie = "admin_session=${token}; path=/; max-age=86400";
  setTimeout(() => { window.location.href = "/admin/leads"; }, 200);
</script>
</head>
<body>Redirecting to Admin Leads...</body>
</html>`;
  fs.writeFileSync(path.join(ROOT, 'public', 'temp-leads.html'), leadsHtml);

  console.log(`Starting Next.js production server on port ${PORT}...`);
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    stdio: 'ignore',
    env: { ...process.env, PORT: String(PORT) },
  });

  // Wait for server to become responsive
  let ready = false;
  for (let i = 0; i < 40; i++) {
    await sleep(400);
    try {
      const res = await fetch(`http://localhost:${PORT}`);
      if (res.ok) {
        ready = true;
        break;
      }
    } catch (e) {}
  }

  if (!ready) {
    console.error('Server failed to start');
    server.kill();
    return;
  }
  console.log('Next.js server is ready.');

  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

  const targets = [
    { url: `http://localhost:${PORT}/`, out: '01-homepage.png', wait: 2000 },
    { url: `http://localhost:${PORT}/calculator`, out: '02-calculator.png', wait: 1500 },
    { url: `http://localhost:${PORT}/schemes`, out: '03-schemes.png', wait: 1500 },
    { url: `http://localhost:${PORT}/services`, out: '04-services.png', wait: 1500 },
    { url: `http://localhost:${PORT}/projects`, out: '05-projects.png', wait: 1500 },
    { url: `http://localhost:${PORT}/admin/login`, out: '06-admin-login.png', wait: 1500 },
    { url: `http://localhost:${PORT}/temp-auth.html`, out: '07-admin-dashboard.png', wait: 3500 },
    { url: `http://localhost:${PORT}/temp-leads.html`, out: '08-admin-leads.png', wait: 3500 },
  ];

  for (const t of targets) {
    const outFile = path.join(SCREENSHOTS_DIR, t.out);
    console.log(`Capturing ${t.url} -> ${t.out}...`);
    await new Promise((resolve) => {
      const proc = spawn(chromePath, [
        '--headless=new',
        '--hide-scrollbars',
        '--window-size=1440,900',
        `--virtual-time-budget=${t.wait}`,
        `--screenshot=${outFile}`,
        t.url,
      ]);
      proc.on('close', resolve);
    });
  }

  server.kill('SIGTERM');
  try {
    fs.unlinkSync(path.join(ROOT, 'public', 'temp-auth.html'));
    fs.unlinkSync(path.join(ROOT, 'public', 'temp-leads.html'));
  } catch (e) {}

  console.log('All screenshots captured successfully in docs/screenshots/!');
}

capture().catch((e) => {
  console.error('Screenshot capture failed:', e);
  process.exit(1);
});
