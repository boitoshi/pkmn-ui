<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="msg-window panel">
    <header v-if="title" class="msg-header">{{ title }}</header>
    <div class="msg-content">
      <slot />
    </div>
  </div>
</template>

<style>
.msg-window {
  max-width: 400px;
  margin: 16px 0;
}

.msg-header {
  @apply px-4 py-2 border-b-[var(--border-width)] border-solid border-[var(--ink)];
  font-weight: 700;
  font-size: 14px;
}

.msg-content {
  @apply px-4 py-3;
  font-size: 14px;
  line-height: 1.6;
}
</style>