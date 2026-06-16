<template>
  <SectionPanel title="👤 在场角色">
    <div v-if="store.data.关系.当前互动对象" class="char-section">
      <div class="char-name">{{ store.data.关系.当前互动对象 }}</div>
      <AffinityBar
        label="好感度"
        :value="store.data.关系.当前角色好感度"
        :tag="store.data.关系.当前角色关系标签 || undefined"
      />
      <div v-if="hasRealmOrConstitution" class="char-sub">
        <span v-if="store.data.关系.当前角色修为">
          修为 {{ store.data.关系.当前角色修为 }}
        </span>
        <span v-if="store.data.关系.当前角色体质">
          体质 {{ store.data.关系.当前角色体质 }}
        </span>
      </div>
      <div v-else class="char-sub dim">修为 未知 · 体质 无</div>
      <div v-if="store.data.关系.当前角色状态描述" class="char-state">
        {{ store.data.关系.当前角色状态描述 }}
      </div>
    </div>
  </SectionPanel>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';
import SectionPanel from './SectionPanel.vue';
import AffinityBar from './AffinityBar.vue';

const store = useDataStore();

const hasRealmOrConstitution = computed(() =>
  store.data.关系.当前角色修为 || store.data.关系.当前角色体质
);
</script>

<style scoped>
.char-section {
  text-align: center;
}
.char-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--c-primary);
  margin-bottom: 8px;
}
.char-sub {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 6px;
  font-size: 12px;
}
.char-sub.dim {
  color: var(--c-text-dim);
}
.char-state {
  margin-top: 6px;
  font-size: 12px;
  color: #a0a4c0;
  font-style: italic;
  background: var(--c-surface-hover);
  padding: 4px 8px;
  border-radius: 6px;
}
</style>
