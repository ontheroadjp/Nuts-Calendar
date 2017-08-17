<template>
<div>
    <!-- columns -->
    <div class="member-waiting">
        <template v-for="m in members">
            <span 
                class="member-in-waiting" 
                draggable
            >{{ m.name }}</span>
        </template>
    </div>
    
    <!-- user calendars -->
    <div class="columns is-multiline">
    <template v-for="uCalendar in userCalendars">
    <div class="column is-4">
    
        <router-link
            to="/calendar/view"
            class="title is-4" 
            @click.native="clickUserCalendar(uCalendar.id)"
        >
            <div 
                :class="['card', 'is-clickable', theme.primary.class]"
                @dragenter="handleDragEnter()"
            >
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
                    <div class="calendar-members">
                        <template v-for="m in members">
                            <div 
                                class="member-in-calendar" 
                                v-if="m.id === uCalendar.id"
                                draggable
                            >{{ m.name }}</div>
                        </template>
                    </div>
                </div>
    
            </div><!-- // .media -->
            </div><!-- // .card-content -->
            </div><!-- // .card -->
        </router-link>
    
    </div><!-- // .column is-xx -->
    </template>
    </div><!-- // .columns -->
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('dashboard', {
            members: state => state.data.members
        }),

        ...mapState('calendar', {
            userCalendars: state => state.data.userCalendars
        })
    },

    methods: {
        clickUserCalendar: function(id) {
            u.clog('changeCalendar(' + id + ')');
            this.$store.commit('setCurrentCalendarId', id);
        },

        handleDragEnter: function() {
            u.clog('drag enter');
        }
    }
}
</script>

<style lang="scss" scoped>
div.card {
    &.is-koiai.is-clickable:hover {
        border: 1px solid rgba(25, 96, 182, 0.5);
    }

    &.is-nadeshiko.is-clickable:hover {
        border: 1px solid rgba(239, 113, 156, 0.4);
    }

    &.is-mikan.is-clickable:hover {
        border: 1px solid rgba(240, 131, 0, 0.4);
    }

    &.is-sumire.is-clickable:hover {
        border: 1px solid rgba(112, 88, 163, 0.5);
    }

    &.is-moegi.is-clickable:hover {
        border: 1px solid rgba(170, 207, 83, 0.5);
    }
}

.member-waiting {
    border: 1px solid red;
    padding: 20px;
    margin-bottom: 25px;
}

.calendar-members {
    border: 1px solid blue;
    padding: 10px;
}

.member-in-waiting {
    border: 1px solid green;
    border-radius: 3px;
    line-height: 2.5rem;
    margin: 5px;
    padding: 5px;
    cursor: move;
    &:before {
        content: "\f2bd";
        margin-right: 5px;
        font-family: FontAwesome;
    }
}

.member-in-calendar {
    font-size: 1rem;
    border: 1px solid red;
    margin-bottom: 5px;
    border-radius: 3px;
    padding: 5px;
    cursor: move;
    &:before {
        content: "\f2bd";
        margin-right: 5px;
        font-family: FontAwesome;
    }
}
</style>
