<template>
  <section class="container">
    <h2 class="form-title">Add New Inventory Item</h2>
    <form @submit.prevent="submitItem">
      <label>
        Name:
        <input v-model="form.name" type="text" placeholder="Item name" required />
      </label>

      <label>
        Description:
        <textarea v-model="form.description" placeholder="Item description" required></textarea>
      </label>

      <label>
        Price (€):
        <input v-model="form.price" type="text" id="item-price" placeholder="Enter item price here...">
      </label>

      <label>
        Category:
        <select v-model="form.category" id="category" required>
          <option disabled value="">Select category</option>
          <option value="Shirt">Shirt</option>
          <option value="Jeans">Jeans</option>
          <option value="Jackets">Jackets</option>
          <option value="Accessories">Accessories</option>
        </select>
      </label>

      <label for="size">
        Size:
        <select v-model="form.size" id="size" required>
          <option disabled value="">Select size</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </label>

      <label>
        Image:
        <input type="file" accept="image/*" @change="handleImage" />
      </label>

      <button type="submit">Add to Inventory</button>
    </form>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InventoryForm',
  data() {
    return {
      form: {
        name: '',
        price: '',
        size: '',
        category: '',
        description: ''
      },
      imageFile: null
    };
  },
  methods: {
    async submitItem() {
      try {
        const newItem = {
          name: this.form.name,
          price: parseFloat(this.form.price),
          size: this.form.size,
          category: this.form.category,
          description: this.form.description
          // imageFile can be sent later if needed
        };

        const response = await axios.post('http://localhost:3000/api/items', newItem);
        alert(`✅ Item added: ${response.data.name}`);

        // Reset form fields
        this.form.name = '';
        this.form.price = '';
        this.form.size = '';
        this.form.category = '';
        this.form.description = '';
        this.imageFile = null;

        // Notify parent
        this.$emit('item-added', response.data);
      } catch (error) {
        console.error('Failed to add item:', error);
        alert('❌ Failed to add item');
      }
    },
    handleImage(event) {
      this.imageFile = event.target.files[0];
    }
  }
};
</script>
