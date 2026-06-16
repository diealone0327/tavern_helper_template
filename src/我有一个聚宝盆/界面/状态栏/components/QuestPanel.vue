<template>
  <SectionPanel
    title="📋 任务"
    collapsible
    :open="open"
    @toggle="$emit('toggle')"
  >
    <div class="task-item">
      <span class="task-badge main">主线</span>
      <span class="task-text">{{ store.data.任务.当前主线 }}</span>
    </div>
    <div v-if="store.data.任务.当前支线" class="task-item">
      <span class="task-badge side">支线</span>
      <span class="task-text">{{ store.data.任务.当前支线 }}</span>
    </div>
    <div v-if="completedList.length > 0" class="task-item completed">
      <span class="task-badge done">已完成</span>
      <span class="task-text done">{{ completedList.join('、') }}</span>
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

const completedList = computed(() => {
  try {
    return JSON.parse(store.data.任务.已完成任务) as string[];
  } catch {
    return [];
  }
});
</script>

<style scoped>
.task-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 5px 0;
  border-bottom: 1px solid var(--c-border);
  font-size: 13px;
}
.task-item:last-child {
  border-bottom: none;
}
.task-badge {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  flex-shrink: 0;
  margin-top: 1px;
}
.task-badge.main {
  background: #3b5998;
  color: #fff;
}
.task-badge.side {
  background: #6b5b95;
  color: #fff;
}
.task-badge.done {
  background: #2d5a3d;
  color: var(--c-accent-green);
}
.task-text {
  color: var(--c-text-secondary);
}
.task-text.done {
  color: var(--c-text-dim);
  text-decoration: line-through;
}
</style>
