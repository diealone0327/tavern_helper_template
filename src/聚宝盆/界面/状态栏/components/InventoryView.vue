<template>
  <div class="inventory-view">
    <div v-if="totalCount === 0" class="empty-state">空空如也</div>
    <div v-else class="category-list">
      <div
        v-for="cat in categories"
        :key="cat.key"
        class="category-section"
      >
        <div v-if="cat.items.length > 0" class="category-block">
          <div class="category-header" @click="toggleCat(cat.key)">
            <span class="cat-icon">{{ cat.icon }}</span>
            <span class="cat-name">{{ cat.label }}</span>
            <span class="cat-count">{{ cat.items.length }}</span>
            <span class="cat-arrow">{{ expanded.has(cat.key) ? '▾' : '▸' }}</span>
          </div>
          <div v-if="expanded.has(cat.key)" class="category-items">
            <div v-for="(item, idx) in cat.items" :key="idx" class="inv-item">
              <span class="inv-name">{{ item.名称 }}</span>
              <span class="inv-qty">×{{ item.数量 }}</span>
              <span v-if="item.品级" class="inv-grade">{{ item.品级 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: {
    丹药: { 名称: string; 数量: number; 品级: string }[];
    法器: { 名称: string; 数量: number; 品级: string }[];
    材料: { 名称: string; 数量: number }[];
    功法书: { 名称: string; 品级: string }[];
    其他: { 名称: string; 数量: number }[];
  };
}>();

const expanded = reactive(new Set<string>(['丹药', '法器']));

function toggleCat(key: string) {
  if (expanded.has(key)) expanded.delete(key);
  else expanded.add(key);
}

const categories = computed(() => [
  { key: '丹药', label: '丹药', icon: '丹', items: props.items.丹药 },
  { key: '法器', label: '法器', icon: '器', items: props.items.法器 },
  { key: '材料', label: '材料', icon: '材', items: props.items.材料 },
  { key: '功法书', label: '功法书', icon: '功', items: props.items.功法书 },
  { key: '其他', label: '其他', icon: '杂', items: props.items.其他 },
]);

const totalCount = computed(() =>
  categories.value.reduce((s, c) => s + c.items.length, 0)
);
</script>

<style lang="scss" scoped>
.empty-state {
  text-align: center;
  color: var(--c-grey-olive);
  padding: 12px;
  font-style: italic;
  font-size: 0.85rem;
}

.category-list {
  padding: 6px;
}

.category-block {
  margin-bottom: 4px;
  border: 1.5px solid var(--c-grey-olive);
}

.category-header {
  display: flex;
  align-items: center;
  padding: 5px 8px;
  background: var(--c-mint-cream);
  cursor: pointer;
  user-select: none;
  gap: 6px;
  &:hover { background: var(--c-ash-grey); }
}

.cat-icon {
  width: 20px;
  height: 20px;
  background: var(--c-sky);
  border: 1.5px solid var(--c-granite);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: bold;
  flex-shrink: 0;
}

.cat-name {
  flex: 1;
  font-weight: bold;
  font-size: 0.8rem;
}

.cat-count {
  background: var(--c-granite);
  color: #fff;
  padding: 0 5px;
  font-size: 0.65rem;
}

.cat-arrow {
  font-size: 0.7rem;
  color: var(--c-grey-olive);
  width: 14px;
  text-align: center;
}

.category-items {
  padding: 3px 6px 6px 34px;
}

.inv-item {
  display: flex;
  align-items: center;
  padding: 3px 0;
  border-bottom: 1px dashed var(--c-ash-grey);
  gap: 6px;
  font-size: 0.82rem;
  &:last-child { border-bottom: none; }
}

.inv-name { flex: 1; }
.inv-qty { color: var(--c-granite); font-weight: bold; }
.inv-grade { font-size: 0.7rem; color: var(--c-grey-olive); }
</style>
