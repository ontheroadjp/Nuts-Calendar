<template>
    <section class="hero {{ theme.primary.class }}">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">{{ title }}</h1>
                <h2 class="subtitle">{{ subtitle }}</h2>
            </div>
        </div>
    </section>
</template>

<script>
    export default {

        props: [
            'title', 'subtitle'
        ],

        computed : {
            theme : function() {
                return this.$store.state.app.theme;
            }
        }
    }
</script>

<style>
</style>
