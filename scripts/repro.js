const puppeteer = require('puppeteer');

(async () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 Simulating browser interaction with local dev setup');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('📋 Configuration:');
  console.log('   URL:     http://localhost:8000');
  console.log('   Browser: Chromium (headless)');
  console.log('   Purpose: Reproduce React runtime errors from terminal\n');

  console.log('🚀 Launching headless Chromium...');
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  console.log('✅ Browser launched\n');

  console.log('📄 Opening new page...');
  const page = await browser.newPage();
  console.log('✅ Page created\n');

  console.log('👂 Setting up event listeners:');
  console.log('   - Console messages (log, warn, error)');
  console.log('   - Uncaught page errors (React crashes, etc.)\n');

  // Log console messages from the browser
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    const prefix = {
      'log': '  [console.log]',
      'warn': '  [console.warn]',
      'error': '  [console.error]',
    }[type] || `  [console.${type}]`;
    
    console.log(`${prefix} ${text}`);
  });

  // Log uncaught errors (the React error you're seeing)
  page.on('pageerror', err => {
    console.log('\n❌ UNCAUGHT PAGE ERROR DETECTED:\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error(err.stack || err.message || err);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  });

  console.log('🌐 Navigating to http://localhost:8000...');
  console.log('   (waiting for network to be idle)\n');

  try {
    await page.goto('http://localhost:8000', { 
      waitUntil: 'networkidle0',
      timeout: 10000
    });
    console.log('✅ Page loaded successfully\n');
  } catch (err) {
    console.error('❌ Failed to load page:', err.message);
    await browser.close();
    process.exit(1);
  }

  console.log('⏳ Waiting 5 seconds for React to mount and render...\n');

  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log('✅ Wait complete\n');

  console.log('🧹 Closing browser...');
  await browser.close();
  console.log('✅ Browser closed\n');

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✨ Simulation complete');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
})();
