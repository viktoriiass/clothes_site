<template>
  <div id="basket-app">
    <HeaderComponent />
    <HamburgerMenu />
    <BasketDropdown
       ref="basketDropdown"
      :basketItems="basketItems"
      :totalItems="totalItems"
      :totalPrice="totalPrice"
      :isBasketOpen="isBasketOpen"
      :lastAddedItem="lastAddedItem"
      @toggleBasket="toggleBasket"
      @removeFromBasket="(index) => removeFromBasket(index)"
      @updateQuantity="updateQuantity"
    />

    <BannerSection />
    <CatalogGrid />

    <main id="inventory-app">
      <InventoryForm @add-to-inventory="addToInventory" />
      <section>
        <CurrentInventory
          :items="inventoryItems"
          :key="inventoryItems.map(i => i.id).join(',')"
          @add-to-basket="addToBasket"
          @delete-item="refreshEverything"
          @basket-updated="refreshBasket"
        />
      </section>
    </main>

    <FooterComponent />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

import HeaderComponent from './components/HeaderComponent.vue';
import HamburgerMenu from './components/HamburgerMenu.vue';
import BasketDropdown from './components/BasketDropdown.vue';
import BannerSection from './components/BannerSection.vue';
import CatalogGrid from './components/CatalogGrid.vue';
import InventoryForm from './components/InventoryForm.vue';
import CurrentInventory from './components/CurrentInventory.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    HamburgerMenu,
    BasketDropdown,
    BannerSection,
    CatalogGrid,
    InventoryForm,
    CurrentInventory,
    FooterComponent
  },
  setup() {
    const basketItems = ref([]);
    const isBasketOpen = ref(false);
    const lastAddedItem = ref(null);
    const inventoryItems = ref([]);
    let hideTimeout = null;

    const fetchBasket = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/basket');
        basketItems.value = res.data;

        //  Sort by addedAt
        basketItems.value.sort((a, b) => a.addedAt - b.addedAt);
      } catch (error) {
        console.error(' Failed to fetch basket:', error);
      }
    };

    const fetchInventory = async () => {
      const res = await axios.get('http://localhost:3000/api/items');
      inventoryItems.value = res.data;
    };

    const refreshBasket = () => fetchBasket();
    const refreshEverything = () => {
      fetchBasket();
      fetchInventory();
    };

    onMounted(() => {
      refreshEverything();
    });

    const totalItems = computed(() =>
      basketItems.value.reduce((total, item) => total + item.quantity, 0)
    );

    const totalPrice = computed(() =>
      basketItems.value.reduce((total, item) => {
        const price = parseFloat(item.price);
        return total + (isNaN(price) ? 0 : price * item.quantity);
      }, 0).toFixed(2)
    );

    const toggleBasket = () => {
      isBasketOpen.value = !isBasketOpen.value;
    };

    const addToBasket = async (item) => {
      try {
        await axios.post('http://localhost:3000/api/basket', item);
        await fetchBasket();
        lastAddedItem.value = item;
        isBasketOpen.value = true;

        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
          lastAddedItem.value = null;
          isBasketOpen.value = false;
        }, 2000);
      } catch (error) {
        console.error(' Failed to add to basket:', error);
      }
    };

    const removeFromBasket = async (index) => {
      const item = basketItems.value[index];
      try {
        await axios.delete(`http://localhost:3000/api/basket/${item.id}?size=${item.size}`);
        await fetchBasket();
      } catch (error) {
        console.error(' Failed to remove from basket:', error);
      }
    };

    const updateQuantity = async (index, change) => {
    const item = basketItems.value[index];
    const newQty = item.quantity + change;

    console.log(' updateQuantity()', item, '→ new qty:', newQty); // Debug

    if (newQty <= 0) {
      await removeFromBasket(index);
    } else {
      try {
        const cleanSize = String(item.size).split(':')[0]; // Clean size (e.g., 'S')

        await axios.put(
          `http://localhost:3000/api/basket/${item.id}?size=${cleanSize}`,
          { quantity: newQty }
        );

        await fetchBasket();
      } catch (err) {
        console.error(' Failed to update quantity:', err.response?.data || err.message);
      }
    }
  };


    const addToInventory = async (item) => {
      try {
        const res = await axios.post('http://localhost:3000/api/items', item);
        const addedItem = res.data;

        // Append item manually to force reactivity
        inventoryItems.value = [...inventoryItems.value, addedItem];

      } catch (err) {
        console.error('❌ Failed to add to inventory:', err);
      }
    };

    const deleteFromInventory = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/items/${id}`);
        inventoryItems.value = inventoryItems.value.filter(item => item.id != id);

        const itemsToRemove = basketItems.value.filter(item => item.id == id);
        for (const item of itemsToRemove) {
          await axios.delete(`http://localhost:3000/api/basket/${item.id}?size=${item.size}`);
        }

        await fetchBasket();
        console.log(`Item ${id} removed from inventory and basket`);
      } catch (error) {
        console.error(' Failed to delete item:', error);
      }
    };

    return {
      basketItems,
      inventoryItems,
      isBasketOpen,
      lastAddedItem,
      totalItems,
      totalPrice,
      toggleBasket,
      addToBasket,
      removeFromBasket,
      updateQuantity,
      addToInventory,
      deleteFromInventory,
      refreshBasket,
      refreshEverything
    };
  }
};
</script>



<style>
@import './assets/stylesheet.css';
</style>

