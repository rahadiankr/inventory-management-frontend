<template>
    <div class="item-list">
        <div class="header">
            <h2>Daftar Barang</h2>
            <button class="add-btn" @click="showAddForm">Tambah Item</button>
        </div>
        <div class="item-cards">
            <ItemCard v-for="item in items" :key="item.id" :item="item" @edit-item="editItem"
                @delete-item="handeledeleteItem" />
        </div>
        <AllModal :visible="showForm" @close="cancelEditForm">
            <ItemForm :item="selectedItem" :isEdit="isEdit" @submit="handleSubmit" @cancel="cancelEditForm" />
        </AllModal>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useItemStore } from "@/store/itemStore";
import ItemCard from "@/components/admin/item/ItemCard.vue";
import AllModal from "@/components/AllModal.vue";
import ItemForm from "@/components/admin/item/ItemForm.vue";
import { EventBus } from "@/utils/EventBus";

export default {
    name: "ItemList",
    components: {
        ItemCard,
        AllModal,
        ItemForm,
    },
    setup() {
        const itemStore = useItemStore();
        const items = computed(() => itemStore.items);

        onMounted(() => {
            itemStore.fetchItems();
        });
        return {
            items,
            itemStore,
            addItem: itemStore.addItem,
            updateItem: itemStore.updateItem,
            deleteItem: itemStore.deleteItem,
        };
    },
    data() {
        return {
            showForm: false,
            selectedItem: null,
            isEdit: false,
            searchQuery: "",
        };
    },


    methods: {
        showAddForm() {
            this.selectedItem = { id: 0, name: "", description: "", quantity: 0 };
            this.isEdit = false;
            this.showForm = true;
        },
        editItem(item) {
            this.selectedItem = { ...item };
            this.isEdit = true;
            this.showForm = true;
        },
        async handleSubmit(item) {
            if (this.isEdit) {
                await this.itemStore.updateItem(item);
            } else {
                await this.itemStore.addItem(item);
            }
            await this.itemStore.fetchItems();
            this.showForm = false;
        },
        cancelEditForm() {
            this.showForm = false;
        },
        async handeledeleteItem(item) {
            await this.deleteItem(item);
            await this.itemStore.fetchItems();
        },
        handleSearch(query) {
            this.searchQuery = query;
        },
    },
    mounted() {
        EventBus.on("search", this.handleSearch);
    },
    beforeUnmount() {
        EventBus.off("search", this.handleSearch);
    },
};
</script>

<style scoped>
.item-list {
    padding: 24px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

h2 {
    color: #4b3f6b;
    font-size: 24px;
}

.add-btn {
    background-color: #754bc5;
    color: white;
    padding: 6px 12px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
}

.add-btn:hover {
    background-color: #5a37a0;
}

.table-responsive {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: center;
    vertical-align: middle;
}

th {
    background-color: #4b3f6b;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

tr:hover {
    background-color: #ddd;
}

button {
    padding: 6px 12px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
}

.edit-btn {
    background-color: #4caf50;
    color: white;
    margin-right: 5px;
}

.edit-btn:hover {
    background-color: #45a049;
}

.delete-btn {
    background-color: #f44336;
    color: white;
}

.delete-btn:hover {
    background-color: #d32f2f;
}

@media (max-width: 600px) {

    th,
    td {
        padding: 8px 10px;
    }

    .action-buttons {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .action-buttons button {
        margin: 5px 0;
    }
}
</style>
