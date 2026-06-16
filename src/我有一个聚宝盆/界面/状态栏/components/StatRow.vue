<template>
  <div class="stat-row">
    <span class="label">{{ label }}</span>
    <span class="value" :class="colorClass">
      <slot>{{ value }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  value?: string | number;
  color?: 'gold' | 'blue' | 'purple' | 'green' | 'default';
}>();

const colorClass = computed(() => {
  if (!props.color || props.color === 'default') return '';
  return `color-${props.color}`;
});
</script>

<style scoped>
.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
  border-bottom: 1px solid var(--c-border);
  font-size: 13px;
}
.label {
  color: var(--c-text-muted);
}
.value {
  color: var(--c-text-primary);
  font-weight: 500;
}
.color-gold { color: var(--c-primary); }
.color-blue { color: var(--c-accent-blue); }
.color-purple { color: var(--c-accent-purple); }
.color-green { color: var(--c-accent-green); }
</style>
