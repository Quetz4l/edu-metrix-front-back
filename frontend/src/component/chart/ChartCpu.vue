<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import Chart from "primevue/chart";
import type { Cpu } from "@/type/osTypes.ts";
import {config} from "@/utils/config.ts";

const cpuData = ref<Cpu[] | null>(null);
let interval: number | null = null;

const data = computed(() => {
  if (!cpuData.value) {
    return {};
  }

  const cpuUsage = getCpuUsage();

  return {
    labels: cpuData.value.map((_, index) => `Core ${index + 1}`),
    datasets: [
      {
        label: "CPU load",
        data: cpuUsage,
        backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0", "#FFCE56"],
        borderColor: ["#2E86C1", "#E55373", "#3DA8A8", "#E0B33D"],
        borderWidth: 1,
      },
    ],
  };
});

function getCpuUsage() {
  if (!cpuData.value) {
    return null;
  }

  return cpuData.value.map((cpu) => {
    const total =
      cpu.times.user +
      cpu.times.nice +
      cpu.times.sys +
      cpu.times.idle +
      cpu.times.irq;
    const nonIdle =
      cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.irq;
    const usagePercent = (nonIdle / total) * 100;
    return Number(usagePercent.toFixed(2));
  });
}
const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      title: {
        display: true,
        text: "Load (%)",
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
};

async function fetchCpuData() {
  try {
    const response = await fetch(`${config.url}/cpu`);

    const data = await response.json();
    cpuData.value = data.cpu;
  } catch (error) {
    console.error("Error fetching cpu info:", error);
  }
}

onMounted(() => {
  fetchCpuData();

  interval = setInterval(() => {
    fetchCpuData();
  }, 4000);
});
onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<template>
  <Chart type="bar" :data="data" :options="chartOptions" />
</template>

<style scoped></style>
