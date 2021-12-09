export interface TRGB {
  red: number;
  green: number;
  blue: number;
}

export interface TLoggerStyleObject {
  trace: TRGB;
  debug: TRGB;
  info: TRGB;
  warn: TRGB;
  error: TRGB;
  fatal: TRGB;
  intercept: TRGB;
  orange: TRGB;

  chartreuse: TRGB;
  aqua: TRGB;
  beige: TRGB;
  fuchsia: TRGB;
  gold: TRGB;
}
