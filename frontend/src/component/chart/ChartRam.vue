<script setup lang="ts">
import { ref } from "vue";
import Chart from "primevue/chart";
import { bitsToGb } from "../../utils/toGb.ts";

const props = defineProps({
  freeMemory: {
    type: Number,
    required: false,
    default: 0,
  },
  totalMemory: {
    type: Number,
    required: false,
    default: 0,
  },
});

const data = ref({
  labels: ["Free Memory", "Used Memory"],
  datasets: [
    {
      label: "Memory Usage (GB)",
      data: [
        bitsToGb(props.freeMemory),
        bitsToGb(props.totalMemory - props.freeMemory),
      ],
      backgroundColor: ["#66BB6A", "#42A5F5"],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "System Memory Usage",
    },
  },
});
</script>

<template>
  <Chart type="doughnut" :data="data" :options="chartOptions" />
</template>

<style scoped></style>
