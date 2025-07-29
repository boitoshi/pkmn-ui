<script setup lang="ts">
defineProps<{
  type: "normal" | "fire" | "water" | "electric" | "grass" | "ice" | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel"
  label?: string
}>()
</script>

<template>
  <span :class="`type-badge ${type}`">{{ label ?? type.toUpperCase() }}</span>
</template>

<style>
.type-badge{
  @apply px-3 py-1 text-[14px] font-bold inline-flex
          border-[var(--border-width)] border-solid border-[var(--ink)]
          rounded-[var(--border-radius)] leading-none;
  color:#111; text-shadow:0 1px 0 #0003;
  box-shadow:inset 0 1px 0 #fff9,inset 0 -1px 0 #0002,0 2px 0 #0002;
}
/* 色は CSS 変数参照で統一 */
.type-badge.fire{background:var(--t-fire)}
.type-badge.water{background:var(--t-water)}
.type-badge.grass{background:var(--t-grass)}
.type-badge.electric{background:var(--t-electric)}
</style>
