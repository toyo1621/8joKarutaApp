# 八丈島ことばカルタ学習アプリ

八丈島の方言（島言葉）を楽しく学習できるインタラクティブなカルタアプリです。

## 🌊 概要

八丈島には地区ごとに異なる方言があります。このアプリでは、カルタを使って各地区の島言葉を学習し、現代語との対応を覚えることができます。

## ✨ 特徴

### 🎯 学習機能
- **地区別方言学習**: 三根、大賀郷、樫立、中之郷、末吉の5地区の方言に対応
- **インタラクティブクイズ**: 4択問題で楽しく学習
- **リアルタイム解説**: 各地区の方言の特徴を詳しく説明
- **プログレス表示**: 学習進捗と正解率をリアルタイム表示

### 🎮 ユーザビリティ
- **キーボードショートカット**: 
  - `1-4` キー: 選択肢の選択
  - `R` キー: ゲームリセット
- **視覚的フィードバック**: 正解・不正解を色分けで表示
- **レスポンシブデザイン**: スマートフォンからデスクトップまで対応

### 🎨 デザイン
- **美しいUI**: 八丈島の海をイメージした爽やかなデザイン
- **アニメーション**: スムーズな画面遷移とフィードバック
- **日本語フォント**: M PLUS Rounded 1c と Noto Sans JP を使用

## 🚀 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **フォント**: Google Fonts (M PLUS Rounded 1c, Noto Sans JP)

## 📁 プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── DistrictSelector.tsx    # 地区選択コンポーネント
│   ├── Quiz.tsx               # クイズコンポーネント
│   ├── ProgressBar.tsx        # プログレスバー
│   ├── DialectExplanation.tsx # 方言解説
│   └── KeyboardHints.tsx      # キーボードヒント
├── hooks/              # カスタムフック
│   └── useKeyboardShortcuts.ts # キーボードショートカット
├── assets/             # 静的アセット
│   └── images/karuta/  # カルタ画像
├── types.ts            # TypeScript型定義
├── constants.ts        # 定数・データ
└── App.tsx            # メインアプリケーション
```

## 🎴 カルタデータ構造

各カルタは以下の構造で定義されています：

```typescript
interface CardData {
  id: string;                    // カルタID
  image: string;                 // カルタ画像
  standardJapanese: string[];    // 現代語（分割）
  dialectPhrases: DialectSegment[]; // 方言フレーズ
}

interface DialectSegment {
  standard: string;              // 現代語
  options: Record<District, string>; // 各地区の方言
}
```

## 🏝️ 対応地区

| 地区 | 特徴 |
|------|------|
| **三根** | 語尾に「〜てぃ」「〜げぇ」がよく使われる |
| **大賀郷** | 「〜てー」「〜しぇー」の音変化が特徴的 |
| **樫立** | 「〜とちー」「〜しょ」など独特の語尾 |
| **中之郷** | 「〜てん」「〜しゃん」の音韻変化 |
| **末吉** | 「〜てに」「〜だぁがー」など力強い表現 |

## 🎯 使い方

1. **地区選択**: 学習したい地区を選択
2. **クイズ開始**: 現代語に対応する方言を4択から選択
3. **解説確認**: 正解後に表示される解説で理解を深める
4. **進捗確認**: プログレスバーで学習状況を把握

## 🛠️ 開発・実行

### 必要な環境
- Node.js 16.0.0 以上
- npm または yarn

### セットアップ
```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 📝 カルタの追加方法

新しいカルタを追加する場合：

1. **画像の配置**: `src/assets/images/karuta/` に画像ファイルを配置
2. **データの追加**: `src/constants.ts` に新しいカードデータを追加
3. **画像のimport**: 画像ファイルをimportして使用

```typescript
// 例: 新しいカルタ「に」の追加
import cardNiImage from './assets/images/karuta/card-ni.jpg';

export const cardNi: CardData = {
  id: 'ni',
  image: cardNiImage,
  standardJapanese: ['...'],
  dialectPhrases: [
    // 方言データ
  ],
};
```

## 🎨 カスタマイズ

### テーマカラーの変更
`src/App.tsx` と各コンポーネントのTailwind CSSクラスを変更することで、テーマカラーをカスタマイズできます。

### 新機能の追加
- 音声読み上げ機能
- 学習履歴の保存
- 難易度設定
- タイマー機能

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 貢献

プルリクエストや課題報告を歓迎します。八丈島の方言学習をより良いものにするために、ぜひご協力ください。

---

**八丈島の美しい島言葉を次世代に伝えるために** 🌺