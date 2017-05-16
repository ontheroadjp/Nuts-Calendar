<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            editItem: state => state.calendar.behavior.item.editItem
        })
    },

    methods: {
        saveItem: function() {
            u.clog('updateItem()');
            this.$store.commit('startUpdateItem');

            // ajax call
        },

        successUpdateItem: function(response) {
            u.clog('success');
            const item = this.editItem.editingItem;
            this.$store.commit('updateItem', { item: item, params: response.data });
            this.finishUpdateItem();
        },

        failedUpdateItem: function(error) {
            u.clog('failed');
            this.finishUpdateItem();
        },

        finishUpdateItem: function() {
            u.clog('finish');
            this.$store.commit('finishUpdateItem');
        }
    }
}
</script>
