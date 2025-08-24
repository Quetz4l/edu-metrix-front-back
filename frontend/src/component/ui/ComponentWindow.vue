<script setup lang="ts">
import ChartRam from "@/component/chart/ChartRam.vue";

defineProps({
  componetn
})
</script>

<template>
  <div
    class="bg-white border-2 border-cyan-500 rounded-2xl text-black p-4 shadow-md m-1"
  >
    <ChartRam
      :free-memory="systemInfo.freeMemory"
      :total-memory="systemInfo.totalMemory"
    />
  </div>

</template>

<style scoped>

</style>