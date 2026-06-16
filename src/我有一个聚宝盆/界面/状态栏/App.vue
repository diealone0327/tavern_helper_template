<template>
  <div class="status-bar">
    <TopBar />

    <div class="columns">
      <!-- Left Column -->
      <div class="column left">
        <PlayerStatus />

        <GongfaSection
          :open="panels.gongfa"
          @toggle="panels.gongfa = !panels.gongfa"
        />

        <ArtifactSection
          :open="panels.artifact"
          @toggle="panels.artifact = !panels.artifact"
        />

        <StorageBag
          :open="panels.storage"
          @toggle="panels.storage = !panels.storage"
        />
      </div>

      <!-- Right Column -->
      <div class="column right">
        <CharacterSection />

        <RelationList
          :open="panels.relations"
          @toggle="panels.relations = !panels.relations"
        />

        <QuestPanel
          :open="panels.quests"
          @toggle="panels.quests = !panels.quests"
        />

        <TreasureBasin />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useDataStore } from './store';

import TopBar from './components/TopBar.vue';
import PlayerStatus from './components/PlayerStatus.vue';
import GongfaSection from './components/GongfaSection.vue';
import ArtifactSection from './components/ArtifactSection.vue';
import StorageBag from './components/StorageBag.vue';
import CharacterSection from './components/CharacterSection.vue';
import RelationList from './components/RelationList.vue';
import QuestPanel from './components/QuestPanel.vue';
import TreasureBasin from './components/TreasureBasin.vue';

const store = useDataStore();

const panels = reactive({
  gongfa: false,
  artifact: false,
  storage: false,
  relations: false,
  quests: false,
});
</script>

<style scoped>
.status-bar {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  font-family: var(--font-body);
  color: var(--c-text-primary);
  background: var(--c-surface);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.columns {
  display: flex;
  gap: 1px;
  background: var(--c-surface-elevated);
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--c-surface);
}

.column.left {
  border-right: 1px solid var(--c-border);
}
</style>
