<template>
  <SectionPanel
    title="📜 功法"
    collapsible
    :open="open"
    :badge="hasGongfa ? 1 : undefined"
    @toggle="$emit('toggle')"
  >
    <div v-if="hasGongfa" class="gongfa-content">
      <div class="gongfa-row">
        <span class="stat-label">功法</span>
        <span class="stat-value gold">{{ store.data.主角.功法名称 }}</span>
      </div>
      <div class="gongfa-row">
        <span class="stat-label">境界</span>
        <span class="stat-value purple">{{ store.data.主角.功法境界 }}</span>
      </div>
    </div>
  </SectionPanel>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';
import SectionPanel from './SectionPanel.vue';

defineProps<{ open: boolean }>();
defineEmits<{ toggle: [] }>();

const store = useDataStore();
const hasGongfa = computed(() =>
  store.data.主角.功法名称 && store.data.主角.功法名称 !== '无'
);
</script>

<style scoped>
.gongfa-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 4px 0;
}
.gongfa-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid var(--c-border);
  font-size: 13px;
}
.stat-label { color: var(--c-text-muted); }
.stat-value { color: var(--c-text-primary); font-weight: 500; }
.gold { color: var(--c-primary); }
.purple { color: var(--c-accent-purple); }
</style>
