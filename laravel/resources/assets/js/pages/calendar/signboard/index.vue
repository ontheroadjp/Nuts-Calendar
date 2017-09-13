<template>
<section id="signboard" class="hero" :class="theme.primary.class">
    <div class="hero-body">
    <div class="container">
    
        <div id="mc_embed_signup" class="columns is-vcentered">
            <div class="column is-one-third is-left">
                <hero-title></hero-title>
            </div>
    
            <div class="column">
                <span class="is-pulled-right">
                    <ym-field></ym-field>
                </span>
            </div>
        </div><!-- // #mc_embed_signup -->
    
    </div><!-- // .container -->
    </div><!-- // .hero-body -->
    
    <div class="hero-foot">
        <menu-tabs 
            :calendar-is-loading="calendarIsLoading"
        ></menu-tabs>
    </div>
</section>
</template>

<script>
    import { mapState } from 'vuex';
    import heroTitle from '../../partials/hero-title.vue';
    import ymField from './ym-field.vue';
    import menuTabs from './menu-tabs.vue';

    export default {
        components: { heroTitle, menuTabs, ymField },

        props: {
            calendarIsLoading: { type: Boolean, default: false }
        },

        computed: {
            ...mapState({
                theme: state => state.app.theme
            })
        }
    } 
</script>
