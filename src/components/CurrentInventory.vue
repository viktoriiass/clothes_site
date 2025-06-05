<template>
  <div>
    <h2 class="section-title">Current Inventory</h2>
    <div v-for="(items, category) in groupedByCategory" :key="category" class="category-wrapper">
      <h3 class="category-title">{{ category }}</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Size</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           <tr v-for="item in items" :key="item._id">
              <td>
                <img v-if="item.image" :src="getImageUrl(item.image)" alt="Item image" class="item-img" width="80" />
              </td>
              <td>
                {{ item.name }}<br />
                <small class="ref-label">Ref: {{ item._id }}</small>
              </td>
              <td class="description">{{ item.description }}</td>
              <td>{{ item.size }}</td>
              <td>
                €{{ item.price }}<span v-if="item.sale" class="sale-badge">Sale</span>
              </td>
              <td>
                <button class="add-to-basket-btn" @click="$emit('add-to-basket', item)">Add to Basket</button>
                <button class="remove-btn" @click="$emit('remove-btn', item)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CurrentInventory',
  emits: ['add-to-basket', 'delete-item', 'basket-updated'],
  props: {
    newItem: Object,
    items: Array
  },

  computed: {
    groupedByCategory() {
      return this.items.reduce((acc, item) => {
        const cat = item.category || 'Uncategorized';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
      }, {});
    }
  },


  methods: {
    getImageUrl(path) {
      if (!path) return '';
      return path.startsWith('/uploads') ? `http://localhost:3000${path}` : path;
    },
    async deleteItem(item) {
      try {
        await axios.delete(`http://localhost:3000/api/items/${item._id}`);
        await axios.delete(`http://localhost:3000/api/basket/${item._id}`, {
          params: { size: item.size }
        });

        this.$emit('delete-item', item);
      } catch (error) {
        console.error(' Failed to delete item:', error);
        alert('Failed to delete item');
      }
    },
    async addToBasket(item) {
      try {
        await axios.post('http://localhost:3000/api/basket', item);
        this.$emit('basket-updated');
      } catch (error) {
        console.error(' Failed to add to basket:', error);
      }
    }
  }
};
</script>


<style scoped>
.table-wrapper {
  overflow-x: auto;
  margin-bottom: 30px;
}

th,
td {
  padding: 10px 12px;
  vertical-align: top;
  text-align: left;
  border: none;
}

th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.description {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.description:hover {
  white-space: normal;
  background-color: #f2f2f2;
}

.item-img {
  width: 60px;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}

.category-title {
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.add-to-basket-btn {
  background-color: #3498db;
  color: white;
  font-weight: bold;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  margin-bottom: 5px;
  cursor: pointer;
}

.remove-btn {
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.ref-label {
  font-size: 0.75rem;
  color: #777;
}

.sale-badge {
  background-color: #f39c12;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-left: 5px;
}
</style>
