<template>
  <div class="affinity-row">
    <span class="affinity-label">{{ label }}</span>
    <div class="affinity-track">
      <div class="affinity-fill" :style="{ width: percent + '%' }"></div>
    </div>
    <span class="affinity-num" :class="tierClass">{{ value }}</span>
    <span v-if="tag" class="affinity-rel">{{ tag }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  value: number;
  tag?: string;
  min?: number;
  max?: number;
}>();

const percent = computed(() => {
  const min = props.min ?? -10;
  const max = props.max ?? 10;
  return ((props.value - min) / (max - min)) * 100;
});

const tierClass = computed(() => {
  const v = props.value;
  if (v >= 7) return 'high';
  if (v >= 4) return 'mid';
  if (v <= -5) return 'low';
  return '';
});
</script>

<style scoped>
.affinity-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
}
.affinity-label {
  font-size: 12px;
  color: var(--c-text-muted);
  width: 42px;
  flex-shrink: 0;
}
.affinity-track {
  flex: 1;
  height: 8px;
  background: var(--c-affinity-track);
  border-radius: 4px;
  overflow: hidden;
}
.affinity-fill {
  height: 100%;
  background: var(--c-affinity-fill);
  border-radius: 4px;
  transition: width 0.3s;
}
.affinity-num {
  font-weight: 600;
  font-size: 14px;
  width: 28px;
  text-align: center;
}
.affinity-num.high { color: var(--c-accent-green); }
.affinity-num.mid { color: var(--c-accent-blue); }
.affinity-num.low { color: var(--c-accent-red); }
.affinity-rel {
  font-size: 12px;
  color: #a0a4c0;
  background: var(--c-surface-hover);
  padding: 1px 8px;
  border-radius: 8px;
}
</style>
