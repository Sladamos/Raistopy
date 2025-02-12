<template>
  <div v-if="stop" class="details__wrapper">
    <div class="details__header">
      <h2 class="details__stop-name">{{ stop.name }}</h2>
      <p class="details__stop-subName">{{ stop.subName }}</p>
    </div>

    <div class="map-container" style="height: 300px; width: 100%; margin-bottom: 20px;">
      <LMap :zoom="zoom" :center="mapCenter" :style="{ height: '100%' }" :options="{}">>
        <LTileLayer :url="tileUrl" />
        
        <LMarker :lat-lng="markerPosition">
          <LPopup>{{ stop.name }}</LPopup>
        </LMarker>
      </LMap>
    </div>

    <div class="details__body">
      <div class="details__item">
        <strong>Latitude:</strong> <span>{{ stop.latitude }}</span>
      </div>
      <div class="details__item">
        <strong>Longitude:</strong> <span>{{ stop.longitude }}</span>
      </div>
      <div class="details__item">
        <strong>Type:</strong> <span>{{ stop.type }}</span>
      </div>
      <div class="details__item" v-if="stop.zoneName">
        <strong>Zone Name:</strong> <span>{{ stop.zoneName }}</span>
      </div>
      <div class="details__item">
        <strong>On Demand:</strong> <span>{{ stop.onDemand ? 'Yes' : 'No' }}</span>
      </div>
    </div>

    <div class="details__footer">
      <button @click="closeDetails" class="details__close-button">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue3-leaflet';  
import 'leaflet/dist/leaflet.css';  
import L from 'leaflet';
import {SingleStopDetails} from "@/@Models/singleStopDetails";

export default defineComponent({
  name: 'StopDetailsComponent',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  props: {
    stop: {
      type: Object as () => SingleStopDetails,
      required: true,
    },
  },
  data() {
    return {
      zoom: 13,
      tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      mapOptions: {},
    };
  },
  computed: {
    mapCenter(): [number, number] {
      return [this.stop.latitude, this.stop.longitude];
    },
    markerPosition(): [number, number] {
      return [this.stop.latitude, this.stop.longitude];
    },
  },
  mounted() {
    L.Icon.Default.imagePath = 'https://unpkg.com/leaflet/dist/images';
  },
  methods: {
    closeDetails() {
      this.$emit('close');
    },
  },
});
</script>

<style scoped>
.map-container {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.details__wrapper {
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
  text-align: left;
}

.details__header {
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 16px;
  margin-bottom: 16px;
}

.details__stop-name {
  font-size: 28px;
  font-weight: bold;
}

.details__stop-subName {
  color: #555;
  font-size: 18px;
}

.details__body .details__item {
  margin: 12px 0;
  font-size: 16px;
}

.details__footer {
  text-align: center;
  margin-top: 20px;
}

.details__close-button {
  background-color:  #991699;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.details__close-button:hover {
  background-color: #661666;
}
</style>
