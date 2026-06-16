<template>
  <SectionPanel title="🏺 聚宝盆">
    <div class="stats">
      <StatRow label="今日已使用">
        {{ store.data.聚宝盆.今日已使用 ? '✅ 是' : '❌ 否' }}
      </StatRow>
      <StatRow label="已用次数" :value="store.data.聚宝盆.已用次数" />
      <StatRow label="孳生品级" :value="store.data.聚宝盆.孳生品级" color="gold" />
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
