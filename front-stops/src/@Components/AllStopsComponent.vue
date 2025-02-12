<template>
  <div class="stops__container">
    <h1 class="stops__title">{{ title }}</h1>
    <div v-if="stops && stops.length" class="stops__wrapper">
      <SingleStopComponent
        v-for="stop in stops"
        :key="stop._id"
        :stop="stop"
        :buttonTitle="buttonTitle"
        :show-button="showButton(stop)"
        @open-stop-details="openStopDetails"
        @on-button-clicked="handleButtonClicked"
      />
    </div>
    <div v-else class="stops__no-stops">
      <p>No stops available.</p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import SingleStopComponent from './SingleStopComponent.vue';
import { SingleStopData } from "@/@Models/singleStopData";

export default defineComponent({
  name: 'AllStopsComponent',
  components: { SingleStopComponent },
  props: {
    stops: {
      type: Array as () => SingleStopData[],
      required: true,
    }, 
    buttonTitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    showButton: {
      type: Function as PropType<(stop: SingleStopData) => boolean>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const openStopDetails = (stop: any) => {
      emit('open-stop-details', stop);
    };

    const handleButtonClicked = (stop: any) => {
      emit('on-button-clicked', stop);
    };

    const stops = computed(() => props.stops);

    return {
      stops,
      openStopDetails,
      handleButtonClicked,
    };
  },
});
</script>

<style scoped>
.stops__container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 1200px;
  margin: 0 auto;
  padding: 8rem;
  font-family: 'Arial', sans-serif;
}

.stops__title {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.stops__wrapper {
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
}

.stops__no-stops {
  text-align: center;
  font-size: 18px;
  color: #777;
  margin-top: 30px;
}
</style>