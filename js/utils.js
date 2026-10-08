export const CONFIG = {
  FRAME: 20,                 // толщина рамки
  FIELD_W: 700,              // ширина игрового поля с рамкой
  PANEL_W: 240,              // правая панель
  HEIGHT: 720,
  get WIDTH() { return this.FIELD_W + this.PANEL_W; },

  BRICK_W: 60,
  BRICK_H: 22,
  BRICK_GAP: 2,
  COLS: 11,
  BRICKS_TOP: 110,
};

export const COLORS = {
  S: 0xc0c0c0, // серебро
  R: 0x8b0000, // красный
  B: 0x1e3cb4, // синий
  Y: 0xd9a032, // золотой
  M: 0xd22dc8, // розовый
};

// Раскладка уровня 1 по референсу ('.' = пусто)
export const LEVEL_1 = [
  'SSSSSSSSSSS',
  'R..RRRRR.RR',
  'B..BBBB..BB',
  'Y..YYYYY..Y',
  'M...M.MM..M',
];

export function intersects(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x &&
         a.y < b.y + b.h && a.y + a.h > b.y;
}