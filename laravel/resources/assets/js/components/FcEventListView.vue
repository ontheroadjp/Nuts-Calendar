<template>
    <h2>Event List</h2>
    <table class="table">
        <tbody>
            <tr v-for="event in events
                    | filterBy $parent.searchQuery in 'content'
                "
                :class="{saturday: getDayIndex(event.date) == 6, sunday: getDayIndex(event.date) == 0}"
                @mouseover="event.isRowHover = true";
                @mouseout="event.isRowHover = false";
            >

                <td class="date-styling" :style="dateColumnWidth">
                    <span>{{ getDayString(event.date) }}</span>
                </td>

                <td class="date-styling" :style="dateColumnWidth">
                    <span>{{ event.date.substr(-2) }}</span>
                </td>

                <td>
                    <div class="form-group">
                        <span class="tag is-{{ event.member.color }}">
                            {{ event.member.name }}
                        </span>
                    </div>
                </td>

                <td>
                    <div class="form-group">
                        <span>
                            {{ event.content }}
                        </span>
                    </div>
                </td>

                <td v-show="! event.isRowHover">
                </td>

                <td v-show="event.isRowHover">
                    <div class="form-group">
                        <a href="#" class="button is-danger">
                            <span class="icon">
                                <i class="fa fa-trash"></i>
                            </span>
                            <span>DELETE</span>
                        </a>
                    </div>
                </td>

            </tr>
        </tbody>
    </table>
</template>

<script>
    import dateUtilities from '../mixins/date-utilities.js';

    export default {

        mixins: [
            dateUtilities
        ],

        data() {
            return {
                dateColumnWidth: {
                    width: '6%'
                },
                isRowHover: false,
            }
        },

        computed: {
            events: function() {
                return this.$store.state.events;
            }
        }

    } 
</script>
