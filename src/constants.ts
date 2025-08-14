import { CardData, District } from './types';
// 画像のimport（実際の画像ファイルがある場合）
// import cardToImage from './assets/images/karuta/card-to.jpg';

export const HACHIJO_DISTRICTS: District[] = [
  District.MITSUNE,
  District.OKAGO,
  District.KASHITATE,
  District.NAKANOGO,
  District.SUEYOSHI,
];

// Data extracted from the provided Karuta images for card 'と'
export const cardTo: CardData = {
  id: 'to',
  image: '/images/karuta/card-to.jpg', // 実際の画像ファイルがある場合は import した変数を使用
  standardJapanese: ['朝早く起きて', '畑に', '行ったんだけど…'],
  dialectPhrases: [
    {
      standard: '朝早く起きて',
      options: {
        [District.MITSUNE]: 'とんめてぃ おきて',
        [District.OKAGO]: 'とーんめてー ぶっこきて',
        [District.KASHITATE]: 'とんめて おきとちー',
        [District.NAKANOGO]: 'とぉーんめてん おきて',
        [District.SUEYOSHI]: 'とんめてに おきて',
      },
    },
    {
      standard: '畑に',
      options: {
        [District.MITSUNE]: 'やましょげぇ',
        [District.OKAGO]: 'やましぇー',
        [District.KASHITATE]: 'やましょ',
        [District.NAKANOGO]: 'やましゃん',
        [District.SUEYOSHI]: 'やましょげぇ',
      },
    },
    {
      standard: '行ったんだけど…',
      options: {
        [District.MITSUNE]: 'いこおどおが…',
        [District.OKAGO]: 'いからっちがー…',
        [District.KASHITATE]: 'いきいたしとどーがー！…',
        [District.NAKANOGO]: 'いこぉどぉが…',
        [District.SUEYOSHI]: 'いかぁだぁがー！…',
      },
    },
  ],
};