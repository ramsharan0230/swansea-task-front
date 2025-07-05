<script setup lang="ts">
defineProps<{
  products: any[];
}>();

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
          <td class="p-2 border">{{ index + 1 }}.</td>
          <td class="p-2 border">{{ product.name }}</td>
          <td class="p-2 border">{{ product.mpn || "-" }}</td>
          <td class="p-2 border">{{ product.sku || "-" }}</td>
          <td class="p-2 border">{{ product.quantity }}</td>
          <td class="p-2 border">£{{ product.trade_price }}</td>
          <td class="p-2 border">£{{ product.retail_price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
