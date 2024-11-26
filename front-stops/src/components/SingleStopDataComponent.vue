<!-- SingleStopDataComponent.vue -->
<template>
  <div class="stop-card" @click="showDetails">
    <h3 class="stop-name">{{ stop.name }}</h3>
    <p class="stop-subname">{{ stop.subName }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SingleStopData',
  props: {
    stop: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showDetails() {
      this.$emit('open-stop-details', this.stop);
    },
  },
});
</script>

<style scoped>
.stop-card {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stop-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.stop-name {
  font-size: 20px;
  font-weight: bold;
}

.stop-subname {
  color: #555;
}
</style>
