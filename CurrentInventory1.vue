<template>
  <section class="container">
    <h2>Current Inventory</h2>
    <ul>
      <li v-for="item in inventory" :key="item.id">
        <strong>{{ item.name }}</strong> — €{{ item.price }}  
        <em>({{ item.size }}, {{ item.category }})</em>  
        <p>{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CurrentInventory',
  data() {
    return {
      inventory: []
    };
  },
  methods: {
    async fetchInventory() {
      try {
        const response = await axios.get('http://localhost:3000/api/items');
        this.inventory = response.data;
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
      }
    }
  },
  created() {
    this.fetchInventory();
  }
};
</script>
