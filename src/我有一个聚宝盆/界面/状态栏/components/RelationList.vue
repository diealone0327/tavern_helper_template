<template>
  <SectionPanel
    title="🔗 关系网"
    collapsible
    :open="open"
    :badge="acquaintances.length > 0 ? acquaintances.length : undefined"
    @toggle="$emit('toggle')"
  >
    <div v-if="acquaintances.length > 0" class="rel-list">
      <div v-for="(ch, idx) in acquaintances" :key="idx" class="rel-row">
        <span class="rel-name">{{ ch.name }}</span>
        <div class="rel-track">
          <div class="rel-fill" :style="{ width: affinityPercent(ch.affinity) + '%' }"></div>
        </div>
        <span class="rel-val" :class="affinityClass(ch.affinity)">{{ ch.affinity }}</span>
      </div>
    </div>
    <div v-if="summary" class="rel-summary">{{ summary }}</div>
  </SectionPanel>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';
import SectionPanel from './SectionPanel.vue';

defineProps<{ open: boolean }>();
defineEmits<{ toggle: [] }>();

const store = useDataStore();

interface Acquaintance {
  name: string;
  affinity: number;
  tag?: string;
  realm?: string;
}

const acquaintances = computed(() => {
  try {
    return JSON.parse(store.data.关系.已结识角色) as Acquaintance[];
  } catch {
    return [];
  }
});

const summary = computed(() => store.data.关系.好感度概况);

function affinityPercent(v: number): number {
  return ((v + 10) / 20) * 100;
}

function affinityClass(v: number): string {
  if (v >= 7) return 'high';
  if (v >= 4) return 'mid';
  if (v <= -5) return 'low';
  return '';
}
</script>

<style scoped>
.rel-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.rel-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 0;
  border-bottom: 1px solid var(--c-border);
}
.rel-name {
  width: 60px;
  font-weight: 500;
  font-size: 13px;
  color: var(--c-text-secondary);
}
.rel-track {
  flex: 1;
  height: 6px;
  background: var(--c-affinity-track);
  border-radius: 3px;
  overflow: hidden;
}
.rel-fill {
  height: 100%;
  background: var(--c-affinity-fill);
  border-radius: 3px;
  transition: width 0.3s;
}
.rel-val {
  width: 24px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
}
.rel-val.high { color: var(--c-accent-green); }
.rel-val.mid { color: var(--c-accent-blue); }
.rel-val.low { color: var(--c-accent-red); }
.rel-summary {
  text-align: center;
  color: var(--c-text-dim);
  font-size: 12px;
  padding: 6px;
  font-style: italic;
}
</style>
