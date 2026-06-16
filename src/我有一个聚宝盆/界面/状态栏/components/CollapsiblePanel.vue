<template>
  <div class="panel" :class="{ open: model }">
    <div class="panel-header" @click="toggle">
      <span class="panel-title">{{ title }}</span>
      <span class="panel-count">{{ count }}</span>
      <span class="panel-arrow">{{ model ? '▾' : '▸' }}</span>
    </div>
    <div v-if="model" class="panel-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  count: number;
}>();

const model = defineModel<boolean>({ required: true });

function toggle() {
  model.value = !model.value;
}
</script>

<style lang="scss" scoped>
.panel {
  border-bottom: 2px solid var(--c-grey-olive);

  &:last-child {
    border-bottom: none;
  }
}

.panel-header {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  background: var(--c-mint-cream);
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;

  &:hover {
    background: var(--c-ash-grey);
  }
}

.panel.open .panel-header {
  background: var(--c-ash-grey);
}

.panel-title {
  flex: 1;
  font-weight: bold;
  font-size: 0.92rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.panel-count {
  background: var(--c-celadon);
  color: var(--c-granite);
  padding: 1px 7px;
  font-size: 0.72rem;
  font-weight: bold;
  margin-right: 8px;
}

.panel-arrow {
  font-size: 0.8rem;
  color: var(--c-grey-olive);
  width: 16px;
  text-align: center;
}

.panel-body {
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 1000px;
  }
}
</style>
