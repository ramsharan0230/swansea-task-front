<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  products: {
    type: Array as () => any[],
    required: true,
  },
  pagination: {
    type: Object,
    required: true,
  },
});
const startingIndex = computed(() => {
  return (props.pagination.currentPage - 1) * props.pagination.perPage;
});

defineEmits(["page-changed"]);
</script>
<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Product/Service List</h2>

    <table class="table-auto w-full border border-collapse">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">SN.</th>
          <th class="p-2 border">Name</th>
          <th class="p-2 border">MPN</th>
          <th class="p-2 border">SKU</th>
          <th class="p-2 border">Qty</th>
          <th class="p-2 border">Trade Price</th>
          <th class="p-2 border">Retail Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td class="p-2 border">{{ startingIndex + index + 1 }}.</td>
          <td class="p-2 border">{{ product.name }}</td>
          <td class="p-2 border">{{ product.mpn || "-" }}</td>
          <td class="p-2 border">{{ product.sku || "-" }}</td>
          <td class="p-2 border">{{ product.quantity }}</td>
          <td class="p-2 border">£{{ product.trade_price }}</td>
          <td class="p-2 border">£{{ product.retail_price }}</td>
        </tr>
        <tr v-if="products.length === 0">
          <td colspan="7" class="p-4 text-center border">No products found</td>
        </tr>
      </tbody>
    </table>

    <div class="mt-6 flex justify-between items-center">
      <button
        @click="$emit('page-changed', pagination.currentPage - 1)"
        :disabled="pagination.currentPage === 1"
        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span
        >Page {{ pagination.currentPage }} of {{ pagination.lastPage }}</span
      >

      <button
        @click="$emit('page-changed', pagination.currentPage + 1)"
        :disabled="pagination.currentPage === pagination.lastPage"
        class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>
