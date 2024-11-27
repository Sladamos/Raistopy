<template>
  <div class="stop-card" @click="showDetails">
    <h3 class="stop-name">{{ stop.name }}</h3>
    <p class="stop-subname">{{ stop.subName }}</p>
    <button v-if="showButton" class="action-button" @click.stop="buttonClicked">{{ buttonTitle }}</button>
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
    buttonTitle: {
      type: String,
      required: true,
    },
    showButton: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    showDetails() {
      this.$emit('open-stop-details', this.stop);
    },
    buttonClicked() {
      this.$emit('on-button-clicked', this.stop);
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

.action-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.action-button:hover {
  background-color: #0056b3;
}
</style>
