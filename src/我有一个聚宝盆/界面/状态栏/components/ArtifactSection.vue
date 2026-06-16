<template>
  <SectionPanel
    title="🔮 随身法宝"
    collapsible
    :open="open"
    :badge="hasArtifact ? 1 : undefined"
    @toggle="$emit('toggle')"
  >
    <div v-if="hasArtifact" class="artifact-content">
      <div class="artifact-row">
        <span class="stat-value gold">{{ store.data.主角.随身法宝 }}</span>
      </div>
    </div>
  </SectionPanel>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';
import SectionPanel from './SectionPanel.vue';

defineProps<{ open: boolean }>();
defineEmits<{ toggle: [] }>();

const store = useDataStore();
const hasArtifact = computed(() =>
  store.data.主角.随身法宝 && store.data.主角.随身法宝 !== '无'
);
</script>

<style scoped>
.artifact-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 4px 0;
}
.artifact-row {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0;
  font-size: 13px;
}
.gold { color: var(--c-primary); }
</style>
