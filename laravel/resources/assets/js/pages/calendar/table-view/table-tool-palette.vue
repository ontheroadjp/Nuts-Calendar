<template>
<div class="level">

    <div class="level-left" style="margin-left:10px">
        <span class="level-item">
            <button class="button" @click="setInternalQuery('')" style="margin-right:15px">All</button>
            <button class="button" @click="setInternalQuery('0')" style="background-color:#fff0f0">Sun</button>
            <button class="button" @click="setInternalQuery('1')">Mon</button>
            <button class="button" @click="setInternalQuery('2')">Tue</button>
            <button class="button" @click="setInternalQuery('3')">Wed</button>
            <button class="button" @click="setInternalQuery('4')">Thu</button>
            <button class="button" @click="setInternalQuery('5')">Fri</button>
            <button class="button" @click="setInternalQuery('6')" style="background-color:#f0f0ff; margin-right:15px">Sat</button>
            <a  v-link="{path: '/calendar/settings/members'}" class="button"><i class="fa fa-user"></i></a>
        </span>
    </div><!-- // .level-left -->

    <div class="level-right" style="margin-right:10px">
        <span class="level-item">
            <search-box :search-query.sync="searchQuery"></search-box>
        </span>
        <span class="level-item">
            <span 
                class="icon is-small" 
                style="cursor:pointer"
                @click="isOpen = !isOpen"
            >
                <i class="fa fa-times-circle"></i>
            </span>
        </span>
    </div><!-- // .level-right -->

</div><!-- // .level -->
</template>

<script>
import searchBox from './table-search-box.vue';

export default {
    components: {
        'search-box': searchBox
    },

    props: [
        'isOpen', 'internalQuery', 'searchQuery'
    ],

    methods: {
        setInternalQuery(val) {
            this.internalQuery = '';
            this.internalQuery = val;
        },
    }
}
</script>
