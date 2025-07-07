<script lang="ts" setup>
import { ref, onMounted } from "vue";
import QuotationSummary from "./QuotationSummary.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { useQuote } from "@/composables/useQuote";
import Products from "./Products.vue";
const loading = ref(false);

const { $axios } = useNuxtApp();
const { calculateQuote } = useQuote();
const { exportReport } = useQuoteExport($axios, loading);

const allProducts = ref<any[]>([]);
const items = ref<any[]>([]);

const laborHours = ref(0);
const laborCost = ref(0);
const fixedOverheads = ref(0);
const targetMargin = ref(0);

const result = ref<any>(null);
const ai_suggestions = ref<string>("");

const suggestion_loader = ref(false);

onMounted(async () => {
  const { data } = await $axios.get("/products");
  allProducts.value = data.payload;
});

function addItem() {
  items.value.push({
    selectedProduct: null,
    quantity: 1,
    cost: 0,
    sell: 0,
  });
}

function removeItem(index: number) {
  items.value.splice(index, 1);
}

function onProductChange(item: any) {
  const product = allProducts.value.find(
    (p) => p.name === item.selectedProduct
  );
  if (product) {
    item.cost = parseFloat(product.trade_price);
    item.sell = parseFloat(product.retail_price);
  }
}

async function handleSubmit() {
  const { grossProfit, margin, health, healthClass } = calculateQuote(
    items.value,
    laborHours.value,
    laborCost.value,
    fixedOverheads.value,
    targetMargin.value
  );

  result.value = { grossProfit, margin, health, healthClass };

  try {
    suggestion_loader.value = true;
    const { data } = await $axios.post("/suggestion", {
      selectedItems: items.value,
      allProducts: allProducts.value,
      laborHours: laborHours.value,
      laborCost: laborCost.value,
      fixedOverheads: fixedOverheads.value,
      targetMargin: targetMargin.value,
      grossProfit,
      margin,
    });
    ai_suggestions.value = data.payload;
  } catch (err) {
    console.error("Suggestion error:", err);
  } finally {
    suggestion_loader.value = false;
  }
}

const exportPdf = () => {
  exportReport("pdf", {
    selectedItems: items.value,
    allProducts: allProducts.value,
    laborHours: laborHours.value,
    laborCost: laborCost.value,
    fixedOverheads: fixedOverheads.value,
    targetMargin: targetMargin.value,
    ai_suggestions: ai_suggestions.value,
  });
};

const exportCsv = () => {
  exportReport("csv", {
    selectedItems: items.value,
    allProducts: allProducts.value,
    laborHours: laborHours.value,
    laborCost: laborCost.value,
    fixedOverheads: fixedOverheads.value,
    targetMargin: targetMargin.value,
    ai_suggestions: ai_suggestions.value,
  });
};
</script>

<template>
  <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div class="lg:col-span-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Product List -->
        <div>
          <h2 class="text-xl font-semibold mb-2">Product/Service List</h2>
          <div
            v-for="(item, index) in items"
            :key="index"
            class="grid grid-cols-6 gap-2 mb-3 items-center"
          >
            <div class="col-span-2">
              <label class="block text-sm font-medium mb-1">Product</label>
              <select
                v-model="item.selectedProduct"
                @change="onProductChange(item)"
                class="input w-full"
              >
                <option disabled value="">Select Product</option>
                <option v-for="p in allProducts" :key="p.name" :value="p.name">
                  {{ p.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Cost (£)</label>
              <input
                v-model.number="item.cost"
                type="number"
                step="any"
                class="input w-full"
                placeholder="Cost"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Sell (£)</label>
              <input
                v-model.number="item.sell"
                type="number"
                step="any"
                class="input w-full"
                placeholder="Sell"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Qty</label>
              <input
                v-model.number="item.quantity"
                type="number"
                class="input w-full"
                placeholder="Qty"
              />
            </div>
            <div class="flex items-end">
              <button
                type="button"
                @click="removeItem(index)"
                class="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
          <button
            type="button"
            @click="addItem"
            class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none"
          >
            + Add Product
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1">Labor Hours</label>
            <input
              v-model.number="laborHours"
              type="number"
              class="input w-full"
              placeholder="Estimated Labor Hours"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1"
              >Labor Cost/Hour (£)</label
            >
            <input
              v-model.number="laborCost"
              type="number"
              class="input w-full"
              placeholder="Cost per Hour"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1"
              >Fixed Overheads (£)</label
            >
            <input
              v-model.number="fixedOverheads"
              type="number"
              class="input w-full"
              placeholder="Fixed Overheads"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1"
              >Target Profit Margin (%)</label
            >
            <input
              v-model.number="targetMargin"
              type="number"
              class="input w-full"
              placeholder="Target Margin (%)"
            />
          </div>
        </div>

        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Calculate Profit
        </button>

        <!-- download reports with different versions -->
        <task-report-list />
        <!-- ends -->

        <div class="text-center my-4" v-if="loading">
          <pulse-loader :loading="loading" color="#3498db" size="15px" />
        </div>

        <div class="text-center my-4" v-if="suggestion_loader">
          <pulse-loader
            :loading="suggestion_loader"
            color="#3498db"
            size="15px"
          />
        </div>
        <QuotationSummary
          v-else
          v-if="result"
          :result="result"
          :items="items"
          :labor-hours="laborHours"
          :labor-cost="laborCost"
          :fixed-overheads="fixedOverheads"
          :ai_suggestions="ai_suggestions"
          @export:pdf="exportPdf"
          @export:csv="exportCsv"
        />
      </form>
    </div>
    <div class="lg:col-span-4 border-l border-gray-300 pl-6">
      <Products :products="allProducts"></Products>
    </div>
  </div>
</template>
