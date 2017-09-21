<<template>
<div class="columns is-multiline">

    <template v-for="uCal in userCalendars">
        <div class="column is-6">
            <user-calendar-card
                :userCalendar="uCal"
            ></user-calendar-card>
        </div>
    </template>

    <!-- New Calrendar panel -->
    <div class="column is-6">
        <div class="new-user-calendar-card"
            style="text-align: center; cursor: pointer"
            @click="clickNewCalendar()"
        >

            <div class="card-content" style="font-weight: 100">

                <a class="fa-stack fa-lg create-new-icon"
                    style="margin-right: 10px"
                >
                    <i class="fa fa-calendar-plus-o fa-stack-1x"
                        style="margin-left:1px; color: #fff"></i>
                </a>
                <a href="">
                    <span>Create New Calendar</span>
                </a>
            </div>
        </div>
    </div><!-- // .column is-6 -->

</div>
</template>

<script>
import { mapState } from 'vuex';
import userCalendarCard from './card.vue';

export default {
    components: { userCalendarCard },

    computed: {
        ...mapState('userCalendar', {
            userCalendars: state => state.data.userCalendars
        })
    },

    methods: {
        clickNewCalendar: function() {
            u.clog('New Calendar Button');
        }
    }
};
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
</style>
