<template>
    <div class="item-card card mb-3 shadow-sm">
        <div class="card-body">

            <h3 class="card-title">{{ item.neme }}</h3>
            <p class="card-text">{{ item.description }}</p>
            <p class="card-text stock">Stok: {{ item.quantity }}</p>
            <div class="buttons d-flex gap-2 mt-3">
                <button @click="$emit('edit-item', item)" class="btn btn-success edit">
                    Edit
                </button>
                <button @click="$emit('delete-item', item.id)" class="btn btn-danger delete">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ItemCard',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    mounted() {
        console.log("Rendered item:", this.item);
    }
};
</script>

<style scoped>
.item-card {
    margin: 20px;
}
</style>