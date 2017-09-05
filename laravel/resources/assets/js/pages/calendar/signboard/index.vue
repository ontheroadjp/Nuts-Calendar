<template>
<section id="signboard" class="hero" :class="theme.primary.class">
    <div class="hero-body">
    <div class="container">
    
        <div id="mc_embed_signup" class="columns is-vcentered">
            <div class="column is-one-third is-left">
                <p class="title" :style="style.title">Nuts <strong>Calendar</strong></p>
                <p class="subtitle" style="color: #fff">
                    <small>
                        Manage your task & events in easily, quickly and a fun!
                    </small>
                </p>
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
    import ymField from './ym-field.vue';
    import menuTabs from './menu-tabs.vue';

    export default {
        components: {
            'menu-tabs': menuTabs,
            'ym-field': ymField,
        },

        props: [
            'calendarIsLoading',
        ],

        computed: {
            ...mapState({
                theme: state => state.app.theme,
            }),

            style: function() {
                return {
                    title: {
                        'color': this.theme.secondary.code,
                    }
                }
            }
        },
    } 
</script>

<style lang="scss" scoped>
    /* empty */
</style>
