<template>
<div class="wrapper">
<div class="container" style="width: 100%; height: 100vh">
<div class="columns is-multiline">
<template v-for="uCalendar in userCalendars">
<div class="column is-4">

    <a  class="title is-4" 
        v-link="{path: '/calendar/view'}"
        @click="clickUserCalendar(uCalendar.id)"
    >
        <div class="card is-clickable {{ theme.primary.class }}" style="height:120px">
        <div class="card-content">
        <div class="media">

            <div class="media-left">
                <span class="icon">
                    <i class="fa fa-calendar"></i>
                </span>
            </div>

            <div class="media-content">
                <p>{{ uCalendar.name }}</p>
                <p class="subtitle is-6">
                    {{ uCalendar.description }}
                </p>
            </div>

        </div><!-- // .media -->
        </div><!-- // .card-content -->
        </div><!-- // .card -->
    </a>

</div><!-- // .column is-xx -->
</template>
</div><!-- // .columns -->
</div><!-- // .container -->
</div><!-- // .wrapper -->
</template>

<script>
export default {

    computed: {
        userCalendars: function() {
            return this.$store.state.calendar.data.userCalendars;
        },

        theme: function() {
            return this.$store.state.app.theme;
        }
    },

    methods: {
        clickUserCalendar: function(id) {
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('setCurrentCalendarId', id);
        }
    },
}
</script>
<style lang="sass">
@import '../../../../sass/app.scss';

div.card.is-koiai.is-clickable:hover {
    border: 1px solid rgba(25, 96, 182, 0.5);
}
div.card.is-nadeshiko.is-clickable:hover {
    border: 1px solid rgba(239, 113, 156, 0.4);;
}
div.card.is-mikan.is-clickable:hover {
    border: 1px solid rgba(240, 131, 0, 0.4);
}
div.card.is-sumire.is-clickable:hover {
    border: 1px solid rgba(112, 88, 163, 0.5);;
}
div.card.is-moegi.is-clickable:hover {
    border: 1px solid rgba(170, 207, 83, 0.5);
}
</style>
