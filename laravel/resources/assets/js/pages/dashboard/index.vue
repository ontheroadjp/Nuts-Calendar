<template>
<div class="wrapper">
<div class="container" style="width: 100%;" @click="click($event)">

    <popup-menu 
        :x="x" :y="y" 
        :isActive.sync="isBoxActive" 
        :onClose="popupMenuClose"
    >
        <span>This is a popup menu</span>
    </popup-menu>

    <!-- infomation -->
    <div class="columns is-multiline">
        <div class="column is-4">
            <today-date-card></today-date-card>
        </div>
    </div>
    
    <!-- tab menu -->
    <menu-tabs :tabs="tabs">
        <div v-if="$route.path === '/dashboard'">
            <div class="columns is-multiline">
                <template v-for="uCal in userCalendars">
                    <div class="column is-6">
                        <user-calendar-card :userCalendar="uCal"></user-calendar-card>
                    </div>
                </template>
                <div class="column is-6">
                    <div class="new-user-calendar-card" 
                        style="text-align: center; cursor: pointer"
                        @click="clickNewCalendar()">

                        <div class="card-content" style="font-weight: 100">

                            <a class="fa-stack fa-lg create-new-icon" 
                                style="margin-right: 10px">

                                <i class="fa fa-calendar-plus-o fa-stack-1x" 
                                    style="margin-left:1px; color: #fff"></i>
                            </a>
                            <a href="">
                                <span>Create New Calendar</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- // v-if -->
    
        <member-settings v-else-if="$route.path === '/dashboard/members'"></member-settings>
    </menu-tabs>

</div><!-- // .container -->
</div><!-- // .wrapper -->
</template>

<script>
import VueRouter from 'vue-router';
import { mapState } from 'vuex';
import todayDateCard from './today-date-card.vue';
import menuTabs from './menu-tabs.vue';
import userCalendarCard from './user-calendar-card.vue';
import memberSettingsPane from './member-settings/index.vue';
//import blackScreen from '../../components/black-screen.vue';
import popupMenu from '../../components/popup-menu.vue';

export default {

    components: {
        'menu-tabs': menuTabs,
        'user-calendar-card': userCalendarCard,
        'member-settings': memberSettingsPane,
        'today-date-card': todayDateCard,
//        blackScreen
        'popup-menu': popupMenu
    },

    data() {
        return {
            tabs: {
                '/dashboard': { label: 'Calendars', icon: 'fa-calendar'},
                '/dashboard/members': { label: 'Member Settings', icon: 'fa-gear'}
            },
                
            x: 0,
            y: 0,
            isBoxActive: false
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('userCalendar', {
            userCalendars: state => state.data.userCalendars,
        }),

        ...mapState('member', {
            members: state => state.data.members,
        }),

//        xPosition: function() {
//            const clickPoint = (this.x - 20);
//            if((clickPoint + 240)> window.innerWidth) {
//                return window.innerWidth - 240 - 50;
//            }
//            
//            return clickPoint;
//        },
//
//        yPosition: function() {
//            const clickPoint = (this.y - 62 - 320);
//            if(clickPoint < 0) {
//                return 10;
//            }
//            
//            return clickPoint;
//        },
//
//        box: function() {
//            return {
//                position: 'absolute',
//                top: this.yPosition + 'px',
//                left: this.xPosition + 'px',
//                'background-color': 'blue',
//                height: '320px',
//                width: '240px',
//                color: '#fff',
//                'z-index': 999
//            }
//        }
    },

    methods: {
        clickNewCalendar: function() {
            u.clog('New Calendar Button');
        },

        click(e) {
            this.isBoxActive = true;
            this.x = e.pageX;
            this.y = e.pageY;
        },

        popupMenuClose() {
            this.isBoxActive = false;
        }
    },

    beforeRouteEnter(to, from, next) {
        const types = ['', 'members'];

        if( typeof to.params.type === 'undefined' ) {
            next();
        } else if( types.indexOf(to.params.type) === -1 ) {
            next({path: '/dashboard'});
        }

        next();
    }
}
</script>

<style lang="scss" scoped>
.new-user-calendar-card {
    background-color: #f9f9f9;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    color: #4a4a4a;
    max-width: 100%;
    position: relative;
    border: 4px dotted rgba(10, 10, 10, 0.24);
    box-shadow: none;
}

.create-new-icon {
    background-color: #c0c0c0;
    border-radius: 30px;
    &:hover {
        background-color: #9a9a9a;
    }
}

.card-fover {
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

/*
.box-enter,
.box-leave-to {
    opacity: 0;    
}

.box-enter-to,
.box-leave {
    opacity: 1
}

.box-enter-active,
.box-leave-active {
    transition: all 0.3s ease;
}
*/
</style>

