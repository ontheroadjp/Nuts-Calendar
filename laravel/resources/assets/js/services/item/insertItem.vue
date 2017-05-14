<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            currentYear: state => state.calendar.currentYear,
            currentMonth: state => state.calendar.currentMonth,
            addItem: state => state.calendar.behavior.item.addItem,
        }),
    },

    methods: {
        insertEvent: function (cellItems) {
            this.insertItem(cellItems, 1);
        },

        insertTask: function (cellItems) {
            this.insertItem(cellItems, 2);
        },

        insertItem: function (cellItems, typeId) {
            u.clog('insertItem()');
            if( ! this.addItem.newItem.content ) return;

            this.$store.commit('startAddItem');
            const d = ("0" + (this.addItem.enterCell.dayIndex + 1)).slice(-2);
            const date = this.currentYear + '-' + this.currentMonth + '-' + d

            const url = '/api/v1/item';
            const params = {
                'date': date,
                'type_id': typeId,
                'member_id': this.addItem.enterCell.memberId,
                'content': this.addItem.newItem.content,
                'start_time': null,
                'end_time': null
            };
    
            http.fetchPost(url, params)
                .then(response => this.successInsertItem(response, cellItems))
                .catch(error => this.failedInsertItem(error));
        },

        successInsertItem(response, cellItems) {
            u.clog('success');
            this.$store.commit('addItem', {
                dayIndex: this.addItem.enterCell.dayIndex,
                memberId: this.addItem.enterCell.memberId,
                val: response.data
            });
            this.finishAddItem();
        },

        failedInsertItem(error) {
            u.clog('failed');
            this.finishAddItem();
        },

        finishAddItem() {
            u.clog('finish');
            this.$store.commit('finishAddItem');
        },
    }
}
</script>
