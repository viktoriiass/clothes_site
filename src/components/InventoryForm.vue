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
        description: '',
        price: '',
        category: '',
        size: '',
        imageFile: null
      }
    };
  },
  methods: {
    handleImage(event) {
      this.form.imageFile = event.target.files[0] || null;
    },
    resetForm() {
      this.form = {
        name: '',
        description: '',
        price: '',
        category: '',
        size: '',
        imageFile: null
      };
    },
    async submitItem() {
      if (!this.form.name.trim()) {
        alert('Name is required.');
        return;
      }
      const numericPrice = parseFloat(this.form.price);
      if (isNaN(numericPrice) || numericPrice < 0) {
        alert('Price must be a valid non-negative number.');
        return;
      }
      if (!this.form.category) {
        alert('Category is required.');
        return;
      }
      if (!this.form.size) {
        alert('Size is required.');
        return;
      }
      if (!this.form.imageFile) {
        alert(' An image file is required.');
        return;
      }

      const formData = new FormData();
      formData.append('name', this.form.name.trim());
      formData.append('description', this.form.description.trim());
      formData.append('price', numericPrice);
      formData.append('category', this.form.category);
      formData.append('size', this.form.size);
      formData.append('image', this.form.imageFile);

      try {
        const response = await axios.post(
          'http://localhost:3000/api/items',
        );

        alert(`Item added: ${response.data.name}`);
        this.$emit('item-added', response.data);
        this.resetForm();
      } catch (error) {
        console.error(' Failed to add item:', error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          alert(` ${error.response.data.error}`);
        } else {
          alert('An unknown error occurred while adding the item.');
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin: 2rem auto;
}
.form-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
label {
  display: block;
}
button {
  margin-top: 1rem;
}
</style>

