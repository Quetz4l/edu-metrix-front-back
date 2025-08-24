<script setup lang="ts">
import ChartRam from "@/component/chart/ChartRam.vue";
import ChartCpu from "@/component/chart/ChartCpu.vue";
import type { SystemInfo } from "./type/osTypes.ts";
import { ref, onMounted } from "vue";
import { bitsToGb } from "@/utils/toGb.ts";
import { config } from "@/utils/config.ts";

const systemInfo = ref<SystemInfo | null>(null);
const hostname = import.meta.env.VITE_HOSTNAME || 'unknown';


async function loadSystemInfo() {
  try {
    const response = await fetch(config.url);
    systemInfo.value = await response.json();
  } catch (error) {
    console.error("Failed to load system info:", error);
  }
}

onMounted(loadSystemInfo);
</script>

<template>
  <div v-if="systemInfo" class="p-4 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-center">System metrics</h1>

    <div class="bg-white border-2 border-cyan-500 rounded-2xl p-4 mb-4 shadow-md text-black">
      <p><strong>Web server:</strong> {{hostname}}</p>
    </div>

    <div class="bg-white border-2 border-cyan-500 rounded-2xl p-4 mb-4 shadow-md">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
        <div>
          <p><strong>Hostname:</strong> {{ systemInfo.hostname }}</p>
          <p><strong>Platform:</strong> {{ systemInfo.platform }}</p>
          <p><strong>Architecture:</strong> {{ systemInfo.arch }}</p>
        </div>
        <div>
          <p><strong>Total RAM:</strong> {{ bitsToGb(systemInfo.totalMemory) }} GB</p>
          <p><strong>Total CPU:</strong> {{ systemInfo.cpu.length }} core/s</p>
          <p>
            <strong>Uptime:</strong> {{ Math.floor(systemInfo.uptime / 3600) }}h
            {{ Math.floor(systemInfo.uptime % 60) }}m
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-center gap-4">
      <div class="bg-white border-2 border-cyan-500 rounded-2xl p-4 shadow-md">
        <ChartRam :free-memory="systemInfo.freeMemory" :total-memory="systemInfo.totalMemory" />
      </div>
      <div class="bg-white border-2 border-cyan-500 rounded-2xl p-4 shadow-md md:w-[30rem]">
        <ChartCpu />
      </div>
    </div>
  </div>

  <div v-else class="bg-white text-black font-bold w-full h-screen flex justify-center items-center">
    <span class="text-5xl">Error :c</span>
  </div>
</template>