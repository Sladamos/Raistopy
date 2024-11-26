<template>
  <div class="card">
    <div class="header">
      <h2 class="name">
        {{ stop.name }}
        <span v-if="stop.subname" class="subname">- {{ stop.subname }}</span>
      </h2>
    </div>
    <p class="id">{{ stop.id }}</p>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    name: 'SingleStopData',
    props: {
      stop: {
        type: Object as PropType<{ id: string; name: string; subname: string | null }>,
        required: true,
      },
    },
  });
  </script>
  
  <style>
  .card {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .name {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    color: #333;
  }
  
  .subname {
    font-size: 14px;
    color: #888;
    margin-left: 10px;
  }
  
  .id {
    font-size: 14px;
    color: #555;
    margin-top: 10px;
  }
  </style>