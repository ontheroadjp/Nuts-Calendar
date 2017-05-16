<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            deleteItem: state => state.calendar.behavior.item.deleteItem,
        })
    },

    methods: {
        removeItem() {
            u.clog('removeItem()');
            
            this.$store.commit('startRemoveItem');
            const url = '/api/v1/item/' + this.deleteItem.deletingItem.id;
    
            http.fetchDelete(url)
                .then(response => this.successRemoveItem(response))
                .catch(error => this.failedRemoveItem(error));
        },

        successRemoveItem(response) {
            u.clog('success');
            this.$store.commit('removeItem');
            this.finishRemoveItem('success a removing item', 'is-success', false);
        },

        failedRemoveItem(error) {
            u.clog('failed');
            this.finishRemoveItem('failed a removing item', 'is-danger', false);
        },

        finishRemoveItem(content, type, isImportant) {
            u.clog('finish');
            this.$store.commit('setNotification', {
                content: content,
                type: type,
                isImportant: isImportant,
                isActive: true,
            });
            this.$store.commit('finishRemoveItem');
        },
    }
}
</script>
