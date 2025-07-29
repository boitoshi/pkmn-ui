# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

PKMN-UIは、ポケモンゲームのUIコンポーネントを複数のフレームワーク（Vue、Astro）で再現し、本格的なゲームテーマを提供するモノレポプロジェクトです。pnpmワークスペースを使用し、マルチフレームワーク対応のコンポーネントライブラリとして設計されています。

**個人プロジェクトとしての性質**:
- 商用配布・外部公開は予定なし  
- WordPress Block Editor統合が主目的
- レトロゲームUI再現への個人的探究
- Claude Codeでの効率的な開発実験

## アーキテクチャ

### パッケージ構成
- `packages/core/` - 共通CSSユーティリティとベーススタイル
- `packages/astro/` - Astroコンポーネント実装
- `packages/vue/` - Vue 3コンポーネント実装
- `packages/themes/` - コンソール世代別のゲーム固有テーマ（gba/、ds/、switch/）
- `apps/` - 各フレームワーク用のデモアプリケーション

### コンポーネント設計パターン
フレームワーク間で同一のAPIを維持：
```typescript
// AstroとVue両方の実装で同じインターフェースを使用
interface Props {
  type: "fire" | "water" | "grass" | "electric";
  label?: string;
}
```

### テーマシステム
- **3層構造**：`core/index.css` → テーマ固有CSS → コンポーネント
- CSS カスタムプロパティによるテーマ値（`--t-fire`、`--t-water`など）
- ゲーム本格的なスタイリング（ボーダー、シャドウ、ピクセル表現）
- コンソール世代別テーマ構成
- 共通ベース変数の参照によるテーマ切り替え対応

### 現在実装済みのテーマ
- **GBA theme** (`packages/themes/gba/index.css`): 完全実装済み
- **DS DOT theme** (`packages/themes/ds/dot/index.css`): 完全実装済み（Gen4-5: DPPt/HGSS/BW/BW2）
- **その他のテーマ**: 構造のみ存在

## 開発コマンド

パッケージマネージャー: `pnpm` (version 10.13.1)
モノレポツール: Turbo

基本コマンド:
```bash
# 依存関係インストール
pnpm install

# 開発サーバー起動（要設定）
pnpm dev:astro    # Astroデモ
pnpm dev:vue      # Vueデモ

# 全パッケージビルド（要設定）
pnpm build

# テスト実行（未実装）
pnpm test
```

## 重要な実装メモ

### スタイリングアプローチ
- CSS変数による統一されたテーマシステム
- `@apply` ユーティリティクラス使用（Tailwind CSS前提）
- ゲーム本格的な視覚効果（`image-rendering: pixelated`など）
- フレームワーク間での一貫したスタイリングパターン

### ワークスペース依存関係
フレームワークパッケージはcoreを参照:
```json
"@pkmn-ui/core": "workspace:*"
```

### 設定ファイル構成
- `pnpm-workspace.yaml`: ワークスペース設定
- `turbo.json`: ビルド・開発タスク設定
- 各デモアプリケーション: 独自のpackage.jsonと設定ファイル

## コンポーネント実装状況
Vue・Astro両方で実装済み:
- `TypeBadge` - ポケモンタイプ表示バッジ（テーマ対応）
- `MsgWindow` - ゲーム風メッセージウィンドウ
- `MenuGrid` - メニューナビゲーション

### 追加予定フレームワーク
- React
- Nuxt
- Web Components (Lit)
- その他（ラッパー実装による拡張）

## 今後の展望・実装計画

### テーマ拡張計画

#### Generation 1 (Game Boy/Game Boy Color)
```
packages/themes/gb/
├─ rgy/          # 赤・緑・青・ピカチュウ版 
│  └─ index.css  # モノクロ&4階調グリーンスタイル
└─ gsc/          # 金・銀・クリスタル版
   └─ index.css  # GBCカラーパレット
```

#### Generation 9 (Nintendo Switch)
```
packages/themes/switch/
└─ sv/           # スカーレット・バイオレット
   └─ index.css  # オープンワールド風モダンUI
```

#### 外伝作品テーマ
```
packages/themes/spinoff/
├─ pla/          # Pokémon Legends: Arceus
│  └─ index.css  # 和風テイスト、木目調UI
├─ bdsp/         # Brilliant Diamond/Shining Pearl
│  └─ index.css  # リメイク版独自UI（ユーザー実装予定）
└─ 3ds/          # 3DS世代
   ├─ xy/        # X・Y
   ├─ oras/      # オメガルビー・アルファサファイア
   ├─ sm/        # サン・ムーン
   └─ usum/      # ウルトラサン・ウルトラムーン
```

### Web Components (Lit) 版実装

#### 目的・用途
- **個人用WordPress Block Editor統合**
- 既存のブログ・サイトでポケモンUI風コンポーネントを使用
- Vue/Astroとは独立した配布可能なコンポーネント

#### 技術仕様
```
packages/lit/
├─ src/
│  ├─ TypeBadge.ts     # Lit版TypeBadge
│  ├─ MsgWindow.ts     # Lit版MsgWindow  
│  ├─ MenuGrid.ts      # Lit版MenuGrid
│  └─ index.ts         # エクスポート統合
├─ package.json        # Lit + TypeScript依存関係
└─ README.md           # WordPress統合手順
```

#### 設計方針
- **Shadow DOM**: スタイル分離でWordPress環境と競合回避
- **CSS Custom Properties**: 既存テーマシステムとの互換性維持
- **TypeScript**: 型安全性とVue/Astro版との一貫性
- **プロパティ仕様統一**: 全フレームワーク間で同一API

#### WordPress統合例
```html
<!-- Block Editor内での使用例 -->
<pkmn-type-badge type="fire" label="ほのお"></pkmn-type-badge>
<pkmn-msg-window title="オーキドはかせ">
  ポケモンの世界へようこそ！
</pkmn-msg-window>
```

### アーキテクチャ拡張方針

#### コンポーネント一貫性
- 全フレームワーク（Vue/Astro/React/Lit）で同一Props仕様
- テーマCSS変数の統一規格維持
- TypeScript型定義の共有

#### テーマシステム拡張
- 新世代テーマ追加時の標準化手順
- CSS変数命名規則の文書化
- レスポンシブ対応ガイドライン

#### 開発効率化
- 複数フレームワーク間での機能同期
- 自動テスト環境整備（将来的に）
- Storybook等のドキュメント環境（将来的に）