<<template>
<div class="column is-6">
    <div class="new-user-calendar-card"
        style="text-align: center; cursor: pointer"
        @click="clickNewCalendar()"
    >

        <div class="card-content" style="font-weight: 100">

            <a class="fa-stack fa-lg create-new-icon"
                style="margin-right: 10px"
            >
                <i class="fa fa-user fa-stack-1x"
                    style="color: #fff"></i>
            </a>
                <button class="button strip">
                    <span>Create New Member/Role</span>
                </button>
        </div>
    </div>
</div><!-- // .column is-6 -->
</template>

<script>
export default {
    props: {
        onOpen: { type: Function, required: true }
    },

    methods: {
        clickNewCalendar: function() {
            this.onOpen();
        }
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
</style>
