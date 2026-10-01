/* Uses the same server and Playwright setup as browser-audit.cjs. */
const { chromium, webkit, firefox } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173';
(async () => {
  for (const [engine, type] of Object.entries({chromium, webkit, firefox})) {
    const browser = await type.launch();
    const page = await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
    await page.goto(base);
    assert.equal(await page.locator('.work-case').count(), 3);
    assert.equal(await page.locator('.more-work details').count(), 0);
    assert.equal(await page.locator('.more-project:visible').count(), 7);
    await page.locator('.more-project').first().focus();
    await page.keyboard.press('Enter');
    await page.waitForURL('**/project-kanvan.html');
    assert.ok(page.url().endsWith('project-kanvan.html'));
    for (const slug of ['dashboard', 'platform', 'intranet']) {
      await page.goto(`${base}/project-${slug}.html`);
      assert.equal(await page.locator('.case-brief dd').count(), 3);
      await page.locator('.brief-heading a').click();
      assert.ok(page.url().endsWith('#solution'));
      const trigger = page.locator('.image-zoom').first();
      await trigger.click();
      assert.equal(await page.locator('dialog').evaluate(el => el.open), true);
      await page.locator('dialog img').evaluate(el => el.decode());
      assert.ok(await page.locator('dialog img').evaluate(el => el.naturalWidth > 0));
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('dialog').evaluate(el => el.open), false);
      assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
      await page.waitForFunction(() => !document.body.classList.contains('viewer-open'));
      await trigger.click();
      await page.locator('dialog button').click();
      assert.equal(await page.locator('dialog').evaluate(el => el.open), false);
    }
    const noJS = await browser.newContext({javaScriptEnabled:false});
    const staticPage = await noJS.newPage();
    await staticPage.goto(base);
    assert.equal(await staticPage.locator('.more-project:visible').count(), 7);
    await noJS.close();
    await browser.close();
    console.log(`${engine}: project discovery, detail summary, image dialog, focus restoration, no-JS project visibility passed`);
  }
})().catch(error => { console.error(error); process.exit(1); });
