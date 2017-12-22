<template>
<span>
    <span class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <div v-show="isActive">
        <span>Home</span>
        <span>Dashboard</span>
        <span>Account</span>
    </div>
</span>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            theme: state => state.app.theme
        })
    },

    data() {
        return {
            isActive: false
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
