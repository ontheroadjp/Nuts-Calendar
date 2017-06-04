<template>
<div class="container" style="width: 100%; height: 100vh">
<div class="columns">
<div class="column">
    
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
    
    <form>
    <div class="box" style="padding: 60px; width: 100%;">
    
        <div class="field">
            <label class="label">Name</label>
            <p class="control has-icon">
                <input 
                    class="nuts-input-textbox is-medium" 
                    type="text" 
                    style="margin-bottom:3.5em"
                    :placeholder="emailHasError ? error.email : 'Calendar name'"
                    v-model="input.name"
                    v-focus
                >
                <span class="icon is-small" :style="[emailHasError ? style.error : '']">
                    <i class="fa fa-calendar-o"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <label class="label">Description</label>
            <p class="control has-icon">
                <input 
                    class="nuts-input-textbox is-medium" 
                    type="text" 
                    style="margin-bottom:3.5em"
                    :placeholder="passwordHasError ? error.password : 'description'"
                    v-model="input.description"
                >
                <span class="icon is-small" :style="[passwordHasError ? style.error : '']">
                    <i class="fa fa-pencil"></i>
                </span>
            </p>
        </div>
    
        <div class="is-clearfix" style="margin-bottom: 25px"></div>

            <button 
                type="submit"
                class="button" 
                :class="theme.secondary.class"
                style="width: 100%" 
                @click.prevent="putCalendarSettings()"
           >
               <span class="icon is-small">
                   <i class="fa fa-floppy-o"></i>
               </span><span>Save</span>
            </button>

    </div><!-- // .box -->
    </form>
    
</div><!-- // .column is-x -->
</div><!-- // .columns -->
</div><!-- // .container -->
</template>

<script>
    import calendarService from '../../../services/calendar.js';
    export default {
        mixins: [
            calendarService,
        ],

        computed: {
            theme: function() {
                return this.$store.state.app.theme;
            },

            currentCalendarId: function() {
                return this.$store.state.calendar.currentId;
            }
        },

        methods: {
            putCalendarSettings: function() {
                this.execPutCalendarSettings(this.currentCalendarId)
            },
        },

        mounted() {
            const self = this;
            if(! this.$store.state.app.ready ) {
                eventBus.listen('nuts.app.ready', function() {
                    const cal = self.$store.state.calendar.data.userCalendars[self.currentCalendarId];
                    const calName = cal.name;
                    const calDescription = cal.description;
                    self.input.name = calName;
                    self.input.description = calDescription;
                },this.$route.path);
            } else {
                const cal = self.$store.state.calendar.data.userCalendars[self.currentCalendarId];
                const calName = cal.name;
                const calDescription = cal.description;
                self.input.name = calName;
                self.input.description = calDescription;
            }
        },
    }
</script>

<style lang="scss" scoped>
    /* empty */
</style>
