<template>
<section id="signboard" class="hero is-primary" style="margin-top: -3px;">
    <div class="hero-body">
        <div class="container">
            <div id="mc_embed_signup" class="columns is-vcentered">

                <div class="column is-one-third is-left">
                    <p class="title">Family <strong>Calendar</strong></p>
                    <p class="subtitle">
                        <small>
                            Manage your task & events in easily, quickly and a fun!
                        </small>
                    </p>
                </div>

                <div class="column">
                    <span class="is-pulled-right" style="font-size: 1.8em;">
                        <nuts-ym-field></nuts-ym-field>
                    </span>
                </div>

            </div><!-- // .columns -->

            <div class="columns">
                <div class="column is-3">
                    <nuts-members-modal-button 
                        emit="open-members-modal" 
                        @click="clickAddMemberButton()"
                    >Add New Member</nuts-members-modal-button>
                </div>
                
                <div class="column is-4 is-offset-5">
                    <nuts-search-box></nuts-search-box>
                </div>
            </div><!-- // .columns -->

        </div>
    </div>

    <div class="hero-foot" style="height: 36px">
        <div class="container">
            <nav class="tabs is-boxed">

                <ul>

                    <li><a v-link="{path: '/dashboard'}">
                        <span class="icon"><i class="fa fa-dashboard"></i></span>
                        <span>Dashboard</span>
                    </a></li>

                    <li 
                        v-for="uCalendar in userCalendars" 
                        @click="$store.commit('setCurrentCalendarId', uCalendar.id)"
                        :class="{'is-active': currentCalendarId == uCalendar.id}"
                    >
                    
                        <a href="#" >
                            <span class="icon">
                                <i v-show="$store.state.ajax.loadingCalendarId != uCalendar.id" 
                                   class="fa fa-calendar"></i>

                                <i v-show="$store.state.ajax.loadingCalendarId == uCalendar.id" 
                                   class="fa fa-refresh fa-spin"></i>
                            </span>
    
                            {{ uCalendar.name }}
                        </a>

                    </li>

                    <!--
                    <li><a href="#">
                        <span class="icon"><i class="fa fa-plus"></i></span>
                    </a></li>
                    -->

                    <li><a v-link="{path: '/settings'}">
                        <span class="icon"><i class="fa fa-cog"></i></span>
                        <span>Calendar Settings</span>
                    </a></li>

                </ul>

                <!--
                <a class="button is-primary is-outlined" v-link="{path: '/settings'}">
                    <span class="icon"><i class="fa fa-cog"></i></span>
                    <span>Settings</span>
                </a>
                -->

            </nav>
        </div>

    </div>

    <div 
        v-show="$store.state.ajax.loadingCalendarId == currentCalendarId" 
        class="black-screen">
    </div>

</section>
</template>

<script>
    import nutsYmField from '../nuts-vue-components/NutsYmField.vue';
    import nutsSearchBox from '../nuts-vue-components/NutsSearchBox.vue';
    import nutsButton from '../nuts-vue-components/NutsButton.vue';

    export default {

        components: {
            'nuts-ym-field': nutsYmField,
            'nuts-search-box': nutsSearchBox,
            'nuts-members-modal-button': nutsButton,
        },

        computed: {

            userCalendars: function() {
                return this.$store.state.userCalendar;
            },

            currentCalendarId: function() {
                return this.$store.state.currentCalendarId;
            },

            calendar: function() {
                return this.userCalendars[this.currentCalendarId];
            },

        },

    } 
</script>

<style>
.black-screen {
    background: rgba(0, 209, 178, 0.3);
    position: absolute;
    top: 250px;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;
}
</style>
