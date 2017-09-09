<template>
<div class="container" style="width: 100%; height: 100vh">
<div class="columns">
<div class="column">
    
    <h1>Setting Items</h1>

<!--
    <div class="panel" v-show="error.authentication" style="
        position: absolute;
        top: 70px;
        width: 100%;
        text-align: center;
        color: red;
    ">
        <p style="margin-bottom: 20px;">{{ error.authentication }}</p>
    </div>
-->    
    <div class="panel">
        <div style=" padding: 60px 20px; width: 100%; ">

            <form>


            </form>

        </div>
    </div><!-- // .panel -->
    
</div><!-- // .column is-x -->
</div><!-- // .columns -->
</div><!-- // .container -->
</template>

<script>
//    import calendarService from '../../../services/calendar.js';
    export default {
//        mixins: [
//            calendarService,
//        ],

        computed: {
            theme: function() {
                return this.$store.state.app.theme;
            },

            currentCalendarId: function() {
                return this.$store.state.calendar.currentId;
            }
        },
    }
</script>
