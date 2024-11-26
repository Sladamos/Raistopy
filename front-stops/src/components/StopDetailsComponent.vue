<!-- StopDetailsComponent.vue -->
<template>
    <div v-if="stop" class="stop-details">
      <div class="details-header">
        <h2 class="stop-name">{{ stop.name }}</h2>
        <p class="stop-subname">{{ stop.subName }}</p>
      </div>
  
      <div class="details-body">
        <div class="detail-item">
          <strong>Latitude:</strong> <span>{{ stop.latitude }}</span>
        </div>
        <div class="detail-item">
          <strong>Longitude:</strong> <span>{{ stop.longitude }}</span>
        </div>
        <div class="detail-item">
          <strong>Type:</strong> <span>{{ stop.type }}</span>
        </div>
        <div class="detail-item" v-if="stop.zoneName">
          <strong>Zone Name:</strong> <span>{{ stop.zoneName }}</span>
        </div>
        <div class="detail-item">
          <strong>On Demand:</strong> <span>{{ stop.onDemand ? 'Yes' : 'No' }}</span>
        </div>
      </div>
  
      <div class="details-footer">
        <button @click="closeDetails" class="btn-close">Close</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'StopDetailsComponent',
    props: {
      stop: {
        type: Object,
        required: true,
      },
    },
    methods: {
      closeDetails() {
        this.$emit('close');
      },
    },
  });
  </script>
  
  <style scoped>
  .stop-details {
    background-color: #fff;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 20px auto;
    text-align: left;
  }
  
  .details-header {
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  
  .stop-name {
    font-size: 28px;
    font-weight: bold;
  }
  
  .stop-subname {
    color: #555;
    font-size: 18px;
  }
  
  .details-body .detail-item {
    margin: 12px 0;
    font-size: 16px;
  }
  
  .details-footer {
    text-align: center;
    margin-top: 20px;
  }
  
  .btn-close {
    background-color: #ff6347;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .btn-close:hover {
    background-color: #e5533b;
  }
  </style>
  