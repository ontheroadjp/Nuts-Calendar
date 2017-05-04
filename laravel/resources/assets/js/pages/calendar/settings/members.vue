<template>
<div class="container" style="width: 100%; height: 100vh">
<div class="columns">
<div class="column">
    
    <div class="box">
        <button class="button is-outlined {{ theme.primary.class }}">Add New Member</button>
    </div>

    <div class="box" style="padding: 60px">

    <template v-for="(index, member) in members">

        <div 
            id="order-{{member.order}}"
            class="box" 
            style="position:relative; cursor:move; margin-bottom:0px;"
            :style="[dnd.draggingItem === member ? dnd.style.dragStart : '']"
            draggable="true"
            @dragStart="handleDragStart(member)"
            @dragEnd="handleDragEnd()"
        >
            <template v-if="editingItem !== member">
                <span class="panel-icon" style="position:relative; top:4px;">
                    <i class="fa fa-user"></i>
                </span>
                <span>{{member.name}} - (id: {{member.id}}, order: {{member.order}})</span>

                <button 
                    class="button is-pulled-right" 
                    style="top: -5px"
                    @click="beEditing(member)"
                ><i class="fa fa-pencil"></i>
                </button>
            </template>

            <template v-else>
                <div class="control has-icon">
                    <input 
                        class="nuts-input-textbox is-small" 
                        type="text" 
                        style="width: 60%"
                        placeholder="{{ nameHasError ? error.name : 'Name' }}"
                        v-model="input.name"
                        v-focus
                    >
                    <span class="icon" :style="[namelHasError ? style.error : '']">
                        <i class="fa fa-user"></i>
                    </span>
                </div>

                <button 
                    class="button {{ theme.secondary.class }}" 
                    style="position:absolute; right:100px; top:24px;"
                    @click="updateMember(member)"
                >
                    <span class="icon is-small">
                        <i class="fa fa-save"></i>
                    </span><span>Save</span>
                </button>

                <button 
                    class="button" 
                    style="position:absolute; right:5px; top:24px;"
                    @click="cancelUpdate()"
                >
                    <span class="icon is-small">
                        <i class="fa fa-close"></i>
                    </span><span>Cancel</span>
                </button>

            </template>

        </div><!-- // .box -->
 
        <div 
            id="droparea-{{index}}"
            class="drop-area"
            @dragEnter="handleDragEnter(member, index)"
        ></div>

        <div 
            v-show="dnd.dropAreaIndex === index"
            @dragOver="handleDragOver($event)"
            @dragLeave="handleDragLeave()"
            @drop="handleDrop($event, member)"
            transition="members-dnd-fade" 
        >index: {{index}}</div>

    </template><!-- // v-for -->

    </div>

</div><!-- // .column is-x -->
</div><!-- // .columns -->
</div><!-- // .container -->
</template>

<script>
    import calendarApi from '../../../services/calendar.js';
    import memberApi from '../../../services/member.js';

    export default {
        mixins: [
            calendarApi, memberApi
        ],

        data() {
            return {
                selected: '',
                editingItem: '',
                input: {
                    name: '',
                    order: '',
                    isShow: '',
                },
                dnd: {
                    draggingItem: '',
                    dragEnterItem: '',
                    dropAreaIndex: '',
                    style: {
                        dragStart: {
                            opacity: '0.4'
                        },
                        dragEnter: {
                            padding: '20px 0',
                            border: '2px dotted red',
                            'border-radius': '5px',
                        },
                        dragLeave: {
                            padding: '5px 0',
                        }
                    },
                }
            }
        },

        computed: {
            theme: function() {
                return this.$store.state.app.theme;
            },

            currentCalendarId: function() {
                return this.$store.state.calendar.currentId;
            },

            members: function() {
                return this.$store.state.calendar.data.members;
            },
        },

        methods: {
            beEditing(item) {
                this.input.name = item.name;
                this.editingItem = item;
            },

            updateMember(item) {
                u.clog('updateMember()');
                this.execUpdateMember(item.id, this.input.name);
            },

            cancelUpdate() {
                this.editingItem = '';
            },

            handleDragStart(item) {
                u.clog('dragStart: ' + item);
                this.dnd.draggingItem = item;
            },

            handleDragEnter(item, index) {
                u.clog('dragEnter: ' + item);
                this.dnd.dragEnterItem = item;
                this.dnd.dropAreaIndex = index;
            },

            handleDragLeave() {
                u.clog('dragLeave');
                this.dnd.dragEnterItem = '';
                this.dnd.dropAreaIndex = '';
            },

            handleDragOver(e) {
                u.clog('dragOver: ' + e);
                if (e.preventDefault) {
                    e.preventDefault();
                }

                e.dataTransfer.dropEffect = 'move';

                return false;
            },

            handleDrop(e, item) {
                u.clog('drop - item: ' + this.dnd.draggingItem.id);
                u.clog('drop - dest: ' + item.id);
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                this.$store.commit('deleteMember', this.dnd.draggingItem.id);
                this.initDraggingProperties();

                return false;
            },

            handleDragEnd() {
                u.clog('dragEnd');
                this.initDraggingProperties();
            },

            initDraggingProperties() {
                u.clog('initDraggingProperties()');
                this.dnd.draggingItem = '';
                this.dnd.dragEnterItem = '';
                this.dnd.dropAreaIndex = '';
            }

        },

        ready() {
            const keys = Object.keys(this.members);
            u.clog('key: ' + keys[0]);
            this.selected = keys[0];
        }

    }
</script>
<style lang='sass'>
.drop-area {
    padding:5px 0
}

    .members-dnd-fade-transition {
        transition: all .8s ease;
        z-index: 99999;
        padding: 20px 0;
        border: 2px dotted red;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    .members-dnd-fade-enter {
        padding: 0;
        opacity: 0;
    }
    .members-dnd-fade-leave {
        padding: 0;
        opacity: 0;
    }
</style>
