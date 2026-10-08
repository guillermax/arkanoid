import { CONFIG, COLORS, LEVEL_1 } from './utils.js';

export class Game {
  constructor(container) {
    this.container = container;
    this.app = null;
  }

  async init() {
    this.app = new PIXI.Application();
    await this.app.init({
      width: CONFIG.WIDTH,
      height: CONFIG.HEIGHT,
      background: 0x000000,
      antialias: true,
    });
    this.container.appendChild(this.app.canvas);

    this.drawBackground();
    this.drawBricks();
    this.drawFrame();
    this.drawPanel();

    this.app.ticker.add((ticker) => this.update(ticker.deltaTime));
  }

  drawBackground() {
    const f = CONFIG.FRAME;
    const g = new PIXI.Graphics();
    g.rect(f, f, CONFIG.FIELD_W - 2 * f, CONFIG.HEIGHT - f).fill(0x050530);
    // простой диагональный узор
    for (let y = f; y < CONFIG.HEIGHT; y += 24) {
      for (let x = f; x < CONFIG.FIELD_W - f; x += 24) {
        const ox = (Math.floor(y / 24) % 2) * 12;
        const px = x + ox;
        if (px + 14 > CONFIG.FIELD_W - f) continue;
        g.rect(px, y, 14, 6).fill(0x0c0c6e);
      }
    }
    this.app.stage.addChild(g);
  }

  drawBricks() {
    const g = new PIXI.Graphics();
    const { BRICK_W: w, BRICK_H: h, BRICK_GAP: gap, FRAME: f } = CONFIG;
    const startX = f + (CONFIG.FIELD_W - 2 * f - CONFIG.COLS * w) / 2;

    LEVEL_1.forEach((row, r) => {
      [...row].forEach((ch, c) => {
        if (ch === '.') return;
        const x = startX + c * w;
        const y = CONFIG.BRICKS_TOP + r * h;
        g.rect(x + gap / 2, y + gap / 2, w - gap, h - gap).fill(COLORS[ch]);
        // светлая полоска сверху для объёма
        g.rect(x + gap / 2, y + gap / 2, w - gap, 3).fill({ color: 0xffffff, alpha: 0.35 });
      });
    });
    this.app.stage.addChild(g);
  }

  drawFrame() {
    const { FRAME: f, FIELD_W: w, HEIGHT: h } = CONFIG;
    const g = new PIXI.Graphics();
    const pipe = (x, y, pw, ph) => {
      g.rect(x, y, pw, ph).fill(0xb4b4b4);
      g.rect(x + 3, y + 3, Math.max(pw - 10, 2), Math.max(ph - 10, 2)).fill(0xeeeeee);
    };
    pipe(0, 0, w, f);        // верх
    pipe(0, 0, f, h);        // лево
    pipe(w - f, 0, f, h);    // право
    this.app.stage.addChild(g);
  }

  drawPanel() {
    const x = CONFIG.FIELD_W + 20;
    const mk = (text, y, fill, size = 28) => {
      const t = new PIXI.Text({
        text,
        style: { fontFamily: 'monospace', fontWeight: 'bold', fontSize: size, fill },
      });
      t.x = x;
      t.y = y;
      this.app.stage.addChild(t);
      return t;
    };
    mk('HIGH', 40, 0xcc2222);
    mk('SCORE', 72, 0xcc2222);
    this.highScoreText = mk('50000', 110, 0xffffff);
    this.scoreText = mk('0', 190, 0xffffff);
  }

  update(delta) {
    // игровой цикл: платформа, мяч — на следующих этапах
  }
}