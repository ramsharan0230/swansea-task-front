<script lang="ts" setup>
const config = useRuntimeConfig();
const baseUrl = config.public.apiBaseUrl.replace('/api', ''); 

defineProps<{
  result: any;
  items: any[];
  laborHours: number;
  laborCost: number;
  fixedOverheads: number;
  ai_suggestions: string;
  reports: any[];
}>();

const { $axios } = useNuxtApp();
const emit = defineEmits(["export:pdf", "export:csv"]);
const showDropdown = ref(false);

function exportPdf() {
  emit("export:pdf");
}

function exportCsv() {
  emit("export:csv");
}

const dropdownRef = ref<HTMLElement | null>(null);
function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false;
  }
}
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="mt-6 p-4 bg-gray-100 rounded-md shadow space-y-4">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h3 class="text-lg font-semibold">Summary</h3>
      <div class="flex gap-2 relative" ref="dropdownRef">
        <button
          type="button"
          class="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded"
          @click="exportPdf"
        >
          Export PDF
        </button>
        <button
          type="button"
          class="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded"
          @click="exportCsv"
        >
          Export CSV
        </button>
        <!-- Dropdown toggle -->
        <button
          type="button"
          @click="showDropdown = !showDropdown"
          class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded inline-flex items-center"
        >
          Reports
          <svg
            class="w-2.5 h-2.5 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <!-- Dropdown content -->
        <div
          v-show="showDropdown"
          class="absolute right-0 top-10 z-10 w-44 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li v-for="(report, index) in reports" :key="index">
              <a
                :href="`${baseUrl}${report.url}`"
                :download="report.name"
                target="_blank"
                rel="noopener"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {{ report.name }} 
                <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                  {{ report.version }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <hr />

    <div>
      <h4 class="font-semibold mb-2">Product Breakdown</h4>
      <ul class="text-sm list-disc pl-5 space-y-1">
        <li v-for="(item, idx) in items" :key="idx">
          <strong>{{ item.selectedProduct }}</strong> — Qty: {{ item.quantity }},
          Cost: £{{ item.cost }}, Sell: £{{ item.sell }}
        </li>
      </ul>
    </div>

    <div class="text-sm">
      <p><strong>Labor Hours:</strong> {{ laborHours }}</p>
      <p><strong>Labor Cost per Hour:</strong> £{{ laborCost }}</p>
      <p><strong>Total Labor Cost:</strong> £{{ (laborHours * laborCost).toFixed(2) }}</p>
      <p><strong>Fixed Overheads:</strong> £{{ fixedOverheads }}</p>
    </div>

    <div class="text-sm">
      <p><strong>Total Gross Profit:</strong> £{{ result.grossProfit.toFixed(2) }}</p>
      <p><strong>Margin:</strong> {{ result.margin.toFixed(2) }}%</p>
      <p>
        <strong>Health:</strong>
        <span :class="result.healthClass">&nbsp;{{ result.health }}</span>
      </p>
    </div>

    <div class="mt-4">
      <h4 class="font-semibold">AI Suggestion</h4>
      <p class="italic text-gray-700 whitespace-pre-line">
        {{ ai_suggestions }}
      </p>
    </div>
  </div>
</template>
