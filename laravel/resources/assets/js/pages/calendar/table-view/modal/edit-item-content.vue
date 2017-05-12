<template>
<div>
    <button class="modal-close" @click="close()"></button>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Item Edit</p>
            <button class="delete" @click="close()"></button>
        </header>
        <section class="modal-card-body">
            <p>content: {{ item !== null ? item.content : ''}} </p>
            <p>start: {{ item !== null ? item.start_time : ''}} </p>
            <p>end: {{ item !== null ? item.end_time : ''}} </p>
        </section>
        <footer class="modal-card-foot">
            <a :class="['button', theme.primary.class]">Save changes</a>
            <a class="button" @click="close()">Cancel</a>
        </footer>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    methods: {
        close: function() {
            const payload = {
                isEditing: false,
                editingItem: null
            }
            this.$store.commit('toggleItemEditing', payload);
        },
    },

    computed: {
        ...mapState({
            item: state => state.calendar.behavior.item.editingItem,
            theme: state => state.app.theme,
        })
    }
}
</script>
