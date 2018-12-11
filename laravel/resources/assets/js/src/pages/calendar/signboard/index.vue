<template>
<section id="signboard" class="hero" :class="theme.primary.class">
    <div class="thin"
        style="position: absolute;
                top: 5px;
                right: 30px;
                display: flex;
                align-items: center
            ">

        <button class="button thin" :class="theme.primary.class"
            @click="clickPrev()"
        ><div class="icon">
            <i class="fa fa-2x fa-caret-left"></i>
        </div></button>

        <span style="font-size: 3rem; margin: 0 35px">{{ display }}</span>

        <button class="button thin" :class="theme.primary.class"
            @click="clickNext()"
        ><div class="icon">
            <i class="fa fa-2x fa-caret-right"></i>
        </div></button>

    </div>

<!--
    <div v-show="viewMode == 'daily'" class="hero-body" style="padding: 20px;">

    <div class="hero-body" style="padding: 20px;">
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
        </div>
-->

    <!-- </div>--><!-- // .container -->
    <!-- </div>--><!-- // .hero-body -->

    <div class="hero-foot">
        <menu-tabs
            :calendar-is-loading="calendarIsLoading"
        ></menu-tabs>
    </div>
</section>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
//    import heroTitle from '../../partials/hero-title.vue';
//    import ymField from './ym-field.vue';
    import menuTabs from './menu-tabs.vue';
    import core from '../../../mixins/core.js';

    export default {
//        components: { heroTitle, menuTabs, ymField },
        components: { menuTabs },

        mixins: [ core ],

        props: {
            calendarIsLoading: { type: Boolean, default: false }
        },

        computed: {
            ...mapState({
                theme: state => state.app.theme
            }),

            ...mapState('calendar', {
                viewMode: state => state.viewMode,
                currentYear: state => state.currentYear,
                currentMonth: state => state.currentMonth
            }),

            display: function() {
                switch( this.viewMode ) {
                    case 'monthly':
                        if( this.lang === 'ja' ) {
                            return this.currentYear + '年';
                        }
                        if( this.lang ==='en' ) {
                            return this.currentYear;
                        }
                    case 'daily':
                        if( this.lang === 'ja' ) {
                            return this.currentYear + '年 ' + this.currentMonth + '月';
                        }
                        if( this.lang ==='en' ) {
                            return this.currentMonth + ' ' + this.currentYear;
                        }
                }
            }
        },

        methods: {
            ...mapActions('calendar', {
                setCurrentYear: 'setCurrentYear',
                setCurrentMonth: 'setCurrentMonth',
                fetchCalendar: 'fetchCalendar'
            }),

            clickPrev() {
                switch( this.viewMode ) {
                    case 'monthly':
                        this.setCurrentYear(this.currentYear-1);
                        break;
                    case 'daily':
                        if(this.currentMonth === 1) {
                            this.setCurrentYear(this.currentYear-1);
                            this.setCurrentMonth(12);
                        } else {
                            this.setCurrentMonth(this.currentMonth-1);
                        }
                        break;
                }
                this.fetchCalendar();
            },

            clickNext() {
                switch( this.viewMode ) {
                    case 'monthly':
                        this.setCurrentYear(this.currentYear+1);
                        break;
                    case 'daily':
                        if(this.currentMonth === 12) {
                            this.setCurrentYear(this.currentYear+1);
                            this.setCurrentMonth(1);
                        } else {
                            this.setCurrentMonth(this.currentMonth+1);
                        }
                        break;
                }
                this.fetchCalendar();
            }
        }
    }
</script>
