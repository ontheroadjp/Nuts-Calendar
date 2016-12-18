<template>
    <div>
        <div class="tabs is-toggle is-fullwidth">
            <ul>
                <li v-for="(index, tab) in tabs" :class="{ 'is-active': index == selected_tab }">
                    <a href="#" @click="selectTab(index)">{{ tab.name }}</a>
                </li>
                <li :class="{ 'is-active': selected_tab == column_max_key() + 1 }">
                    <a href="#" @click="selectTab(column_max_key() + 1)">New</a>
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
                        v-model="fields.name | nameValidator"
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
                        v-model="fields.color | colorValidator"
                    >
                </div>
            </div>
            
        </div><!-- // ./tab-contents -->

        <footer v-if="!is_new_tab" class="card-footer">
            <a
                class="card-footer-item"
                @click="resetFields()"
                v-show="is_value_changed"
            >Reset</a>

            <a
                class="card-footer-item"
                @click="editUpdateMember()"
                v-show="is_value_changed && !is_empty"
            >Save</a>

            <a
                class="card-footer-item"
                @click="deleteMember()"
            >Delete</a>

            <a
                class="card-footer-item"
                @click="this.$root.$emit('close-members-modal')"
            >Cancel</a>
        </footer>

        <footer v-else class="card-footer">
            <a
                class="card-footer-item"
                @click="insertMember()"
                v-show="is_value_changed && !is_empty"
            >Add</a>

            <a
                class="card-footer-item"
                @click="this.$root.$emit('close-members-modal')"
            >Cancel</a>
        </footer>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabs: '',
                selected_tab: '',
                fields: {
                    name: '',
                    color: ''
                },
                old_values: {
                    name: '',
                    color: ''
                },
                validation: {
                    name: false,
                    color: false,
                }
            }
        },

        props: {
            debug: {
                type: Boolean,
                default: false
            }
        },

        filters: {
            nameValidator: {
                write: function (val) {
                    this.validation.name = !!val
                    return val
                }
            },

            colorValidator: {
                write: function (val) {
                    this.validation.color = !!val
                    return val
                }
            },
        },


        computed: {
            is_new_tab: function() {
                return this.selected_tab == this.column_max_key() + 1 ? true : false;
            },

            is_empty: function() {
                return (this.fields.name == '') || (this.fields.color == '');
            },

            is_value_changed: function() {
                return (this.fields.name != this.old_values.name) ||
                        (this.fields.color != this.old_values.color);
            },
        },

        methods: {
            column_max_key() {

                var keys = Object.keys(this.tabs);
                keys.map(function(key) {
                    return parseInt(key);
                });

                return Math.max.apply(null, keys);
            },

            selectTab(index) {
                console.log(Object.keys(this.tabs));
                console.log(Math.max(parseInt(Object.keys(this.tabs))));
                if(index == '') index = this.column_max_key() + 1;
                this.selected_tab = parseInt(index);
                this.setFields();
            },

            setFields() {
                if(this.selected_tab != this.column_max_key() + 1) {
                    this.fields.name = this.tabs[this.selected_tab].name;
                    this.fields.color = this.tabs[this.selected_tab].color;
                    this.old_values.name = this.fields.name;
                    this.old_values.color = this.fields.color;
                } else {
                    this.fields.name = '';
                    this.fields.color = '';
                    this.old_values.name = '';
                    this.old_values.color = '';
                }
            },

            resetFields() {
                this.fields.name = this.old_values.name;
                this.fields.color = this.old_values.color;
            },

            // -----------------------------------------------------------------------
            // Insert: Update
            insertMember: function () {

                var new_member = {
                    name: this.fields.name,
                    color: this.fields.color,
                };

                var url = '/api/member';
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');

                this.$http({
                    url: url,
                    method: 'POST',
                    body: new_member
                }).then(
                    function(response) {
                        this.tabs[this.column_max_key + 1] = response.data;

                        this.$root.fetchData();

                        this.$root.$emit('nuts-alert', 'Success - Add new member!', 'is-success');
                        console.log('Inserted!');

                    }, function(response) {
                        this.$root.$emit('nuts-alert', 'failed - add new member!', 'is-danger');
                    }
                )
            },

            // -----------------------------------------------------------------------
            // Edit: update
            editUpdateMember: function() {

                var updated_member = {
                    name: this.fields.name,
                    color: this.fields.color
                };

                var url = '/api/member/' + this.selected_tab;
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');

                this.$http({
                    url: url,
                    method: 'PATCH',
                    body: updated_member

                }).then(
                    function(response) {
                        this.tabs[this.selected_tab].name = this.fields.name;
                        this.tabs[this.selected_tab].color = this.fields.color;

                        this.$root.fetchData();

                        this.$root.$emit('nuts-alert', 'Updateed!', 'is-success');
                        console.log('updated!');

                    }, function(response) {
                        this.fields.name = this.tabs[this.selected_tab].name;
                        this.fields.color = this.tabs[this.selected_tab].color;
                        this.$root.$emit('nuts-alert', 'failed - update!', 'is-danger');
                    }
                )
            },

            // -----------------------------------------------------------------------
            // Delete
            deleteMember: function() {
                var url = '/api/member/' + this.selected_tab;
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content')
    
                this.$http({
                    url: url,
                    method: 'DELETE',
                }).then(
                    function(response) {
                        delete this.tabs[this.selected_tab];

                        this.$root.$emit('nuts-alert', 'success - delete!', 'is-success');
                        console.log('success: delete event (id:event.id)');

                    }, function(response) {
                        this.$root.$emit('nuts-alert', 'failed - delete!', 'is-danger');
                    }
                )
            },

        },

        created() {
            var self = this;

            this.$root.$on('members_fetched',function() {
                console.log('$on@NutsTags - members_fetched(' + ')');
                self.tabs = self.$root.$data.members;
                self.selectTab(self.selected_tab)
            });

            this.$root.$on('open-member-modal',function(index) {
                console.log('$on@NutsTags - member_tab_opened(' + index + ')');
                self.selectTab(index);
            });

            this.$root.$on('members-modal-opened',function() {
                console.log('$on@NutsTags - members-modal-opened()');
                self.setFields();
            });

            this.$root.$on('members-modal-closed',function() {
                console.log('$on@NutsTags - members-modal-closed()');
                self.selectTab(self.column_max_key() + 1);
            });

            this.$root.$on('member-edit-button',function() {
                if(self.is_value_changed) {
                    console.log('$on@NutsTags - member-edit-button()');
                    var member = {
                        id: self.tabs[self.selected_tab].id,
                        name: self.fields.name,
                        color: self.fields.color
                    }
                    self.$root.editUpdateMember(member);
                }
            });

            this.$root.$on('member-delete-button',function() {
                console.log('$on@NutsTags - member-delete-button()');
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
