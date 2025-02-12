<template>
  <div class="stop__card" @click="showDetails">
    <h3 class="stop__name">{{ stop.name }}</h3>
    <p class="stop__subName">{{ stop.subName }}</p>
    <button v-if="showButton" class="stop__action-button" @click.stop="buttonClicked">{{ buttonTitle }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SingleStopData } from "@/@Models/singleStopData";

export default defineComponent({
  name: 'SingleStopComponent',
  props: {
    stop: {
      type: Object as () => SingleStopData,
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
.stop__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 128px;
  padding: 16px;
  background-color: #0000aa;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stop__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.stop__name {
  font-size: 20px;
  font-weight: bold;
}

.stop__action-button {
  margin-top: 10px;
  padding: 8px 16px;
  color: white;
  background-color:  #991699;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.stop__action-button:hover {
  background-color: #aa16aa;
}
</style>
