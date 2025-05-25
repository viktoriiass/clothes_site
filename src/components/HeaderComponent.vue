<template>
  <header>
    <h1><a href="/" style="text-decoration: none; color: #2c3e50;">Clothes Store Admin</a></h1>
    <div class="header-divider"></div>

    <div class="mobile-icons">
      <a href="#" class="cart-icon" @click="emit('toggleBasket')">🛒</a>
      <a href="#" class="login-icon">👤</a>
    </div>

    <nav class="site-nav">
      <div class="nav-container">
        <div class="nav-links">
          <a href="#inventory">Inventory Dashboard</a>
          <a href="/">Current page</a>
          <a href="/order_page.html">Customer Order Page</a>
        </div>
      </div>
    </nav>


    <div class="top-nav">
      <a href="#">Search</a>
      <a href="/login.html">Log in</a>
      <a href="#">Help</a>

      <div class="basket-icon" @click="emit('toggleBasket')">
        <span class="basket-icon-text">Basket</span>
        <span v-if="totalItems > 0" class="basket-count">({{ totalItems }})</span>
      </div>
    </div>
  </header>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps(['totalItems']);
// eslint-disable-next-line no-undef
const emit = defineEmits(['toggleBasket'])
</script>
