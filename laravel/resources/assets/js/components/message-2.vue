<template>
    <span :class="class">
        <span :style="{color: color};">{{ message }}</span>
        <span @click="close()"><i v-show="isImportant" class="fa fa-times-circle"></i></span>
    </span>
</template>

<script>
export default {
    props: [
        'message', 'color', 'isImportant', 'class', 'isShow'
    ],

    methods: {
        close: function() {
            setTimeout( () => this.isShow = false, 1500);
        }
    }
}
</script>

<style lang="scss" scoped>
    /* empty */
</style>
