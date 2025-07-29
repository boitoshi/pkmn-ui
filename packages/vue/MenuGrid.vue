<script setup lang="ts">
interface MenuItem {
  label: string
  active?: boolean
}

defineProps<{
  items: MenuItem[]
}>()
</script>

<template>
  <div class="menu-grid panel">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['menu-item', { active: item.active }]"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<style>
.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  padding: 8px;
  max-width: 300px;
}

.menu-item {
  @apply px-3 py-2 text-center font-bold text-sm;
  background: var(--panel-bg);
  border: var(--border-width) solid var(--ink);
  border-radius: calc(var(--radius) / 2);
  cursor: pointer;
  transition: all 0.12s ease;
}

.menu-item:hover {
  transform: translateY(-1px);
}

.menu-item.active {
  background: var(--accent);
  color: white;
}
</style>