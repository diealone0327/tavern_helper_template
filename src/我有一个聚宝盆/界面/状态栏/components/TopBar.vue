<template>
  <div class="top-bar">
    <div class="top-line">
      <span>📍 {{ store.data.世界.地点 }}</span>
      <span class="sep">|</span>
      <span>🗺️ {{ store.data.世界.地区 }}</span>
      <span class="sep">|</span>
      <span>📅 第 {{ store.data.世界.天数 }} 天</span>
    </div>
    <div class="title-row">
      <span class="title">✨ 我有一个聚宝盆</span>
      <span class="event-tag">📌 {{ store.data.世界.事件标记 || '—' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style scoped>
.top-bar {
  background: var(--c-gradient-header);
  padding: 10px 20px 10px;
  border-bottom: 2px solid var(--c-border-light);
}
.top-line {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--c-text-muted);
  margin-bottom: 6px;
}
.top-line .sep {
  color: var(--c-border-light);
}
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 20px;
  font-weight: 700;
  color: var(--c-primary);
  letter-spacing: 1px;
}
.event-tag {
  font-size: 13px;
  color: #a0a4c0;
  max-width: 55%;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
