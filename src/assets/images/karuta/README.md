# カルタ画像フォルダ

このフォルダにカルタの画像ファイルを格納してください。

## ファイル命名規則
- `card-[ひらがな].jpg` または `card-[ひらがな].png`
- 例: `card-to.jpg`, `card-ni.jpg`, `card-ho.jpg`

## 使用方法
コード内では以下のようにimportして使用します：
```typescript
import cardToImage from './card-to.jpg';

// カードデータで使用
image: cardToImage
```

## 対応画像形式
- JPG/JPEG
- PNG
- WebP
- SVG