# PKMN-UI 🎮

ポケモンゲームのUIコンポーネントを忠実に再現した、マルチフレームワーク対応のコンポーネントライブラリです。

> **📌 個人プロジェクト**: このライブラリは個人利用目的で開発されており、商用配布は予定していません。WordPress統合やレトロゲームUI再現を主な目標としています。

## ✨ 特徴

- **🎯 ゲーム忠実再現**: GBA、DS、Switchなどの実際のポケモンゲームUIを忠実に再現
- **🔄 マルチフレームワーク**: Vue 3・Astro対応（React・Nuxt等も今後対応予定）
- **🎨 テーマシステム**: コンソール世代別のテーマ切り替え対応
- **📦 モノレポ構成**: pnpm + Turborepoによる効率的な開発環境
- **🌟 コンポーネント化**: 再利用可能なUIコンポーネントとして提供

## 🚀 クイックスタート

### 環境要件
- Node.js 18+
- pnpm 8+

### インストール・セットアップ
```bash
# リポジトリをクローン
git clone <repository-url>
cd pkmn-ui

# 依存関係をインストール
pnpm install

# デモアプリケーションを起動
pnpm dev:astro  # Astro版デモ（localhost:4321）- テーマ切り替え機能付き
pnpm dev:vue    # Vue版デモ（localhost:5173）- テーマ切り替え機能付き
```

## 📁 プロジェクト構成

### パッケージ構成
```
packages/
├─ core/          # 共通CSSユーティリティ・ベーススタイル
├─ astro/         # Astroコンポーネント実装
├─ vue/           # Vue 3コンポーネント実装
└─ themes/        # ゲーム世代別テーマ
   ├─ gba/        # ゲームボーイアドバンス（Gen3）
   ├─ ds/         # ニンテンドーDS世代
   │  ├─ dot/     # ダイパ・プラチナ・HGSS・BW・BW2
   │  └─ xy/      # X・Y
   └─ switch/     # Nintendo Switch世代
      ├─ lgpe/    # Let's Go ピカチュウ・イーブイ
      └─ swsh/    # ソード・シールド
```

### アプリケーション
```
apps/
├─ demo-astro/    # Astro実装デモ
└─ demo-vue/      # Vue実装デモ
```

## 🎨 テーマシステム

### 使用可能なテーマ
- **GBA Theme** - ルビー・サファイア・エメラルド世代のレトロなピクセルスタイル
- **DS DOT Theme** - ダイヤモンド・パール〜ブラック・ホワイト2の洗練されたドットスタイル
- **LGPE Theme** - Let's Go ピカチュウ・イーブイのパステル調モバイル風UI
- **SWSH Theme** - ソード・シールドのモダンでクリーンなカード風デザイン

### デモでのテーマ切り替え
両方のデモアプリケーションには、リアルタイムでテーマを切り替えできる機能が搭載されています：
- 画面上部のセレクトボックスでテーマを選択
- 選択したテーマは自動的にローカルストレージに保存
- ページリロード時に前回選択したテーマが復元

### テーマの適用
```astro
---
// Astroの場合
import "@pkmn-ui/themes/gba/index.css";           // GBAテーマ
import "@pkmn-ui/themes/ds/dot/index.css";        // DSテーマ  
import "@pkmn-ui/themes/switch/lgpe/index.css";   // LGPEテーマ
import "@pkmn-ui/themes/switch/swsh/index.css";   // SWSHテーマ
---
```

```vue
<script setup>
// Vueの場合
import "@pkmn-ui/themes/gba/index.css"           // GBAテーマ
import "@pkmn-ui/themes/switch/lgpe/index.css"   // LGPEテーマ
</script>
```

## 🧩 コンポーネント一覧

### 現在実装済み

#### TypeBadge - ポケモンタイプバッジ
```astro
<!-- Astro -->
<TypeBadge type="fire" />
<TypeBadge type="water" label="みず" />
```

```vue
<!-- Vue -->
<TypeBadge type="fire" />
<TypeBadge type="water" label="みず" />
```

#### MsgWindow - メッセージウィンドウ
```astro
<!-- Astro -->
<MsgWindow title="オーキドはかせ">
  <p>ポケモンの　せかいへ　ようこそ！</p>
</MsgWindow>
```

```vue
<!-- Vue -->
<MsgWindow title="オーキドはかせ">
  ポケモンの　せかいへ　ようこそ！
</MsgWindow>
```

#### MenuGrid - メニューグリッド
```astro
<!-- Astro -->
<MenuGrid items={[
  {label:"バッグ", active:true},
  {label:"ポケモン"},
  {label:"ずかん"}
]} />
```

## 🛠️ 開発

### 開発用コマンド
```bash
# 全パッケージの依存関係インストール
pnpm install

# デモアプリケーション開発サーバー起動
pnpm dev:astro     # Astroデモ
pnpm dev:vue       # Vueデモ

# 全パッケージビルド
pnpm build

# 特定パッケージでの作業
pnpm --filter @pkmn-ui/vue dev
pnpm --filter @pkmn-ui/astro build
```

### 新しいコンポーネントの追加
1. `packages/astro/` と `packages/vue/` に同名コンポーネントを作成
2. 同一のPropsインターフェースを維持
3. CSS変数を使用してテーマ対応
4. デモアプリケーションで動作確認

### 新しいテーマの追加
1. `packages/themes/<console>/<game>/` ディレクトリを作成
2. `@import "@pkmn-ui/core/index.css";` でベースをインポート
3. CSS変数（`--t-fire`, `--ui-bg`等）を再定義
4. テーマ固有のスタイルを追加

## 🎯 今後の予定

### 🎮 テーマ拡張計画

#### 優先度：高
- **Gen1 (GB/GBC)**: 赤・緑・青・ピカチュウ版 / 金・銀・クリスタル版
- **Gen9 (Switch)**: スカーレット・バイオレット
- **PLA**: Pokémon Legends: Arceus（和風テイスト）

#### 優先度：中
- **3DS世代**: X・Y、ORAS、サン・ムーン、ウルトラサン・ムーン
- **BDSP**: Brilliant Diamond/Shining Pearl

### 🔧 フレームワーク拡張

#### 優先度：高  
- **Web Components (Lit)**: WordPress Block Editor統合用
- **React**: 一般的なReactプロジェクト対応

#### 優先度：中
- **Nuxt**: Vue生態系での統合性向上

### 🧩 コンポーネント拡張
- **バトル画面UI**: HP/PPバー、技選択メニュー
- **ポケモン図鑑**: エントリー表示、検索機能
- **ボックス管理**: ポケモン保管・整理UI
- **ステータス画面**: 能力値・技構成表示

### 🌟 長期ビジョン
- **個人ブログ・サイトでの活用**: WordPress統合によるポケモン風記事装飾
- **レトロゲームUI再現**: 歴代全世代のUIを忠実に再現
- **テーマ切り替え体験**: デモサイトでの世代間UI比較機能

### 📱 技術改善
- **レスポンシブ対応**: モバイル・タブレット最適化
- **パフォーマンス**: バンドルサイズ最適化
- **アクセシビリティ**: キーボード操作・スクリーンリーダー対応

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. feature/your-feature-name ブランチを作成
3. 変更をコミット
4. プルリクエストを作成

### 開発ガイドライン
- ESLint・Prettierの設定に従う
- コンポーネントはフレームワーク間で同一API を維持
- テーマ対応はCSS変数を使用
- 日本語コメント・命名を推奨

## 📄 ライセンス

MIT License - プロジェクトの詳細は LICENSE ファイルを参照してください。

---

**✨ レトロなポケモンUIをモダンなWebで再現しよう！**
