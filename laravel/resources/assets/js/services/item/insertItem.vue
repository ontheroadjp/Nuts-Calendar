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
        setNewItemContent: function(value) {
            this.$store.commit('setNewItemContent', value);
        },

        insertEvent: function () {
            this.insertItem(1);
        },

        insertTask: function () {
            this.insertItem(2);
        },

        insertItem: function (typeId) {
            u.clog('insertItem()');

            if( ! this.addItem.newItem.content ) {
                this.$store.commit('notifyDanger', {
                    content: 'no content',
                    isImportant: false
                });
                return;
            }

            this.$store.commit('startInsertItem');
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
                .then(response => this.successInsertItem(response))
                .catch(error => this.failedInsertItem(error));
        },

        successInsertItem(response) {
            u.clog('success');
            this.$store.commit('insertItem', {
                dayIndex: this.addItem.enterCell.dayIndex,
                memberId: this.addItem.enterCell.memberId,
                val: response.data
            });
            this.finishInsertItem('success an inserting item', 'is-success', false);
        },

        failedInsertItem(error) {
            u.clog('failed');
            this.finishInsertItem('failed an inserting item', 'is-danger', false);
        },

        finishInsertItem(content, type, isImportant) {
            u.clog('finish');
            this.$store.commit('setNotification', {
                content: content,
                type: type,
                isActive: true,
                isImportant: isImportant
            });
            this.$store.commit('finishInsertItem');
        },
    }
}
</script>
