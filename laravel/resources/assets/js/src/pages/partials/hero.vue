<template>
    <section :class="['hero', theme.primary.class]">
        <div class="hero-body">
            <div class="container">
                <h1 class="title thin-200">{{ title }}</h1>
                <h2 class="subtitle thin">{{ subtitle }}</h2>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            title:    { type: String, default: '' }, 
            subtitle: { type: String, default: '' }
        },

        computed: {
            theme: function() {
                return this.$store.state.app.theme;
            }
        }
    };
</script>
