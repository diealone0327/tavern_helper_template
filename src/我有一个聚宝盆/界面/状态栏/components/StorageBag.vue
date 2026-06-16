<template>
  <SectionPanel
    title="🎒 储物袋"
    collapsible
    :open="open"
    :badge="totalCount > 0 ? totalCount : undefined"
    @toggle="$emit('toggle')"
  >
    <div v-if="totalCount > 0" class="storage-list">
      <div
        v-for="(items, category) in storageData"
        :key="category"
        class="cat-block"
      >
        <div class="cat-header" @click="toggleCategory(category)">
          <span class="cat-name">{{ category }}</span>
          <span class="cat-count">{{ Object.keys(items).length }}</span>
          <span class="toggle">{{ expanded.has(category) ? '▲' : '▼' }}</span>
        </div>
        <div v-if="expanded.has(category)" class="cat-items">
          <div v-for="(_item, name) in items" :key="name" class="item-name">
            {{ name }}
          </div>
        </div>
      </div>
    </div>
    <template #empty>
      <div class="empty-text">{{ store.data.储物袋.物品总览 }}</div>
    </template>
  </SectionPanel>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useDataStore } from '../store';
import SectionPanel from './SectionPanel.vue';

defineProps<{ open: boolean }>();
defineEmits<{ toggle: [] }>();

const store = useDataStore();

const storageData = computed(() => {
  try {
    return JSON.parse(store.data.储物袋.物品清单) as Record<string, Record<string, unknown>>;
  } catch {
    return {} as Record<string, Record<string, unknown>>;
  }
});

const totalCount = computed(() => {
  let t = 0;
  for (const items of Object.values(storageData.value)) {
    t += Object.keys(items).length;
  }
  return t;
});

const expanded = reactive(new Set<string>());

function toggleCategory(cat: string) {
  if (expanded.has(cat)) expanded.delete(cat);
  else expanded.add(cat);
}
</script>

<style scoped>
.storage-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.cat-block {
  border: 1px solid var(--c-border);
  border-radius: 6px;
  overflow: hidden;
}
.cat-header {
  display: flex;
  align-items: center;
  padding: 6px 10px;
  background: var(--c-surface-hover);
  cursor: pointer;
  user-select: none;
  font-size: 13px;
}
.cat-header:hover {
  background: #2d3060;
}
.cat-name {
  flex: 1;
  font-weight: 500;
  color: var(--c-text-secondary);
}
.cat-count {
  background: var(--c-border-light);
  color: #a0a4c0;
  padding: 0 6px;
  border-radius: 6px;
  font-size: 11px;
  margin-right: 6px;
}
.cat-items {
  padding: 4px 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.item-name {
  font-size: 12px;
  color: #b0b4d0;
  padding: 2px 0;
}
.toggle {
  font-size: 11px;
  color: var(--c-text-dim);
}
</style>
