<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            dragItem: state => state.calendar.behavior.item.dragItem,
            theme: state => state.app.theme,
        }),

        dragEnter: function() {
            return { 
                border: '2px solid ' + this.theme.secondary.code,
            }
        },
    },

    methods: {
        moveItem() {
            u.clog('moveItem()');
            const fromCell = this.dragItem.fromCell;
            const enterCell = this.dragItem.enterCell;

            this.$store.commit('moveItem', { 
                fromDayIndex: fromCell.dayIndex,
                fromMemberId: fromCell.memberId,
                fromCellItemsIndex: fromCell.cellItemsIndex,
                toDayIndex: enterCell.dayIndex,
                toMemberId: enterCell.memberId,
                item: this.dragItem.draggingItem
            });

            const item = this.dragItem.draggingItem;
            const url = '/api/v1/item/' + item.id;

            const params = {
                'member_id': item.member_id,
                'content': item.content,
                'start_time': item.start_time,
                'end_time': item.end_time,
                'date': item.date
            };
    
            http.fetchPut(url, params)
                .then(response => this.successMoveItem(response))
                .catch(error => this.failedMoveItem(error));
        },

        successMoveItem: function(response) {
            u.clog('success');
            this.$store.commit('finishDragItem');
        },
    
        failedMoveItem: function(error) {
            u.clog('failed');
            const fromCell = this.dragItem.fromCell;
            const enterCell = this.dragItem.enterCell;

            // reverse item to original position(cell)
            this.$store.commit('moveItem', { 
                fromDayIndex: enterCell.dayIndex,
                fromMemberId: enterCell.memberId,
                fromCellItemsIndex: enterCell.cellItemsIndex,
                toDayIndex: fromCell.dayIndex,
                toMemberId: fromCell.memberId,
                item: this.dragItem.draggingItem
            });

            this.$store.commit('finishDragItem');
        },
    }
}
</script>
