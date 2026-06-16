<template>
  <div class="card">
    <BadgeBar />

    <CollapsiblePanel v-model="panels.女主角" title="红颜知己" :count="activeHeroineCount">
      <div class="heroine-list">
        <div v-for="h in heroines" :key="h.key" class="heroine-item">
          <div class="heroine-header">
            <span class="heroine-name">{{ h.name }}</span>
            <span class="heroine-stage" :class="h.stageClass">{{ h.data.好感阶段 }}</span>
          </div>
          <div class="heroine-detail">
            <span class="detail-tag">❤ {{ h.data.好感度 }}</span>
            <span class="detail-tag">{{ h.data.态度 }}</span>
            <span class="detail-tag">{{ h.data.专属状态 }}</span>
            <span v-if="h.data.羁绊触发" class="detail-tag tag-bond">羁绊</span>
          </div>
        </div>
      </div>
    </CollapsiblePanel>

    <CollapsiblePanel v-model="panels.储物袋" title="储物袋" :count="bagCount">
      <InventoryView :items="store.data.储物袋" />
    </CollapsiblePanel>

    <CollapsiblePanel v-model="panels.仓库" title="仓库" :count="warehouseCount">
      <InventoryView :items="store.data.仓库" />
    </CollapsiblePanel>

    <CollapsiblePanel v-model="panels.功法" title="功法" :count="gongfaCount">
      <div v-if="gongfaCount > 0" class="gongfa-section">
        <div class="gongfa-main">
          <span class="detail-label">主修</span>
          <span class="detail-value">{{ store.data.功法系统.当前主修 }}</span>
        </div>
        <div v-for="(info, name) in store.data.功法系统.功法列表" :key="name as string" class="gongfa-item">
          <span class="gongfa-name">{{ name }}</span>
          <span class="detail-tag">{{ info.品级 }}</span>
          <span class="detail-tag">{{ info.属性 }}</span>
          <span class="detail-tag">{{ info.熟练度 }}</span>
        </div>
      </div>
      <div v-else class="empty-state">暂未修习功法</div>
    </CollapsiblePanel>

    <CollapsiblePanel v-model="panels.任务" title="任务" :count="questCount">
      <div class="quest-section">
        <div class="quest-row">
          <span class="quest-label">主线</span>
          <span class="quest-value">{{ store.data.任务.当前主线 }}</span>
        </div>
        <div v-if="store.data.任务.进行中支线.length > 0" class="quest-row">
          <span class="quest-label">支线</span>
          <span class="quest-value">{{ store.data.任务.进行中支线.join('、') }}</span>
        </div>
        <div v-if="store.data.任务.已完成任务.length > 0" class="quest-row">
          <span class="quest-label">已完成</span>
          <span class="quest-value">{{ store.data.任务.已完成任务.join('、') }}</span>
        </div>
      </div>
    </CollapsiblePanel>

    <CollapsiblePanel v-model="panels.已结交" title="已结交" :count="store.data.已结交NPC.length">
      <div v-if="store.data.已结交NPC.length > 0" class="npc-list">
        <div v-for="(npc, idx) in store.data.已结交NPC" :key="idx" class="npc-item">
          <div class="npc-header">
            <span class="npc-name">{{ npc.姓名 }}</span>
            <span class="detail-tag">{{ npc.修为 }}</span>
          </div>
          <div class="npc-detail">
            <span class="detail-tag">❤ {{ npc.好感度 }}</span>
            <span class="detail-tag">{{ npc.态度 }}</span>
            <span v-if="npc.小任务" class="detail-tag tag-quest">{{ npc.小任务 }}</span>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">尚未结交任何人</div>
    </CollapsiblePanel>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';
import BadgeBar from './components/BadgeBar.vue';
import CollapsiblePanel from './components/CollapsiblePanel.vue';
import InventoryView from './components/InventoryView.vue';

const store = useDataStore();

const heroines = computed(() => {
  const list = [
    { key: '柳如烟', name: '柳如烟', data: store.data.柳如烟 },
    { key: '苏青棠', name: '苏青棠', data: store.data.苏青棠 },
    { key: '叶灵儿', name: '叶灵儿', data: store.data.叶灵儿 },
    { key: '白素曦', name: '白素曦', data: store.data.白素曦 },
  ];
  return list.map(h => ({
    ...h,
    stageClass: h.data.好感阶段 === '羁绊' ? 'stage-bond' : h.data.好感阶段 === '信任' ? 'stage-trust' : '',
  }));
});

const activeHeroineCount = computed(() =>
  heroines.value.filter(h => h.data.好感度 >= 4 || h.data.专属状态 !== '普通').length
);

function countInventoryItems(inv: typeof store.data.储物袋): number {
  let n = 0;
  for (const cat of ['丹药', '法器', '材料', '功法书', '其他'] as const) {
    n += (inv[cat] as unknown[]).length;
  }
  return n;
}

const bagCount = computed(() => countInventoryItems(store.data.储物袋));
const warehouseCount = computed(() => countInventoryItems(store.data.仓库));

const gongfaCount = computed(() => {
  let n = store.data.功法系统.当前主修 ? 1 : 0;
  n += Object.keys(store.data.功法系统.功法列表).length;
  return n;
});

const questCount = computed(() => {
  let n = store.data.任务.当前主线 ? 1 : 0;
  n += store.data.任务.进行中支线.length;
  n += store.data.任务.已完成任务.length;
  return n;
});

const panels = reactive({
  女主角: true,
  储物袋: false,
  仓库: false,
  功法: false,
  任务: false,
  已结交: false,
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

// 女主角
.heroine-list {
  padding: 6px;
}

.heroine-item {
  padding: 6px 8px;
  border-bottom: 1px dashed var(--c-ash-grey);
  &:last-child { border-bottom: none; }
}

.heroine-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.heroine-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.heroine-stage {
  font-size: 0.75rem;
  padding: 1px 6px;
  background: var(--c-ash-grey);
  &.stage-trust { background: var(--c-celadon); color: var(--c-granite); }
  &.stage-bond { background: var(--c-gold); color: #fff; }
}

.heroine-detail {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.detail-tag {
  font-size: 0.75rem;
  padding: 1px 5px;
  border: 1px solid var(--c-grey-olive);
  &.tag-bond { background: var(--c-gold); border-color: var(--c-gold); color: #fff; }
  &.tag-quest { background: var(--c-sky); border-color: var(--c-sky); }
}

// 功法
.gongfa-section {
  padding: 8px;
}

.gongfa-main {
  display: flex;
  gap: 8px;
  padding: 6px;
  background: var(--c-ash-grey);
  margin-bottom: 6px;
}

.gongfa-item {
  display: flex;
  gap: 6px;
  padding: 4px 6px;
  align-items: center;
  border-bottom: 1px dashed var(--c-ash-grey);
  &:last-child { border-bottom: none; }
}

.gongfa-name {
  font-weight: bold;
  flex: 1;
}

.detail-label {
  font-weight: bold;
  color: var(--c-grey-olive);
}

.detail-value {
  flex: 1;
}

// 任务
.quest-section {
  padding: 10px;
}

.quest-row {
  display: flex;
  padding: 5px 0;
  border-bottom: 1px dashed var(--c-ash-grey);
  &:last-child { border-bottom: none; }
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

// 已结交NPC
.npc-list {
  padding: 6px;
}

.npc-item {
  padding: 6px 8px;
  border-bottom: 1px dashed var(--c-ash-grey);
  &:last-child { border-bottom: none; }
}

.npc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.npc-name {
  font-weight: bold;
  font-size: 0.9rem;
}

.npc-detail {
  display: flex;
  gap: 6px;
}
</style>
