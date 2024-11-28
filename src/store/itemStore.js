// code by [Risqi]
import { defineStore } from 'pinia'
import apiClient from '@/plugins/axios'
export const useItemStore = defineStore('item', {
  state: () => ({
    items: [],
  }),
  actions: {
    async fetchItems() {
      try {
        const response = await apiClient.get('/items')
        this.items = response.data
        console.log('Fetched items:', this.items)
      } catch (error) {
        console.error('Failed to fetch items:', error)
      }
    },
    async addItem(item) {
      try {
        const response = await apiClient.post('/items', item)
        this.items.push(response.data)
      } catch (error) {
        console.error('Failed to add item:', error.message)
      }
    },
    async updateItem(item) {
      try {
        const response = await apiClient.patch(`/items/${item.id}`, item)
        const index = this.items.findIndex((i) => i.id === item.id)
        if (index !== -1) {
          this.items.splice(index, 1, response.data)
        }
      } catch (error) {
        console.error('Failed to update item:', error)
      }
    },
    async deleteItem(id) {
      try {
        await apiClient.delete(`/items/${id}`)
        this.items = this.items.filter((item) => item.id !== id)
      } catch (error) {
        console.error('Failed to delete item:', error)
      }
    }
  },
  persist: true,
});
