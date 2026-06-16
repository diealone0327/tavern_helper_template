<template>
  <SectionPanel title="📊 主角">
    <div class="stats">
      <StatRow label="修为" :value="store.data.主角.修为" color="gold" />
      <StatRow label="修为进度" :value="store.data.主角.修为进度 + '/100'" />
      <StatRow label="灵根" :value="store.data.主角.灵根" />
      <StatRow label="体质" :value="store.data.主角.体质 || '无'" color="blue" />
      <StatRow label="战斗状态" :value="store.data.主角.战斗状态 || '正常'" />
      <StatRow label="穿着" :value="store.data.主角.穿着" />
      <StatRow label="灵石" color="gold">
        🪙 {{ store.data.主角.灵石 }}
      </StatRow>
    </div>
  </SectionPanel>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';
import SectionPanel from './SectionPanel.vue';
import StatRow from './StatRow.vue';

const store = useDataStore();
</script>

<style scoped>
.stats {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
