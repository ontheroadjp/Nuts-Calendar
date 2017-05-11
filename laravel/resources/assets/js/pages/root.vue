<template>
    <section :class="['hero', theme.primary.class, 'is-fullheight']">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">Nuts <strong>Calendar</strong></h1>
                <h2 class="subtitle">Full Height subtitle</h2>
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
        },
    }
</script>
