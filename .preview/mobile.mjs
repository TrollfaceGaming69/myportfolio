// Throwaway: audits the hero at mobile widths for overflow and cramped text.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = Number(process.argv[2] ?? 9421);
mkdirSync(".preview", { recursive: true });

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    `--remote-debugging-port=${PORT}`,
    "--user-data-dir=" + process.cwd() + "\\.preview\\chrome-mob",
    "about:blank",
  ],
  { stdio: "ignore" },
);

async function wsUrl() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const page = (await res.json()).find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("no debuggable page");
}

const ws = new WebSocket(await wsUrl());
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result);
    pending.delete(m.id);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    id += 1;
    pending.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });
const evaluate = async (expression) =>
  (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }))
    ?.result?.value;

await send("Page.enable");

const audit = `(() => {
  const hero = document.getElementById('hero');
  const h1 = document.getElementById('hero-title');
  const pills = hero.querySelector('ul');
  const stack = hero.querySelector('[aria-label="Selected project previews"]');
  const cards = [...stack.children];
  const cta = hero.querySelector('a[href="#about"]');
  const bio = hero.querySelector('p');
  const cs = (el, p) => getComputedStyle(el)[p];

  // Anything poking past the viewport horizontally.
  const overflowing = [...document.querySelectorAll('#hero *')].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
  }).map((el) => ({
    tag: el.tagName,
    cls: String(el.className).slice(0, 46),
    left: Math.round(el.getBoundingClientRect().left),
    right: Math.round(el.getBoundingClientRect().right),
  }));

  return JSON.stringify({
    viewport: innerWidth + 'x' + innerHeight,
    docScrollWidth: document.documentElement.scrollWidth,
    horizontalScroll: document.documentElement.scrollWidth > innerWidth,
    heroHeight: Math.round(hero.getBoundingClientRect().height),
    h1FontPx: cs(h1, 'fontSize'),
    h1Lines: Math.round(h1.getBoundingClientRect().height / parseFloat(cs(h1, 'lineHeight'))),
    h1Box: Math.round(h1.getBoundingClientRect().width) + 'x' + Math.round(h1.getBoundingClientRect().height),
    pillRows: Math.round(pills.getBoundingClientRect().height / 34),
    pillsBox: Math.round(pills.getBoundingClientRect().width) + 'x' + Math.round(pills.getBoundingClientRect().height),
    bioFontPx: cs(bio, 'fontSize'),
    ctaBox: Math.round(cta.getBoundingClientRect().width) + 'x' + Math.round(cta.getBoundingClientRect().height),
    stackBox: Math.round(stack.getBoundingClientRect().width) + 'x' + Math.round(stack.getBoundingClientRect().height),
    cardWidths: cards.map((c) => Math.round(c.getBoundingClientRect().width)),
    cardRendered: cards.map((c) => {
      const img = c.querySelector('img');
      return img.naturalWidth + 'x' + img.naturalHeight + ' in ' + Math.round(img.getBoundingClientRect().width) + 'w';
    }),
    overflowing,
  }, null, 1);
})()`;

for (const [w, h, label] of [
  [360, 800, "360 small android"],
  [390, 844, "390 iphone 14"],
  [430, 932, "430 iphone pro max"],
  [540, 900, "540 just under mobile bp"],
]) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: w,
    height: h,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await send("Page.navigate", { url: "http://localhost:3000" });
  await sleep(6500);
  await evaluate("document.fonts.ready.then(() => true)");
  await sleep(1200);
  console.log(`\n===== ${label} =====`);
  console.log(await evaluate(audit));

  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
  });
  writeFileSync(`.preview/mob-${w}.png`, Buffer.from(shot.data, "base64"));
}

ws.close();
chrome.kill();
process.exit(0);
