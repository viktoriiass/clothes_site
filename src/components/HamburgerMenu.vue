<template>
  <div>
    <div class="hamburger-menu">
      <div class="hamburger-icon" @click="toggleMenu">☰</div>
    </div>

    <div class="catalog-menu" v-cloak :class="{ active: isOpen }">
      <h2>Item Catalog</h2>
      <ul>
        <li class="category-title">Shirts</li>
        <li><a href="#">T-Shirts</a></li>
        <li><a href="#">Formal Shirts</a></li>
        <li><a href="#">Casual Shirts</a></li>

        <li class="category-title">Pants</li>
        <li><a href="#">Jeans</a></li>
        <li><a href="#">Chinos</a></li>
        <li><a href="#">Shorts</a></li>

        <li class="category-title">Jackets</li>
        <li><a href="#">Denim Jackets</a></li>
        <li><a href="#">Winter Coats</a></li>
        <li><a href="#">Casual Jackets</a></li>

        <li class="category-title">Accessories</li>
        <li><a href="#">Belts</a></li>
        <li><a href="#">Ties</a></li>
        <li><a href="#">Socks</a></li>
      </ul>
    </div>

    <div class="overlay" :class="{ active: isOpen }" @click="closeMenu"></div>
  </div>
</template>

<script>
export default {
  name: 'HamburgerMenu',
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    }
  }
};
</script>
