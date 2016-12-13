<template>
    <div>
        <div class="tabs is-toggle is-fullwidth">
            <ul>
                <li v-for="(index, tab) in tabs" :class="{ 'is-active': index == selected_tab }">
                    <a href="#" @click="selectTab(index)">{{ tab.name }}</a>
                </li>
            </ul>
        </div><!-- // .tabs -->
    
        <div class="tab-contents">
    
            <div class="form-group row">
                <label class="col-xs-2 col-form-label">Name</label>
                <div class="col-xs-8">
                    <input 
                        class="form-control" 
                        type="text" 
                        placeholder="Name is here"
                        v-model="edit_fields.name"
                    >
                </div>
            </div>
            
            <div class="form-group row">
                <label class="col-xs-2 col-form-label">Color</label>
                <div class="col-xs-8">
                    <input 
                        class="form-control" 
                        type="text" 
                        placeholder="Color is here"
                        v-model="edit_fields.color"
                    >
                </div>
            </div>
            
        </div><!-- // ./tab-contents -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabs: '',
                selected_tab: '',
                edit_fields: {
                    name: '',
                    color: ''
                },
            }
        },

        props: {
            debug: {
                type: boolean,
                default: false
            }
        },

        methods: {
            selectTab(index) {
                this.selected_tab = parseInt(index);
                this.setFields();
            },

            setFields() {
                //this.edit_fields.name = this.tabs[this.selected_tab].name;
                this.tabs[this.selected_tab].name != 'New'
                    ? this.edit_fields.name = this.tabs[this.selected_tab].name
                    : this.edit_fields.name = '';
                this.edit_fields.color = this.tabs[this.selected_tab].color;
            },

            addNewMemberTab() {
                this.tabs[this.column_length() + 1] = { name: 'New', color: '' };
            },

            column_length() {
                return parseInt(Object.keys(this.tabs).length);
            }
        },

        created() {
            var self = this;

            this.$root.$on('members_fetched',function() {
                console.log('$on@NutsTags - members_fetched(' + ')');
                self.tabs = self.$root.$data.members;
                self.addNewMemberTab();
                self.selected_tab == '' ? self.selected_tab = self.column_length() : '';
            });

            this.$root.$on('member_tab_selected',function(index) {
                console.log('$on@NutsTags - member_tab_opened(' + index + ')');
                self.selectTab(index);
            });

            this.$root.$on('members-modal-opened',function() {
                console.log('$on@NutsTags - members-modal-opened()');
                self.setFields();
            });

            this.$root.$on('members-modal-closed',function() {
                console.log('$on@NutsTags - members-modal-closed()');
                self.selectTab(self.column_length());
            });
        }
    } 
</script>

<style>
.tab-contents {
    width: 100%;
    margin: 20px;
} 
</style>
