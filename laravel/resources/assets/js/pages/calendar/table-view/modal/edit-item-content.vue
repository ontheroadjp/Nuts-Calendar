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
            <a class="button {{ theme.primary.class }}">Save changes</a>
            <a class="button" @click="close()">Cancel</a>
        </footer>
    </div>
</div>
</template>

<script>
export default {
    props: [
        'isActive', 'item'
    ],

    methods: {
        close: function() {
            this.isActive = false;
            this.item = null;
        },
    },

    computed: {
        theme: function() {
            return this.$store.state.app.theme;
        }
    }
}
</script>
