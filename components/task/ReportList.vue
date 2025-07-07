<script setup>
import { onMounted, ref } from "vue";
const { $axios } = useNuxtApp();
const exportedResults = ref([]);
const loading = ref(false);
const BACKEND_URL = "http://localhost:8000";

const downloadReportFile = async (reportId, fileName) => {
  loading.value = true;
  try {
    const response = await $axios.get(`${BACKEND_URL}${reportId}`, {
      responseType: "blob",
      validateStatus: (status) => status === 200,
    });

    if (!(response.data instanceof Blob)) {
      throw new Error("Invalid file data received");
    }

    const blob = new Blob([response.data]);
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    }, 100);
  } catch (error) {
    console.error("Download failed:", error);
    alert(`Error downloading file: ${error.message}`);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const { initDropdowns } = await import("flowbite");
  initDropdowns();

  try {
    const { data } = await $axios.get("/report/fetch-all");
    exportedResults.value = data.payload;
  } catch (error) {
    console.error("Failed to load reports:", error);
    alert("Could not load report list");
  }
});
</script>

<template>
  <div class="relative inline-block text-left ml-3">
    <button
      id="dropdownDividerButton"
      data-dropdown-toggle="dropdownDivider"
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
    >
      Reports
      <svg
        class="w-2.5 h-2.5 ml-2"
        aria-hidden="true"
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

    <!-- Dropdown menu -->
    <div
      id="dropdownDivider"
      class="z-10 hidden absolute mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDividerButton"
      >
        <!-- FIX: Use exportedResults instead of reports -->
        <li v-for="report in exportedResults" :key="report.id">
          <div
            class="flex p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <div class="ms-2 text-sm">
              <button
                @click="
                  downloadReportFile(
                    `/download-report/${report.id}`,
                    report.name
                  )
                "
                class="w-full text-left flex justify-between items-center"
                :disabled="loading"
              >
                <label
                  for="helper-radio-6"
                  class="font-medium text-gray-900 dark:text-gray-300"
                >
                  <div>{{ report.name }}</div>
                  <p
                    id="helper-radio-text-6"
                    class="text-xs font-normal text-gray-500 dark:text-gray-300"
                  >
                    Version: {{ report.version }}
                  </p>
                </label>
                <span v-if="loading" class="ml-2">
                  <svg
                    class="animate-spin h-4 w-4 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
