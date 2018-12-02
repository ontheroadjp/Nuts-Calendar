<template>
<span>
    <div :id="'item-tippy-contents-' + item.id">
        <div style="display: flex;
                    justify-content: space-between;
                    margin: 0 auto;
                    padding: 0 10px;
                    height: 25px;
                    width: 120px;
                    color: #fff;
                    border-radius: 5px;
        ">
            <div @click.stop="clickDuplicate($event)"><span class="fa fa-files-o"></span></div>
            <div @click.stop="clickEdit($event)"><span class="fa fa-pencil"></span></div>
            <div @click.stop="clickDelete($event)"><span class="fa fa-trash"></span></div>
        </div>
    </div>

    <div :id="'item-tippy-delete-confirm-contents-' + item.id">
        <div style="display: flex;
                    justify-content: space-between;
                    margin: 0 auto;
                    padding: 0 10px;
                    height: 25px;
                    width: 120px;
                    color: #fff;
                    border-radius: 5px;
        ">
            <div @click.stop="clickDeleteCancel">Cancel</div>
            <div @click.stop="clickDeleteOK">OK</div>
        </div>
    </div>


    <div :data-template="'item-tippy-contents-' + item.id"
         :delete-confirm-template="'item-tippy-delete-confirm-contents-' + item.id"
            class="item-tippy-contents"
            :class="'item-tippy-' + item.id"
            @click.stop="clickItem()"
            @dblclick.stop=""
    >
        <event-item
            v-if="isEventItem && item.type_id === 1"
            :cellItems="cellItems"
            :item="item"
            :isLoading="(duplicatingItem == item) && duplicateIsLoading"
        ></event-item>

        <task-item
            v-if="isTaskItem && item.type_id === 2"
            :cellItems="cellItems"
            :item="item"
            :isLoading="(duplicatingItem == item) && duplicateIsLoading"
        ></task-item>

    </div>
</span>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import eventItem from './event.vue';
import taskItem from './task.vue';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default {
    components: {
        eventItem, taskItem
    },

    props: [
        'cellItems', 'isEventItem', 'isTaskItem', 'item'
    ],

    data() {
        return {
            tippy: '',
            isTippyShown: false,
            itemMenuTemplate: '',
            itemDeleteConfirmTemplate: ''
        }
    },

    computed: {
        ...mapState('calendar/tableView/item/insert', {
            duplicatingItem: state => state.duplicatingItem,
            duplicateIsLoading: state => state.isLoading
        })
    },

    methods: {
        ...mapActions('calendar/tableView/item', {
            insertReset: 'insert/reset',
            duplicate: 'insert/duplicate',
            updatePrepare: 'update/prepare',
            updatePrepareModal: 'update/prepareModal',
            removePrepare: 'remove/prepare'
        }),

        clickItem: function() {
            this.showTippy();
//            setTimeout(() => { this.showTippy(false); }, 2000)
        },

        showTippy: function(value = true) {
            value && !this.isTippyShown ? this.tippy.show() : this.tippy.hide();
        },

        clickDuplicate: function() {
            u.clog('clickDuplicate(' + this.item.id + ')');
            this.showTippy(false);
            this.duplicate( {item: this.item, cellItems: this.cellItems} );
        },

        clickEdit: function(e) {
            this.showTippy(false);
            this.updatePrepare( { cellItems: this.cellItems, editingItem: this.item } );
            this.updatePrepareModal( { event: e } );
            this.insertReset();
            this.removePrepare( { cellItems: this.cellItems, deletingItem: this.item } );
            this.$store.commit('dashboard/SET_VALUE', {
                key: 'disabled', value: true
            });
        },

        clickDelete: function() {
            this.tippy.setContent(this.itemDeleteConfirmTemplate);
        },

        clickDeleteCancel: function() {
            u.clog('clickDeleteCancel();');
            this.showTippy(false);
            setTimeout(() => { this.tippy.setContent(this.itemMenuTemplate); }, 1000);
        },

        clickDeleteOK: function() {
            u.clog('clickDeleteOK();');
            this.showTippy(false);
            setTimeout(() => { this.tippy.setContent(this.itemMenuTemplate); }, 1000);
//            this.removePrepare( { cellItems: this.cellItems, deletingItem: this.item } );
        },

        onCloseDeleteConfirmModal: function() {
            this.isDeleteConfirmModalActive = false;
        },

        initTippy: function() {
            const self = this;
                this.tippy = tippy.one('.item-tippy-' + this.item.id, {
                    content(reference) {
                        const deleteConfirtTemplate = reference.getAttribute('delete-confirm-template');
                        self.itemDeleteConfirmTemplate = document.getElementById(deleteConfirtTemplate);

                        const menuTemplate = reference.getAttribute('data-template');
                        self.itemMenuTemplate = document.getElementById(menuTemplate);

                        return self.itemDeleteConfirmTemplate;
                    },
                    placement: 'top',
                    trigger: 'manual',
                    duration: 100,
                    arrow: true,
                    distance: 5,
                    interactive: true,
                    hideOnClick: true,
                    theme: 'honeybee',
                    onShown: () => {
                        this.isTippyShown = true;
                    },
                    onHidden: () => {
                        this.isTippyShown = false;
                    }
                });

                this.tippy.setContent(self.itemMenuTemplate);
        }
    },

    mounted() {
        if( !this.tippy) {
            this.$nextTick(() => {
                this.initTippy();
            });
        }
    }
}
</script>

<style lang="scss">
.tippy-tooltip.honeybee-theme {
/*    background-color: #b38d91; */
    height: 30px;
}

/*
.tippy-popper[x-placement^='top'] .tippy-tooltip.honeybee-theme .tippy-arrow {
    border-top-color: #b38d91;
}

.tippy-popper[x-placement^='bottom'] .tippy-tooltip.honeybee-theme .tippy-arrow {
    border-top-color: #b38d91;
}
*/

.item {
    display: inline-flex;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 3px;
    font-size: 0.75rem;
    vertical-align: top;
    width: 100%;
}

.item-tippy-contents {
    &:focus {
        outline: none;
    }
}

.delete-confirm {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    padding: 10px;
    color: #fff;
    text-align: center;
    overflow: hidden;
}

.delete-confirm-buttons {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
    & button.strip:hover {
        border: 1px solid #e6e6e6;
    }
}
</style>
