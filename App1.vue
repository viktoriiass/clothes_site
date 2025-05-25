<template>
  <div class="app-container">
    <h1>Clothes Store</h1>
    <InventoryForm @item-added="refreshInventory" />
    <CurrentInventory ref="inventoryRef" />
  </div>
</template>

<script>
import InventoryForm from './components/InventoryForm.vue';
import CurrentInventory from './components/CurrentInventory.vue';

export default {
  name: 'App',
  components: {
    InventoryForm,
    CurrentInventory
  },
  methods: {
    refreshInventory() {
      this.$refs.inventoryRef.fetchInventory();
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
.container {
  margin: 1rem auto;
  padding: 1rem;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
input, textarea, select {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
}
</style>
