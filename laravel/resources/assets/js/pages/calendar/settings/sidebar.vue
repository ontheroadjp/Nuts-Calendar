<template>
<aside>
    <div class="panel" style="background: white">
        <p class="panel-heading" :style="panelHeader">Settings</p>

        <router-link
           to="/calendar/settings/calendar" 
           class="panel-block"
           :class="[selected == 'calendar' ? 'is-active' : '' ]"
           style="line-height: 1.8em"
           @click="selected = 'calendar'"
        >
            <span class="panel-icon">
                <i class="fa fa-calendar-o"></i>
            </span>Calendar settings
        </router-link>

        <router-link
            to="/calendar/settings/members" 
            :class="['panel-block', selected == 'members' ? 'is-active' : '' ]"
            style="line-height: 1.8em"
            @click="selected = 'members'"
        >
            <span class="panel-icon">
                <i class="fa fa-user"></i>
            </span>Member settings
        </router-link>

        <router-link
            to="/calendar/settings/items"
            :class="['panel-block', selected == 'items' ? 'is-active' : '' ]"
            style="line-height: 1.8em"
            @click="selected = 'items'"
        >
            <span class="panel-icon">
                <i class="fa fa-id-card-o"></i>
            </span>Item settings
        </router-link>
    </div>

    <div class="panel" style="background: white">
        <p class="panel-heading" :style="panelHeader">Link</p>
        <router-link
            to="/calendar" 
            class="panel-block"
            style="line-height: 1.8em"
            @click=""
        >
            <span class="panel-icon">
                <i class="fa fa-dashboard"></i>
            </span>Go to the Dashboard
        </router-link>
        <router-link
            to="" 
            class="panel-block"
            style="line-height: 1.8em"
            @click=""
        >
            <span class="panel-icon">
                <i class="fa fa-calendar"></i>
            </span>Show calendar
        </router-link>
    </div>

</aside>
</template>

<script>
export default {

    props: [
        'selected',
    ],

    computed: {
        theme: function() {
            return this.$store.state.app.theme;
        },

        currentCalendarId: function() {
            return this.$store.state.calendar.currentId;
        },

        panelHeader: function() {
            return {
                'border-radius': '2px 2px 0 0 / 2px 2px 0 0',
                'background': 'rgba(220, 220, 220, 0.3)',
                'color': this.theme.primary.code,
                'font-size': '1.15em',
            }
        },
    }
}
</script>
