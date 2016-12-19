<template>
    <h2>Event List</h2>
        <table class="table">
            <tbody>
                <tr v-for="event in events
                        | filterBy $parent.$data.searchQuery in 'content'
                "
                    :class="{saturday: getDayIndex(event.date) == 6, sunday: getDayIndex(event.date) == 0}"
                    @mouseover="event.is_row_hover = true";
                    @mouseout="event.is_row_hover = false";
                >

                    <td class="date-styling" :style="date_column_width">
                        <span>{{ getDayString(event.date) }}</span>
                    </td>

                    <td class="date-styling" :style="date_column_width">
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

                    <td v-show="! event.is_row_hover">
                    </td>

                    <td v-show="event.is_row_hover">
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
    import dateUtilities from '../mixins/DateUtilities.js';
    export default {
        data() {
            return {
                events: [],
                date_column_width: {
                    width: '6%'
                },
                is_row_hover: false,
            }
        },

        mixins: [
            dateUtilities
        ],

        created() {
            this.events = this.$parent.events;
        }
    } 
</script>

<style>
    
</style>
