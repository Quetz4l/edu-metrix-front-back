<script setup lang="ts">
import { ref, onMounted } from "vue";
import ChartRam from "./component/chart/ChartRam.vue";
import type { SystemInfo } from "./type/osTypes.ts";
import { bitsToGb } from "./utils/toGb.ts";
import ChartCpu from "./component/chart/ChartCpu.vue";

const systemInfo = ref<SystemInfo | null>(null);

async function fetchSystemInfo() {
  try {
    // const response = await fetch('http://localhost:2221');
    const response = await fetch("http://localhost:3000");
    systemInfo.value = await response.json();
  } catch (error) {
    console.error("Error fetching system info:", error);
  }
}

onMounted(fetchSystemInfo);
</script>

<template>
  <div v-if="systemInfo" class="p-4 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-center">System Information</h1>

    <div
      class="bg-white border-2 border-b-cyan-500 rounded-2xl text-black p-4 mb-4 shadow-md"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>Hostname:</strong> {{ systemInfo.hostname }}</p>
          <p><strong>Platform:</strong> {{ systemInfo.platform }}</p>
          <p><strong>Architecture:</strong> {{ systemInfo.arch }}</p>
        </div>
        <div>
          <p>
            <strong>Total ram:</strong>
            {{ bitsToGb(systemInfo.totalMemory) }} GB
          </p>
          <p><strong>Total cpu:</strong> {{ systemInfo.cpu.length }} core/s</p>
          <p>
            <strong>Uptime:</strong> {{ Math.floor(systemInfo.uptime / 3600) }}h
            {{ Math.floor(systemInfo.uptime % 60) }}m
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center w-full">
      <div
        class="bg-white border-2 border-cyan-500 rounded-2xl text-black p-4 shadow-md m-1"
      >
        <ChartRam
          :free-memory="systemInfo.freeMemory"
          :total-memory="systemInfo.totalMemory"
        />
      </div>

      <div
        class="bg-white border-2 border-cyan-500 rounded-2xl text-black p-4 shadow-md m-1 md:w-[30rem]"
      >
        <ChartCpu />
      </div>
    </div>
  </div>

  <div
    v-else
    class="bg-white text-black font-bold w-full h-screen flex justify-center items-center"
  >
    <span class="text-5xl">Something went wrong :c</span>
  </div>
</template>
