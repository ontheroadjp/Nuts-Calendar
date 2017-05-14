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
            this.finishRemoveItem();
        },

        failedRemoveItem(error) {
            u.clog('failed');
            this.finishRemoveItem();
        },

        finishRemoveItem() {
            u.clog('finish');
            this.$store.commit('finishRemoveItem');
        },
    }
}
</script>
