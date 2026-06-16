<template>
  <div class="badge-bar">
    <div class="badge-top">
      <span class="badge-realm">{{ store.data.主角.修为境界 }}</span>
      <span class="badge-root">{{ store.data.主角.灵根品质 }}</span>
      <span class="badge-status" :class="statusClass">{{ store.data.主角.状态 }}</span>
      <span class="badge-bowl">{{ store.data.系统.聚宝盆今日已用 ? '盆已用' : '盆可用' }}</span>
    </div>
    <div class="badge-bottom">
      <span class="badge-location">{{ store.data.系统.当前所在位置 }}</span>
      <span class="badge-lingshi">{{ store.data.主角.持有灵石 }} 灵石</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const statusClass = computed(() => {
  const s = store.data.主角.状态;
  if (s === '正常') return '';
  if (s === '轻伤') return 'status-warn';
  return 'status-danger';
});
</script>

<style lang="scss" scoped>
.badge-bar {
  padding: 6px 10px;
  background: var(--c-granite);
  color: var(--c-mint-cream);
  font-size: 0.82rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.badge-top,
.badge-bottom {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.badge-realm {
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--c-gold);
}

.badge-root {
  background: var(--c-sky);
  color: var(--c-granite);
  padding: 1px 6px;
  font-weight: bold;
  font-size: 0.72rem;
}

.badge-status {
  padding: 1px 6px;
  font-weight: bold;
  font-size: 0.72rem;
  border: 1px solid var(--c-mint-cream);
  &.status-warn { color: var(--c-gold); border-color: var(--c-gold); }
  &.status-danger { color: var(--c-danger); border-color: var(--c-danger); }
}

.badge-bowl {
  margin-left: auto;
  font-size: 0.72rem;
  opacity: 0.8;
}

.badge-location {
  flex: 1;
  font-weight: bold;
  font-size: 0.78rem;
}

.badge-lingshi {
  background: var(--c-gold);
  color: var(--c-granite);
  padding: 1px 7px;
  font-weight: bold;
  font-size: 0.75rem;
}
</style>
