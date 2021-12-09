import { TLoggerStyleObject } from "../../types/logger";

const styleObject: TLoggerStyleObject = {
  trace: {
    red: 255,
    green: 255,
    blue: 255,
  },
  debug: {
    red: 0,
    green: 255,
    blue: 255,
  },
  info: {
    red: 0,
    green: 255,
    blue: 0,
  },
  warn: {
    red: 255,
    green: 255,
    blue: 0,
  },
  error: {
    red: 255,
    green: 0,
    blue: 0,
  },
  fatal: {
    red: 128,
    green: 0,
    blue: 0,
  },
  intercept: {
    red: 32,
    green: 178,
    blue: 170,
  },
  chartreuse: {
    red: 127,
    green: 255,
    blue: 0,
  },
  aqua: {
    red: 0,
    green: 255,
    blue: 255,
  },
  beige: {
    red: 245,
    green: 245,
    blue: 220,
  },
  fuchsia: {
    red: 255,
    green: 0,
    blue: 255,
  },
  gold: {
    red: 255,
    green: 215,
    blue: 0,
  },
  orange: {
    red: 255,
    green: 165,
    blue: 0,
  },
};

export default styleObject;
