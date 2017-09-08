<template>
    <section :class="['hero', theme.primary.class, 'is-fullheight']">
        <div class="hero-body">
            <div class="container">
                <h1 class="title thin-300" style="color:#fff">Nuts <strong>Calendar</strong></h1>
                <h2 class="subtitle thin" style="color:#fff">Full Height subtitle</h2>
            </div>
        </div>
    </section> 
</template>

<script>
export default {
    computed: {
        theme: function() {
            return this.$store.state.app.theme;
        }
    }
}
</script>

<style lang="scss" scoped>
    /* empty */
</style>
