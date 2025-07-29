<script setup>
import { ref, onMounted } from 'vue'
import TypeBadge from "@pkmn-ui/vue/TypeBadge.vue"
import MsgWindow from "@pkmn-ui/vue/MsgWindow.vue"
import MenuGrid from "@pkmn-ui/vue/MenuGrid.vue"

const menu = [
  {label:"バッグ",active:true},
  {label:"ポケモン"},
  {label:"ずかん"},
  {label:"せってい"}
]

const themes = [
  { id: 'gba', name: 'GBA (Gen3)', description: 'ルビー・サファイア・エメラルド' },
  { id: 'ds-dot', name: 'DS DOT (Gen4-5)', description: 'ダイパ・プラチナ・HGSS・BW・BW2' },
  { id: 'lgpe', name: 'LGPE (Gen7)', description: 'Let\'s Go ピカチュウ・イーブイ' },
  { id: 'swsh', name: 'SWSH (Gen8)', description: 'ソード・シールド' }
]

const selectedTheme = ref('gba')

const themeMap = {
  'gba': () => import('@pkmn-ui/themes/gba/index.css'),
  'ds-dot': () => import('@pkmn-ui/themes/ds/dot/index.css'),
  'lgpe': () => import('@pkmn-ui/themes/switch/lgpe/index.css'),
  'swsh': () => import('@pkmn-ui/themes/switch/swsh/index.css')
}

// 現在読み込まれているテーマCSSを管理
let currentThemeLink = null

const loadTheme = async (themeId) => {
  // 既存のテーマCSSを削除
  if (currentThemeLink) {
    document.head.removeChild(currentThemeLink)
  }
  
  // 新しいテーマCSSを読み込み
  const themePath = {
    'gba': '/node_modules/@pkmn-ui/themes/gba/index.css',
    'ds-dot': '/node_modules/@pkmn-ui/themes/ds/dot/index.css',
    'lgpe': '/node_modules/@pkmn-ui/themes/switch/lgpe/index.css',
    'swsh': '/node_modules/@pkmn-ui/themes/switch/swsh/index.css'
  }
  
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = themePath[themeId]
  document.head.appendChild(link)
  currentThemeLink = link
  
  // ローカルストレージに保存
  localStorage.setItem('selected-theme-vue', themeId)
}

const handleThemeChange = (event) => {
  const newTheme = event.target.value
  selectedTheme.value = newTheme
  loadTheme(newTheme)
}

onMounted(() => {
  // 保存されたテーマを復元
  const savedTheme = localStorage.getItem('selected-theme-vue')
  if (savedTheme && themeMap[savedTheme]) {
    selectedTheme.value = savedTheme
  }
  
  // 初期テーマを読み込み
  loadTheme(selectedTheme.value)
})
</script>

<template>
  <div class="demo-container" style="padding:24px">
    <header class="demo-header panel" style="margin-bottom:24px; padding:16px;">
      <h1 style="margin:0 0 16px 0; font-size:24px;">🎮 PKMN-UI テーマデモ (Vue)</h1>
      
      <div class="theme-selector">
        <label style="font-weight:700; margin-right:12px;">テーマ選択:</label>
        <select 
          :value="selectedTheme" 
          @change="handleThemeChange"
          class="theme-dropdown" 
          style="padding:4px 8px; border-radius:4px;"
        >
          <option 
            v-for="theme in themes" 
            :key="theme.id" 
            :value="theme.id"
          >
            {{ theme.name }} - {{ theme.description }}
          </option>
        </select>
        
        <a href="../" class="framework-switch-btn" style="margin-left:16px;">
          🔄 Astro版で見る
        </a>
      </div>
    </header>

    <div class="demo-content">
      <section style="margin-bottom:24px;">
        <h2 style="margin-bottom:12px;">TypeBadge - ポケモンタイプバッジ</h2>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <TypeBadge type="fire" />
          <TypeBadge type="water" />
          <TypeBadge type="grass" />
          <TypeBadge type="electric" />
        </div>
      </section>

      <section style="margin-bottom:24px;">  
        <h2 style="margin-bottom:12px;">MsgWindow - メッセージウィンドウ</h2>
        <MsgWindow title="オーキドはかせ">
          ここは　ポケモンUIライブラリの　デモじゃ！<br>
          テーマを　きりかえて　みてくれ！
        </MsgWindow>
      </section>

      <section>
        <h2 style="margin-bottom:12px;">MenuGrid - メニューグリッド</h2>
        <MenuGrid :items="menu"/>
      </section>
    </div>
  </div>
</template>

<style>
.demo-container {
  max-width: 800px;
  margin: 0 auto;
}

.theme-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.theme-dropdown {
  font-family: inherit;
  border: 2px solid var(--ink);
  background: var(--panel-bg);
  color: var(--ink);
}

h2 {
  font-size: 18px;
  color: var(--ink);
  margin-bottom: 12px;
}

.framework-switch-btn {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-family: inherit;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  border: 2px solid var(--ink);
  border-radius: 4px;
  background: var(--panel-bg);
  color: var(--ink);
  transition: all 0.2s ease;
}

.framework-switch-btn:hover {
  background: var(--accent);
  color: white;
  transform: translateY(-1px);
}
</style>
