<template>
    <div class="wrapper">

        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Dashboard
                    </h1>
                    <h2 class="subtitle">
                        Primary subtitle
                    </h2>
                </div>
            </div>
        </section>

        <div class="container" style="padding-top: 30px">
            <div class="columns">
                <div class="column is-3" style="padding: 30px;">
                    <fc-dashboard-sidebar></fc-dashboard-sidebar>
                </div>

                <div class="column is-9" style="padding: 30px;">
                   
                    <div class="tile">
                    <div class="tile is-4" v-for="uCalendar in userCalendars">

                            <div class="box" style="margin-bottom: 20px">
                                <div class="media">
                                    
                                    <div class="media-left">
                                        <figure class="image is-64x64">
                                            <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image">
                                        </figure>
                                    </div>

                                    <div class="media-content">
                                        <div class="content">
                                            <p>
                                            <a class="title" v-link="{path: '/calendar/' + uCalendar.id}">
                                                {{ uCalendar.name }}
                                            </a>
                                            </p>
                                            <p class="subtitle">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                            Aenean efficitur sit amet massa fringilla egestas. 
                                            Nullam condimentum luctus turpis.
                                            </p>
                                        </div>
                                    </div>

                                </div><!-- // .media -->
                            </div><!-- // .box -->

                    </div><! -- // loop -->
                    </div><!-- // .tile -->

                </div><!-- // .column .is-9 -->

            </div><!-- // .columns -->

        </div><!-- // .container -->
        
        <footer class="footer">
            <div class="container">
                <div class="content has-text-centered">
                    <p>
                    <strong>Bulma</strong> by <a href="http://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                    <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                    is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
                    </p>
                    <p>
                    <a class="icon" href="https://github.com/jgthms/bulma">
                        <i class="fa fa-github"></i>
                    </a>
                    </p>
                </div>
            </div>
        </footer>

    </div><!-- // .wrapper -->
</template>

<script>
    import FcDashboardSidebar from '../partials/FcDashBoardsidebar.vue';

    export default {

        components: {
            'fc-dashboard-sidebar': FcDashboardSidebar,
        },

        data() {
            return {
            }
        },

        computed: {

            userCalendars: function() {
                return this.$store.state.userCalendar;
            },

            currentCalendarId: function() {
                return this.$store.state.currentCalendarId;
            },

        },

        methods: {
            clickUserCalendar: function(uCalendar) {
                this.$store.commit('setCurrentCalendarId', uCalendar.id);
            }
        },

        ready() {
            this.$store.dispatch('fetchUserCalendar');
        },
    }
</script>

<style>
</style>
