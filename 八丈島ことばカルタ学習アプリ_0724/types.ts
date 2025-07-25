
export enum District {
  MITSUNE = "三根",
  OKAGO = "大賀郷",
  KASHITATE = "樫立",
  NAKANOGO = "中之郷",
  SUEYOSHI = "末吉",
}

export interface DialectSegment {
  standard: string;
  options: Record<District, string>;
}

export interface CardData {
  id: string;
  image: string;
  standardJapanese: string[];
  dialectPhrases: DialectSegment[];
}
