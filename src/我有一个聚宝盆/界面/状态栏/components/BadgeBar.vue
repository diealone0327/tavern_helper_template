<template>
  <div class="badge-bar">
    <div class="badge-left">
      <span class="badge-day">第 {{ store.data.世界.天数 }} 天</span>
      <span class="badge-realm">{{ store.data.主角.修为 }}<span class="progress">{{ progressDisplay }}</span></span>
    </div>
    <div class="badge-right">
      <span class="badge-location">{{ store.data.世界.地点 }}</span>
      <span v-if="store.data.世界.地区" class="badge-region">{{ store.data.世界.地区 }}</span>
      <span class="badge-lingshi">{{ store.data.主角.灵石 }} 灵石</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const progressDisplay = computed(() => {
  const progress = Number(store.data.主角.修为进度);
  if (isNaN(progress) || progress <= 0) return '';
  return progress >= 100 ? ' · 瓶颈' : ` · ${Math.round(progress)}%`;
});
</script>

<style lang="scss" scoped>
.badge-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: var(--c-granite);
  color: var(--c-mint-cream);
  font-size: 0.85rem;
  flex-wrap: wrap;
  gap: 4px;
}

.badge-left,
.badge-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.badge-day {
  font-weight: bold;
}

.badge-realm {
  .progress {
    color: var(--c-ash-grey);
    font-size: 0.75rem;
  }
}

.badge-location {
  font-weight: bold;
}

.badge-region {
  font-size: 0.75rem;
  color: var(--c-ash-grey);
}

.badge-lingshi {
  background: var(--c-gold);
  color: var(--c-granite);
  padding: 1px 6px;
  font-weight: bold;
  font-size: 0.75rem;
}
</style>
