<template>
  <div class="status-bar">
    <!-- Top Header Bar -->
    <div class="top-bar">
      <div class="top-line">
        <span>📍 {{ store.data.世界.地点 }}</span>
        <span class="div">|</span>
        <span>🗺️ {{ store.data.世界.地区 }}</span>
        <span class="div">|</span>
        <span>📅 第 {{ store.data.世界.天数 }} 天</span>
      </div>
      <div class="title-row">
        <span class="title">✨ 我有一个聚宝盆</span>
        <span class="event-tag">📌 {{ store.data.世界.事件标记 || '—' }}</span>
      </div>
    </div>

    <!-- Two-Column Layout -->
    <div class="columns">
      <!-- Left Column -->
      <div class="column left">
        <!-- 主角 -->
        <div class="panel">
          <div class="panel-title">📊 主角</div>
          <div class="stats">
            <div class="stat-row"><span class="stat-label">修为</span><span class="stat-value gold">{{ store.data.主角.修为 }}</span></div>
            <div class="stat-row"><span class="stat-label">修为进度</span><span class="stat-value">{{ store.data.主角.修为进度 }}/100</span></div>
            <div class="stat-row"><span class="stat-label">灵根</span><span class="stat-value">{{ store.data.主角.灵根 }}</span></div>
            <div class="stat-row"><span class="stat-label">体质</span><span class="stat-value blue">{{ store.data.主角.体质 || '无' }}</span></div>
            <div class="stat-row"><span class="stat-label">战斗状态</span><span class="stat-value">{{ store.data.主角.战斗状态 || '正常' }}</span></div>
            <div class="stat-row"><span class="stat-label">穿着</span><span class="stat-value">{{ store.data.主角.穿着 }}</span></div>
            <div class="stat-row"><span class="stat-label">灵石</span><span class="stat-value gold">🪙 {{ store.data.主角.灵石 }}</span></div>
          </div>
        </div>

        <!-- 功法 (Collapsible) -->
        <div class="panel collapsible">
          <div class="panel-title clickable" @click="panels.gongfa = !panels.gongfa">
            📜 功法
            <span class="badge" v-if="store.data.主角.功法名称 && store.data.主角.功法名称 !== '无'">1</span>
            <span class="toggle">{{ panels.gongfa ? '▲' : '▼' }}</span>
          </div>
          <div v-if="panels.gongfa" class="panel-body">
            <div v-if="store.data.主角.功法名称 && store.data.主角.功法名称 !== '无'" class="gongfa-content">
              <div class="gongfa-row"><span class="stat-label">功法</span><span class="stat-value gold">{{ store.data.主角.功法名称 }}</span></div>
              <div class="gongfa-row"><span class="stat-label">境界</span><span class="stat-value purple">{{ store.data.主角.功法境界 }}</span></div>
            </div>
            <div v-else class="empty">尚未修炼功法</div>
          </div>
        </div>

        <!-- 随身法宝 (Collapsible) -->
        <div class="panel collapsible">
          <div class="panel-title clickable" @click="panels.faqi = !panels.faqi">
            🔮 随身法宝
            <span class="badge" v-if="store.data.主角.随身法宝 && store.data.主角.随身法宝 !== '无'">1</span>
            <span class="toggle">{{ panels.faqi ? '▲' : '▼' }}</span>
          </div>
          <div v-if="panels.faqi" class="panel-body">
            <div v-if="store.data.主角.随身法宝 && store.data.主角.随身法宝 !== '无'" class="gongfa-content">
              <div class="gongfa-row"><span class="stat-value gold">{{ store.data.主角.随身法宝 }}</span></div>
            </div>
            <div v-else class="empty">未装备法宝</div>
          </div>
        </div>

        <!-- 储物袋 (Collapsible) -->
        <div class="panel collapsible">
          <div class="panel-title clickable" @click="panels.storage = !panels.storage">
            🎒 储物袋
            <span class="badge" v-if="storageCount > 0">{{ storageCount }}</span>
            <span class="toggle">{{ panels.storage ? '▲' : '▼' }}</span>
          </div>
          <div v-if="panels.storage" class="panel-body">
            <div v-if="storageCount > 0" class="storage-list">
              <div v-for="(items, category) in storageParsed" :key="category" class="cat-block">
                <div class="cat-header" @click="toggleCategory(category)">
                  <span class="cat-name">{{ category }}</span>
                  <span class="cat-count">{{ Object.keys(items).length }}</span>
                  <span class="toggle">{{ expandedCategories.has(category) ? '▲' : '▼' }}</span>
                </div>
                <div v-if="expandedCategories.has(category)" class="cat-items">
                  <div v-for="(item, name) in items" :key="name" class="item-name">{{ name }}</div>
                </div>
              </div>
            </div>
            <div v-else class="empty">{{ store.data.储物袋.物品总览 }}</div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="column right">
        <!-- 在场角色 -->
        <div class="panel">
          <div class="panel-title">👤 在场角色</div>
          <div v-if="store.data.关系.当前互动对象" class="char-section">
            <div class="char-name">{{ store.data.关系.当前互动对象 }}</div>
            <div class="affinity-row">
              <span class="affinity-label">好感度</span>
              <div class="affinity-track">
                <div class="affinity-fill" :style="{ width: affinityPercent + '%' }"></div>
              </div>
              <span class="affinity-num" :class="affinityClass">{{ store.data.关系.当前角色好感度 }}</span>
              <span class="affinity-rel">{{ store.data.关系.当前角色关系标签 }}</span>
            </div>
            <div class="char-sub" v-if="store.data.关系.当前角色修为 || store.data.关系.当前角色体质">
              <span v-if="store.data.关系.当前角色修为">修为 {{ store.data.关系.当前角色修为 }}</span>
              <span v-if="store.data.关系.当前角色体质">体质 {{ store.data.关系.当前角色体质 }}</span>
            </div>
            <div v-else class="char-sub dim">修为 未知 · 体质 无</div>
            <div v-if="store.data.关系.当前角色状态描述" class="char-state">{{ store.data.关系.当前角色状态描述 }}</div>
          </div>
          <div v-else class="empty">当前未与任何人互动</div>
        </div>

        <!-- 关系网 (Collapsible) -->
        <div class="panel collapsible">
          <div class="panel-title clickable" @click="panels.relations = !panels.relations">
            🔗 关系网
            <span class="badge" v-if="acquaintanceList.length > 0">{{ acquaintanceList.length }}</span>
            <span class="toggle">{{ panels.relations ? '▲' : '▼' }}</span>
          </div>
          <div v-if="panels.relations" class="panel-body">
            <div v-if="acquaintanceList.length > 0" class="rel-list">
              <div v-for="(char, idx) in acquaintanceList" :key="idx" class="rel-row">
                <span class="rel-char-name">{{ char.name }}</span>
                <div class="rel-affinity-track">
                  <div class="affinity-fill" :style="{ width: charAffinityPercent(char.affinity) + '%' }"></div>
                </div>
                <span class="rel-affinity-val" :class="affinityTagClass(char.affinity)">{{ char.affinity }}</span>
              </div>
            </div>
            <div v-if="store.data.关系.好感度概况" class="rel-summary">{{ store.data.关系.好感度概况 }}</div>
            <div v-else class="empty">尚未结识任何人</div>
          </div>
        </div>

        <!-- 任务栏 (Collapsible) -->
        <div class="panel collapsible">
          <div class="panel-title clickable" @click="panels.quests = !panels.quests">
            📋 任务
            <span class="toggle">{{ panels.quests ? '▲' : '▼' }}</span>
          </div>
          <div v-if="panels.quests" class="panel-body">
            <div class="task-item">
              <span class="task-badge main">主线</span>
              <span class="task-text">{{ store.data.任务.当前主线 }}</span>
            </div>
            <div class="task-item" v-if="store.data.任务.当前支线">
              <span class="task-badge side">支线</span>
              <span class="task-text">{{ store.data.任务.当前支线 }}</span>
            </div>
            <div class="task-item done" v-if="completedQuests.length > 0">
              <span class="task-badge done">已完成</span>
              <span class="task-text">{{ completedQuests.join('、') }}</span>
            </div>
          </div>
        </div>

        <!-- 聚宝盆 (moved to right bottom) -->
        <div class="panel">
          <div class="panel-title">🏺 聚宝盆</div>
          <div class="stats">
            <div class="stat-row"><span class="stat-label">今日已使用</span><span class="stat-value">{{ store.data.聚宝盆.今日已使用 ? '✅ 是' : '❌ 否' }}</span></div>
            <div class="stat-row"><span class="stat-label">已用次数</span><span class="stat-value">{{ store.data.聚宝盆.已用次数 }}</span></div>
            <div class="stat-row"><span class="stat-label">孳生品级</span><span class="stat-value gold">{{ store.data.聚宝盆.孳生品级 }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useDataStore } from './store';

const store = useDataStore();

const panels = reactive({
  gongfa: false,
  faqi: false,
  storage: false,
  relations: false,
  quests: false,
});

// 储物袋
const storageParsed = computed(() => {
  try { return JSON.parse(store.data.储物袋.物品清单) as Record<string, Record<string, unknown>>; }
  catch { return {}; }
});
const storageCount = computed(() => {
  let t = 0;
  for (const items of Object.values(storageParsed.value)) t += Object.keys(items).length;
  return t;
});
const expandedCategories = reactive(new Set<string>());
function toggleCategory(cat: string) {
  if (expandedCategories.has(cat)) expandedCategories.delete(cat);
  else expandedCategories.add(cat);
}

// 在场角色
const affinityPercent = computed(() => ((store.data.关系.当前角色好感度 + 10) / 20) * 100);
const affinityClass = computed(() => {
  const v = store.data.关系.当前角色好感度;
  if (v >= 7) return 'high';
  if (v >= 4) return 'mid';
  if (v <= -5) return 'low';
  return '';
});

// 关系网
const acquaintanceList = computed(() => {
  try { return JSON.parse(store.data.关系.已结识角色) as { name: string; affinity: number; tag?: string; realm?: string }[]; }
  catch { return []; }
});
function charAffinityPercent(v: number): number { return ((v + 10) / 20) * 100; }
function affinityTagClass(v: number): string {
  if (v >= 7) return 'high';
  if (v >= 4) return 'mid';
  if (v <= -5) return 'low';
  return '';
}

// 任务
const completedQuests = computed(() => {
  try { return JSON.parse(store.data.任务.已完成任务) as string[]; }
  catch { return []; }
});
</script>

<style scoped>
.status-bar { width: 100%; max-width: 760px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; color: #e0e0f0; background: #16182a; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.4); }
.top-bar { background: linear-gradient(135deg, #1e2140 0%, #2a2d50 100%); padding: 10px 20px 10px; border-bottom: 2px solid #3a3d6a; }
.top-line { display: flex; justify-content: center; align-items: center; gap: 6px; font-size: 12px; color: #888aac; margin-bottom: 6px; }
.top-line .div { color: #3a3d6a; }
.title-row { display: flex; justify-content: space-between; align-items: center; }
.title { font-size: 20px; font-weight: 700; color: #ffd700; letter-spacing: 1px; }
.event-tag { font-size: 13px; color: #a0a4c0; max-width: 55%; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

.columns { display: flex; gap: 1px; background: #1e2140; }
.column { flex: 1; display: flex; flex-direction: column; gap: 1px; background: #16182a; }
.column.left { border-right: 1px solid #252848; }

.panel { background: #1e2140; padding: 12px 14px; }
.panel-title { font-size: 14px; font-weight: 600; color: #c8cbe8; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
.panel-title.clickable { cursor: pointer; user-select: none; }
.panel-title.clickable:hover { color: #ffd700; }
.toggle { margin-left: auto; font-size: 11px; color: #6a6e90; }
.badge { background: #3a3d6a; color: #c8cbe8; font-size: 11px; padding: 1px 7px; border-radius: 8px; margin-left: auto; }
.collapsible .panel-body { padding-top: 4px; }

.stats { display: flex; flex-direction: column; gap: 5px; }
.stat-row { display: flex; justify-content: space-between; align-items: center; padding: 3px 0; border-bottom: 1px solid #252848; font-size: 13px; }
.stat-label { color: #888aac; }
.stat-value { color: #e0e0f0; font-weight: 500; }
.gold { color: #ffd700; }
.blue { color: #60a5fa; }
.purple { color: #c084fc; }
.empty { text-align: center; color: #5a5c7a; padding: 12px; font-style: italic; font-size: 13px; }

/* 功法 */
.gongfa-content { display: flex; flex-direction: column; gap: 5px; padding: 4px 0; }
.gongfa-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; border-bottom: 1px solid #252848; font-size: 13px; }

/* 储物袋 */
.storage-list { display: flex; flex-direction: column; gap: 4px; }
.cat-block { border: 1px solid #2a2d50; border-radius: 6px; overflow: hidden; }
.cat-header { display: flex; align-items: center; padding: 6px 10px; background: #252848; cursor: pointer; user-select: none; font-size: 13px; }
.cat-header:hover { background: #2d3060; }
.cat-name { flex: 1; font-weight: 500; color: #c8cbe8; }
.cat-count { background: #3a3d6a; color: #a0a4c0; padding: 0 6px; border-radius: 6px; font-size: 11px; margin-right: 6px; }
.cat-items { padding: 4px 10px 8px; display: flex; flex-direction: column; gap: 3px; }
.item-name { font-size: 12px; color: #b0b4d0; padding: 2px 0; }

/* 角色 */
.char-section { text-align: center; }
.char-name { font-size: 16px; font-weight: 600; color: #ffd700; margin-bottom: 8px; }
.affinity-row { display: flex; align-items: center; gap: 6px; padding: 4px 0; }
.affinity-label { font-size: 12px; color: #888aac; width: 42px; flex-shrink: 0; }
.affinity-track { flex: 1; height: 8px; background: #2a2d50; border-radius: 4px; overflow: hidden; }
.affinity-fill { height: 100%; background: linear-gradient(90deg, #6366f1, #8b5cf6); border-radius: 4px; transition: width 0.3s; }
.affinity-num { font-weight: 600; font-size: 14px; width: 28px; text-align: center; }
.affinity-num.high { color: #4ade80; }
.affinity-num.mid { color: #60a5fa; }
.affinity-num.low { color: #f87171; }
.affinity-rel { font-size: 12px; color: #a0a4c0; background: #252848; padding: 1px 8px; border-radius: 8px; }
.char-sub { display: flex; justify-content: center; gap: 12px; margin-top: 6px; font-size: 12px; }
.char-sub.dim { color: #5a5c7a; }

/* 关系网 */
.rel-list { display: flex; flex-direction: column; gap: 4px; }
.rel-row { display: flex; align-items: center; gap: 6px; padding: 5px 0; border-bottom: 1px solid #252848; }
.rel-char-name { width: 60px; font-weight: 500; font-size: 13px; color: #c8cbe8; }
.rel-affinity-track { flex: 1; height: 6px; background: #2a2d50; border-radius: 3px; overflow: hidden; }
.rel-affinity-val { width: 24px; text-align: center; font-size: 12px; font-weight: 600; }
.rel-affinity-val.high { color: #4ade80; }
.rel-affinity-val.mid { color: #60a5fa; }
.rel-affinity-val.low { color: #f87171; }

/* 任务 */
.task-item { display: flex; align-items: flex-start; gap: 8px; padding: 5px 0; border-bottom: 1px solid #252848; font-size: 13px; }
.task-item:last-child { border-bottom: none; }
.task-badge { font-size: 11px; padding: 1px 6px; border-radius: 4px; flex-shrink: 0; margin-top: 1px; }
.task-badge.main { background: #3b5998; color: #fff; }
.task-badge.side { background: #6b5b95; color: #fff; }
.task-badge.done { background: #2d5a3d; color: #4ade80; }
.task-text { color: #c8cbe8; }
.task-item.done .task-text { color: #6a6e90; text-decoration: line-through; }

/* 功法/法宝行 */
.gongfa-content { display: flex; flex-direction: column; gap: 5px; padding: 4px 0; }
.gongfa-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; border-bottom: 1px solid #252848; font-size: 13px; }

/* 角色状态 */
.char-state { margin-top: 6px; font-size: 12px; color: #a0a4c0; font-style: italic; background: #252848; padding: 4px 8px; border-radius: 6px; }

/* 关系摘要 */
.rel-summary { text-align: center; color: #6a6e90; font-size: 12px; padding: 6px; font-style: italic; }
</style>
