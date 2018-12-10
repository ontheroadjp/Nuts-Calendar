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
            <div @click.stop="clickDuplicate($event)" @dblclick="">
                <span class="fa fa-files-o"></span></div>

            <div @click.stop="clickEdit($event)" @dblclick="">
                <span class="fa fa-pencil"></span></div>

            <div @click.stop="clickDelete($event)" @dblclick="">
                <span class="fa fa-trash"></span></div>
        </div>
    </div>

    <div :id="'item-tippy-delete-confirm-contents-' + item.id"
        style="display: flex;
                justify-content: center;
                width: 120px;
                color: #fff;
                margin-top: -7px;
    ">
        <div style="margin: 5px 0;" >
            <i class="fa fa-exclamation-circle" style="font-size: 1.4rem;" ></i>
        </div>

        <div style="display: flex; justify-content: space-around; align-items: center" >
            <button
                class="button strip hover-underline"
                style="color: #fff; font-size: 0.9rem;"
                @click.stop="clickDeleteOK"
                :disabled="remove.isLoading"
            >OK</button>
            <button
                class="button strip hover-underline"
                style="color: #fff; width: 40%; font-size: 0.8rem"
                @click.stop="clickDeleteCancel"
                :disabled="remove.isLoading"
            >Cancel</button>
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
            v-if="item.type_id === 1 && toolPalette.isEventItemShow"
            :cellItems="cellItems"
            :item="item"
            :isLoading="(duplicatingItem == item) && duplicateIsLoading"
        >
            <span :style="searchHighlightStyle">{{ item.content }}</span>
        </event-item>

        <task-item
            v-if="item.type_id === 2 && toolPalette.isTaskItemShow"
            :cellItems="cellItems"
            :item="item"
            :isLoading="(duplicatingItem == item) && duplicateIsLoading"
        >
            <span :style="searchHighlightStyle">{{ item.content }}</span>
        </task-item>

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

    props: {
        cellItems: { type: Array, required: true },
        item: { type: Object, required: true }
    },

    data() {
        return {
            tippy: '',
            isTippyShown: false,
            itemMenuTemplate: '',
            itemDeleteConfirmTemplate: ''
        }
    },

    computed: {
        ...mapState('calendar/tableView', {
            toolPalette: state => state.toolPalette,
        }),

//        ...mapState('calendar/tableView/item/insert', {
        ...mapState('item/insert', {
            duplicatingItem: state => state.duplicatingItem,
            duplicateIsLoading: state => state.isLoading
        }),

//        ...mapState('calendar/tableView/item', {
        ...mapState('item', {
            remove: state => state.remove
        }),

        searchHighlightStyle: function() {
            if( this.toolPalette.query.search != ''
                    && this.item.content.toLowerCase().indexOf(
                        (this.toolPalette.query.search).toLowerCase()
                    ) != -1) {
                return { backgroundColor: '#FFEB3B' }
            }
            return {}
        }
    },

    methods: {
//        ...mapActions('calendar/tableView/item', {
        ...mapActions('item', {
            insertReset: 'insert/reset',
            duplicate: 'insert/duplicate',
            updatePrepare: 'update/prepare',
            updatePrepareModal: 'update/prepareModal',
            removePrepare: 'remove/prepare',
            exRemove: 'remove/remove'
        }),

        clickItem: function() {
            this.showTippy();
        },

        showTippy: function(value = true) {
            value ? this.tippy.show() : this.tippy.hide();
        },

        clickDuplicate: function() {
            this.showTippy(false);
            this.duplicate({
                item: this.item,
                cellItems: this.cellItems
            });
        },

        fixScroll: function() {
            const top = (window.scrollY * -1) + 'px';
            document.body.style.position = 'fixed';
            document.body.style.top = top;
        },

        clickEdit: function(e) {
            this.showTippy(false);
            this.insertReset();
            this.fixScroll();

            this.updatePrepareModal( { event: e } );

            this.updatePrepare({
                cellItems: this.cellItems,
                editingItem: this.item
            });

            this.removePrepare({
                cellItems: this.cellItems,
                removingItem: this.item
            });

            this.$store.commit('dashboard/SET_VALUE', {
                key: 'disabled', value: true
            });
        },

        clickDelete: function() {
            let els = document.getElementsByClassName(
                'tippy-tooltip honeybee-theme'
            );
            els[0].classList.add('delete-confirm-tippy-tooltip');

            els = document.getElementsByClassName('tippy-arrow');
            els[0].classList.add('delete-confirm-arrow');

            this.tippy.set({
                content: this.itemDeleteConfirmTemplate,
//                arrow: false
            })
        },

        clickDeleteCancel: function() {
            this.showTippy(false);
        },

        clickDeleteOK: function() {
            this.showTippy(false);

            this.removePrepare({
                cellItems: this.cellItems,
                removingItem: this.item
            });
            this.exRemove();
        },

        initTippy: function() {
            const self = this;
            this.tippy = tippy.one('.item-tippy-' + this.item.id, {
                content(reference) {
                    // delete confirm tippy template
                    const deleteConfirmTemplate = reference.getAttribute(
                        'delete-confirm-template'
                    );

                    self.itemDeleteConfirmTemplate = document.getElementById(
                        deleteConfirmTemplate
                    );

                    // item menu tippy template
                    const menuTemplate = reference.getAttribute(
                        'data-template'
                    );

                    self.itemMenuTemplate = document.getElementById(
                        menuTemplate
                    );

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
                onHide: () => {
                    let els = document.getElementsByClassName(
                        'tippy-tooltip honeybee-theme'
                    );
                    els[0].classList.remove('delete-confirm-tippy-tooltip');

                    els = document.getElementsByClassName('tippy-arrow');
                    els[0].classList.remove('delete-confirm-arrow');

                    const self = this;
                    setTimeout(() => {
                        self.tippy.set({
                            content: this.itemMenuTemplate,
                            arrow: true
                        })
                    }, 1000);
                },
                onHidden: () => {
                    this.isTippyShown = false;
                }
            });

            this.tippy.setContent(self.itemMenuTemplate);
        }
    },

    mounted() {
        if( !this.tippy ) {
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

.delete-confirm-tippy-tooltip {
    background-color: red !important;
    /* height: 100px !important; */
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
}

.delete-confirm-arrow {
    border-top-color: red !important;
}
</style>
