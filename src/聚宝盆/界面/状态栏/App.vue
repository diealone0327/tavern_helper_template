<template>
  <div class="card">
    <BadgeBar />

    <CollapsiblePanel
      v-model="panels.法宝"
      title="随身法宝"
      :count="hasFaBao ? 1 : 0"
    >
      <div class="fa-bao-content">
        <div v-if="hasFaBao" class="fa-bao-item">{{ store.data.主角.随身法宝 }}</div>
        <div v-else class="empty-state">暂无随身法宝</div>
      </div>
    </CollapsiblePanel>

    <CollapsiblePanel
      v-model="panels.储物袋"
      title="储物袋"
      :count="storageCount"
    >
      <div v-if="storageCount > 0" class="storage-list">
        <div
          v-for="(items, category) in storageParsed"
          :key="category as string"
          class="category-section"
        >
          <div class="category-header" @click="toggleCategory(category as string)">
            <span class="category-icon">{{ categoryIcons[category as string] }}</span>
            <span class="category-name">{{ category }}</span>
            <span class="category-count">{{ Object.keys(items as Record<string, unknown>).length }}</span>
          </div>
          <div v-if="expandedCategories.has(category as string)" class="category-items">
            <div
              v-for="(item, name) in items as Record<string, unknown>"
              :key="name as string"
              class="storage-item"
            >
              <span class="item-name">{{ name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">储物袋空空如也</div>
    </CollapsiblePanel>

    <CollapsiblePanel
      v-model="panels.当前角色"
      title="当前角色信息"
      :count="hasCurrentChar ? 1 : 0"
    >
      <div v-if="hasCurrentChar" class="char-info">
        <div class="info-row"><span class="info-label">对象</span><span class="info-value">{{ store.data.关系.当前互动对象 }}</span></div>
        <div class="info-row"><span class="info-label">好感度</span><span class="info-value" :class="affinityClass">{{ store.data.关系.当前角色好感度 }} · {{ store.data.关系.当前角色关系标签 }}</span></div>
        <div class="info-row"><span class="info-label">修为</span><span class="info-value">{{ store.data.关系.当前角色修为 || '未知' }}</span></div>
        <div class="info-row"><span class="info-label">体质</span><span class="info-value">{{ store.data.关系.当前角色体质 || '无' }}</span></div>
        <div v-if="store.data.关系.当前角色状态描述" class="info-row">
          <span class="info-label">状态</span><span class="info-value">{{ store.data.关系.当前角色状态描述 }}</span>
        </div>
      </div>
      <div v-else class="empty-state">当前未与任何人互动</div>
    </CollapsiblePanel>

    <CollapsiblePanel
      v-model="panels.关系网"
      title="已结识角色"
      :count="acquaintanceList.length"
    >
      <div v-if="acquaintanceList.length > 0" class="relation-list">
        <div v-for="(char, idx) in acquaintanceList" :key="idx" class="relation-item">
          <span class="rel-name">{{ char.name }}</span>
          <span class="rel-affinity" :class="affinityTagClass(char.affinity)">{{ char.affinity }} · {{ char.tag }}</span>
          <span v-if="char.realm" class="rel-realm">{{ char.realm }}</span>
        </div>
      </div>
      <div v-else class="empty-state">{{ store.data.关系.好感度概况 }}</div>
    </CollapsiblePanel>

    <CollapsiblePanel
      v-model="panels.任务"
      title="任务"
      :count="questCount"
    >
      <div class="quest-section">
        <div class="quest-row">
          <span class="quest-label">主线</span>
          <span class="quest-value">{{ store.data.任务.当前主线 }}</span>
        </div>
        <div v-if="store.data.任务.当前支线" class="quest-row">
          <span class="quest-label">支线</span>
          <span class="quest-value">{{ store.data.任务.当前支线 }}</span>
        </div>
        <div v-if="completedQuests.length > 0" class="quest-row">
          <span class="quest-label">已完成</span>
          <span class="quest-value">{{ completedQuests.join('、') }}</span>
        </div>
      </div>
    </CollapsiblePanel>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';
import BadgeBar from './components/BadgeBar.vue';
import CollapsiblePanel from './components/CollapsiblePanel.vue';

const store = useDataStore();

// 法宝
const hasFaBao = computed(() => store.data.主角.随身法宝 && store.data.主角.随身法宝 !== '无');

// 储物袋
const storageParsed = computed(() => {
  try {
    return JSON.parse(store.data.储物袋.物品清单) as Record<string, Record<string, unknown>>;
  } catch {
    return {};
  }
});
const storageCount = computed(() => {
  let total = 0;
  for (const items of Object.values(storageParsed.value)) {
    total += Object.keys(items).length;
  }
  return total;
});

const categoryIcons: Record<string, string> = {
  '丹药': '丹',
  '法器': '器',
  '材料': '材',
  '符箓': '符',
  '灵植': '植',
  '杂物': '杂',
};

const expandedCategories = reactive(new Set<string>());
function toggleCategory(cat: string) {
  if (expandedCategories.has(cat)) {
    expandedCategories.delete(cat);
  } else {
    expandedCategories.add(cat);
  }
}

// 当前角色
const hasCurrentChar = computed(() => !!store.data.关系.当前互动对象);
const affinityClass = computed(() => {
  const v = store.data.关系.当前角色好感度;
  if (v >= 8) return 'affinity-high';
  if (v <= -5) return 'affinity-low';
  return '';
});

// 关系网
const acquaintanceList = computed(() => {
  try {
    return JSON.parse(store.data.关系.已结识角色) as { name: string; affinity: number; tag: string; realm?: string }[];
  } catch {
    return [];
  }
});
function affinityTagClass(v: number): string {
  if (v >= 8) return 'affinity-high';
  if (v <= -5) return 'affinity-low';
  return '';
}

// 任务
const completedQuests = computed(() => {
  try {
    return JSON.parse(store.data.任务.已完成任务) as string[];
  } catch {
    return [];
  }
});
const questCount = computed(() => {
  let n = 0;
  if (store.data.任务.当前主线) n++;
  if (store.data.任务.当前支线) n++;
  n += completedQuests.value.length;
  return n;
});

// 折叠面板状态
const panels = reactive({
  法宝: true,
  储物袋: false,
  当前角色: false,
  关系网: false,
  任务: false,
});
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 720px;
  background-color: var(--c-mint-cream);
  border: 3px solid var(--c-granite);
  box-shadow: 5px 5px 0px rgba(60, 73, 63, 0.16);
  display: flex;
  flex-direction: column;
  font-family: var(--font-archive);
  color: var(--c-granite);
  font-size: 13px;
  line-height: 1.35;
  margin: 0 auto;
}

.empty-state {
  text-align: center;
  color: var(--c-grey-olive);
  padding: 12px;
  font-style: italic;
  font-size: 0.85rem;
}

.fa-bao-content {
  padding: 10px;
}

.fa-bao-item {
  background: linear-gradient(135deg, var(--c-gold), #e8d5a3);
  border: 1.5px solid var(--c-granite);
  padding: 8px 12px;
  font-weight: bold;
  text-align: center;
}

// 储物袋
.storage-list {
  padding: 8px;
}

.category-section {
  margin-bottom: 6px;
  border: 1.5px solid var(--c-grey-olive);
}

.category-header {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  background: var(--c-mint-cream);
  cursor: pointer;
  user-select: none;

  &:hover {
    background: var(--c-ash-grey);
  }
}

.category-icon {
  width: 22px;
  height: 22px;
  background: var(--c-sky);
  border: 1.5px solid var(--c-granite);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: bold;
  margin-right: 8px;
}

.category-name {
  flex: 1;
  font-weight: bold;
  font-size: 0.85rem;
}

.category-count {
  background: var(--c-granite);
  color: #fff;
  padding: 1px 6px;
  font-size: 0.7rem;
}

.category-items {
  padding: 4px 8px 8px 38px;
}

.storage-item {
  padding: 3px 0;
  font-size: 0.85rem;
  border-bottom: 1px dashed var(--c-ash-grey);

  &:last-child {
    border-bottom: none;
  }
}

// 角色信息
.char-info {
  padding: 10px;
}

.info-row {
  display: flex;
  padding: 4px 0;
  border-bottom: 1px dashed var(--c-ash-grey);

  &:last-child {
    border-bottom: none;
  }
}

.info-label {
  width: 60px;
  font-weight: bold;
  color: var(--c-grey-olive);
  flex-shrink: 0;
}

.info-value {
  flex: 1;
}

.affinity-high {
  color: var(--c-celadon);
  font-weight: bold;
}

.affinity-low {
  color: var(--c-danger);
  font-weight: bold;
}

// 关系网
.relation-list {
  padding: 8px;
}

.relation-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px dashed var(--c-ash-grey);
  gap: 8px;

  &:last-child {
    border-bottom: none;
  }
}

.rel-name {
  font-weight: bold;
  width: 80px;
}

.rel-affinity {
  font-size: 0.8rem;
  padding: 1px 6px;
  background: var(--c-ash-grey);
}

.rel-realm {
  font-size: 0.75rem;
  color: var(--c-grey-olive);
  margin-left: auto;
}

// 任务
.quest-section {
  padding: 10px;
}

.quest-row {
  display: flex;
  padding: 5px 0;
  border-bottom: 1px dashed var(--c-ash-grey);

  &:last-child {
    border-bottom: none;
  }
}

.quest-label {
  width: 60px;
  font-weight: bold;
  color: var(--c-grey-olive);
  flex-shrink: 0;
}

.quest-value {
  flex: 1;
}
</style>
