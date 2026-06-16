<template>
  <div class="status-bar">
    <!-- 世界 -->
    <div class="section world">
      <span class="badge">{{ data.世界.地点 }}</span>
      <span class="sep">|</span>
      <span>{{ data.世界.天气 }}</span>
      <span class="sep">|</span>
      <span>{{ data.世界.季节 }}</span>
      <span class="sep">|</span>
      <span>第{{ data.世界.日期 }}日</span>
      <span class="sep">|</span>
      <span>{{ data.世界.时辰 }}</span>
    </div>

    <!-- 陈婷婷 -->
    <div class="section character">
      <span class="label">❤︎ 好感</span>
      <div class="bar-wrap"><div class="bar bar-fav" :style="{ width: pct(data.陈婷婷.好感度) + '%' }"></div></div>
      <span class="val val-fav">{{ data.陈婷婷.好感度 }}</span>

      <span class="label">欲</span>
      <div class="bar-wrap"><div class="bar bar-des" :style="{ width: pct(data.陈婷婷.欲望) + '%' }"></div></div>
      <span class="val val-des">{{ data.陈婷婷.欲望 }}</span>

      <span class="label">沦</span>
      <div class="bar-wrap"><div class="bar bar-dep" :style="{ width: pct(data.陈婷婷.沉沦) + '%' }"></div></div>
      <span class="val val-dep">{{ data.陈婷婷.沉沦 }}</span>

      <span class="label">戒</span>
      <div class="bar-wrap"><div class="bar bar-grd" :style="{ width: pct(data.陈婷婷.戒备) + '%' }"></div></div>
      <span class="val val-grd">{{ data.陈婷婷.戒备 }}</span>

      <span class="status-tag">{{ phaseLabel }}</span>
      <span>{{ data.陈婷婷.状态 }}</span>
    </div>

    <!-- 财富 -->
    <div class="section wealth">
      <span>💰 {{ data.财富.铜钱 }}文</span>
      <span class="sep">|</span>
      <span>🥈 {{ data.财富.银子 }}两</span>
      <span class="sep">|</span>
      <span>🥇 {{ data.财富.金子 }}两</span>
    </div>

    <!-- 任务 -->
    <div class="section quest">
      <span class="label">📋</span>
      <span>{{ data.任务.当前任务 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from './store';

const store = useDataStore();
const data = store.data;

const pct = (n: number) => Math.min(100, Math.max(0, n));

const phaseLabel = computed(() => {
  const fav = data.陈婷婷.好感度;
  if (fav < 0) return '??';
  if (fav < 20) return '抵触期';
  if (fav < 45) return '适应期';
  if (fav < 70) return '接纳期';
  return '沉沦期';
});
</script>

<style scoped>
.status-bar {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 12px;
  color: #e2e8f0;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.88), rgba(30, 41, 59, 0.88));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(96, 165, 250, 0.15);
  border-radius: 10px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 4px 0;
}

.section {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.sep {
  color: rgba(148, 163, 184, 0.4);
  font-size: 10px;
}

.badge {
  background: rgba(96, 165, 250, 0.15);
  color: #60a5fa;
  padding: 1px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 11px;
}

.label {
  color: #94a3b8;
  font-size: 11px;
  white-space: nowrap;
}

.bar-wrap {
  width: 50px;
  height: 5px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
  flex-shrink: 0;
}

.bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease;
}

.bar-fav { background: linear-gradient(90deg, #4ade80, #22c55e); }
.bar-des { background: linear-gradient(90deg, #f87171, #ef4444); }
.bar-dep { background: linear-gradient(90deg, #fbbf24, #f59e0b); }
.bar-grd { background: linear-gradient(90deg, #60a5fa, #3b82f6); }

.val { font-weight: 600; font-size: 11px; min-width: 22px; text-align: right; }
.val-fav { color: #4ade80; }
.val-des { color: #f87171; }
.val-dep { color: #fbbf24; }
.val-grd { color: #60a5fa; }

.status-tag {
  background: rgba(192, 132, 252, 0.15);
  color: #c084fc;
  padding: 1px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 11px;
  margin-left: 4px;
}
</style>
