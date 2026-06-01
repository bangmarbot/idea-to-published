import puppeteer from 'puppeteer-core'

const URL = 'http://localhost:4173/idea-to-published/scrolly.html'
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
})

async function shoot(label, vp) {
  const page = await browser.newPage()
  await page.setViewport(vp)
  await page.goto(URL, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 600))
  const h = await page.evaluate(() => document.body.scrollHeight)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  )
  console.log(`${label} overflowX=${overflow} pageH=${h}`)
  // capture across scroll: intro, 3 stage points, closing
  const points = [0, 0.28, 0.45, 0.62, 0.78, 0.95]
  for (const p of points) {
    await page.evaluate((pp) => window.scrollTo(0, (document.body.scrollHeight - window.innerHeight) * pp), p)
    await new Promise((r) => setTimeout(r, 700))
    await page.screenshot({ path: `v_${label}_${Math.round(p * 100)}.png` })
  }
  await page.close()
}

await shoot('desk', { width: 1280, height: 800, deviceScaleFactor: 1 })
await shoot('mob', { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true })
await browser.close()
console.log('DONE')
