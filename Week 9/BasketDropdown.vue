<template>
  <div class="header-wrapper">
    <div class="top-nav">
      <a href="#">Search</a>
      <a href="login.html">Log in</a>
      <a href="#">Help</a>

      <div class="basket-icon" @click="emit('toggleBasket')">
        <span class="basket-icon-text">Basket</span>
        <span v-if="basketItems.length > 0" class="basket-count">
          ({{ basketItems.reduce((sum, i) => sum + i.quantity, 0) }})
        </span>
      </div>

      <div class="basket-dropdown" :class="{ active: isBasketOpen }">
        <div class="basket-header">
          <h3>Your Basket</h3>
          <button class="close-basket" @click="emit('toggleBasket')">×</button>
        </div>

        <div v-if="lastAddedItem" class="basket-toast-message">
          {{ lastAddedItem.name }} added to basket
        </div>

        <div v-if="basketItems.length === 0" class="empty-basket">
          <p>Your basket is empty</p>
        </div>

        <ul v-else class="basket-items">
          <li
            v-for="(item, index) in basketItems"
            :key="item.id + '-' + item.size"
            class="basket-item"
          >
            <img
              v-if="item.image"
              :src="getImageUrl(item.image)"
              alt="Item image"
              class="basket-item-img"
            />
            <div class="basket-item-details">
              <h4>{{ item.name }}</h4>
              <p>Size: {{ item.size }}</p>
              <p>€{{ item.price }}</p>
              <div class="quantity-controls">
                <button @click="emit('updateQuantity', index, -1)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="emit('updateQuantity', index, 1)">+</button>
              </div>
            </div>
            <button class="remove-item" @click="emit('removeFromBasket', index)">×</button>
          </li>
        </ul>

        <div v-if="basketItems.length > 0" class="basket-footer">
          <div class="basket-total">
            <span>Total:</span>
            <span>€{{ totalPrice }}</span>
          </div>
          <a href="order_page.html" class="checkout-btn" role="button">Checkout</a>
        </div>
      </div>
    </div>
  </div>

  <div
    class="basket-overlay"
    :class="{ active: isBasketOpen }"
    @click="emit('toggleBasket')"
  ></div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['toggleBasket', 'removeFromBasket', 'updateQuantity']);

defineProps({
  items:Array,
  basketItems: Array,
  isBasketOpen: Boolean,
  lastAddedItem: Object,
  totalPrice: [String, Number]
});

function getImageUrl(path) {
  if (!path) return '';
  return path.startsWith('/uploads') ? 'http://localhost:3000' + path : path;
}
</script>

<style scoped>
.header-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

</style>
