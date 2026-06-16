<template>
  <div class="panel" :class="{ collapsible }">
    <div
      v-if="collapsible"
      class="panel-title clickable"
      @click="$emit('toggle')"
    >
      <span class="title-text">{{ title }}</span>
      <span v-if="badge !== undefined && badge !== null" class="badge">{{ badge }}</span>
      <span class="toggle-arrow">{{ open ? '▲' : '▼' }}</span>
    </div>
    <div v-else class="panel-title">
      <span class="title-text">{{ title }}</span>
    </div>
    <template v-if="!collapsible || open">
      <div v-if="empty" class="empty-state">
        <slot name="empty">
          <span class="empty-text">{{ emptyText }}</span>
        </slot>
      </div>
      <div v-else class="panel-body">
        <slot />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  collapsible?: boolean;
  open?: boolean;
  badge?: number | string | null | undefined;
  empty?: boolean;
  emptyText?: string;
}>();

defineEmits<{
  toggle: [];
}>();
</script>

<style scoped>
.panel {
  background: var(--c-surface-elevated);
  padding: 12px 14px;
}
.panel-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--c-text-secondary);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.panel-title.clickable {
  cursor: pointer;
  user-select: none;
}
.panel-title.clickable:hover {
  color: var(--c-primary);
}
.title-text {
  flex: 1;
}
.toggle-arrow {
  font-size: 11px;
  color: var(--c-text-dim);
}
.badge {
  background: var(--c-border-light);
  color: var(--c-text-secondary);
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 8px;
}
.panel-body {
  padding-top: 0;
}
.empty-state {
  text-align: center;
  color: var(--c-text-dim);
  padding: 12px;
  font-style: italic;
  font-size: 13px;
}
</style>
