<template>
    <div class="card" style="width: 70%;">

        <div class="tabs is-toggle is-fullwidth">
            <ul>
                <li v-for="tab in tabs" :class="{ 'is-active': tab.id == selectedTab }">
                    <a href="#" @click="selectTab(tab.id)">{{ tab.name }}</a>
                </li>
                <li :class="{ 'is-active': isNewTab }">
                    <a href="#" @click="selectTab()">New</a>
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
                        v-model="fields.name"
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
                        v-model="fields.color"
                    >
                </div>
            </div>
            
        </div><!-- // ./tab-contents -->

        <footer v-if="!isNewTab" class="card-footer">
            <a class="card-footer-item"
                @click="resetFields()"
                v-show="isValueChanged"
            >Reset</a>

            <a class="card-footer-item"
                @click="editUpdateMember()"
                v-show="isValueChanged && !isEmpty"
            >Save</a>

            <a class="card-footer-item"
                @click="deleteMember()"
            >Delete</a>

            <a class="card-footer-item"
                @click="close"
            >Cancel</a>
        </footer>

        <footer v-else class="card-footer">
            <a class="card-footer-item"
                @click="insertMember()"
                v-show="isValueChanged && !isEmpty"
            >Add</a>

            <a class="card-footer-item"
                @click="close"
            >Cancel</a>
        </footer>

    </div>
</template>

<script>

    import alertMixin from '../mixins/Alert.js';

    export default {

        mixins: [
            alertMixin
        ],

        data() {
            return {
                tabs: '',
                selectedTab: '',
                fields: {
                    name: '',
                    color: ''
                },
                old_values: {
                    name: '',
                    color: ''
                },
                //validation: {
                //    name: false,
                //    color: false,
                //}
            }
        },

        props: {
            debug: {
                type: Boolean,
                default: false
            }
        },

//        filters: {
//            nameValidator: {
//                write: function (val) {
//                    this.validation.name = !!val
//                    return val
//                }
//            },
//
//            colorValidator: {
//                write: function (val) {
//                    this.validation.color = !!val
//                    return val
//                }
//            },
//        },


        computed: {
            isNewTab: function() {
                return this.selectedTab == this.columnMaxKey + 1;
            },

            isEmpty: function() {
                return (this.fields.name == '') || (this.fields.color == '');
            },

            isValueChanged: function() {
                return (this.fields.name != this.old_values.name) ||
                        (this.fields.color != this.old_values.color);
            },

            columnMaxKey: function() {

                var keys = Object.keys(this.tabs);
                keys.map(function(key) {
                    return parseInt(key);
                });

                return Math.max.apply(null, keys);
            },
        },

        methods: {

            selectTab(index) {
                index == null
                    ? this.selectedTab = this.columnMaxKey + 1 
                    : this.selectedTab = parseInt(index);
                this.setFields();
            },

            setFields() {
                if(!this.isNewTab) {
                    this.fields.name = this.tabs[this.selectedTab].name;
                    this.fields.color = this.tabs[this.selectedTab].color;
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

            close() {
                nutsHub.fire('close-members-modal', {}, 'FcMemberTabs.vue');
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
                        this.tabs[this.columnMaxKey + 1] = response.data;

                        this.$root.fetchData();

                        this.alertSuccess( 'Success: add new member!', false, 'FcMemberTabs.vue' );

                    }, function(response) {
                        this.alertDanger( 'Failed: add new member!', false, 'FcMemberTabs.vue' );

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

                var url = '/api/member/' + this.selectedTab;
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');

                this.$http({
                    url: url,
                    method: 'PATCH',
                    body: updated_member

                }).then(
                    function(response) {
                        this.tabs[this.selectedTab].name = this.fields.name;
                        this.tabs[this.selectedTab].color = this.fields.color;

                        this.$root.fetchData();

                        this.alertSuccess( 'Success: member updated!', false, 'FcMemberTabs.vue' );

                    }, function(response) {
                        this.fields.name = this.tabs[this.selectedTab].name;
                        this.fields.color = this.tabs[this.selectedTab].color;

                        this.alertDanger( 'Failed: member updated!', false, 'FcMemberTabs.vue' );

                    }
                )
            },

            // -----------------------------------------------------------------------
            // Delete
            deleteMember: function() {
                var url = '/api/member/' + this.selectedTab;
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content')
    
                this.$http({
                    url: url,
                    method: 'DELETE',
                }).then(
                    function(response) {
                        delete this.tabs[this.selectedTab];

                        //this.$root.$emit('nuts-alert', 'success - delete!', 'is-success');
                        this.alertSuccess( 'Success: member deleted!', false, 'FcMemberTabs.vue' );

                    }, function(response) {
                        this.alertDanger( 'Failed: member deleted!', false, 'FcMemberTabs.vue' );

                    }
                )
            },

        },

        created() {
            var self = this;

            nutsHub.listen('members-updated', function(Object) {
                self.tabs = Object.members;
                //self.selectTab(self.selectedTab)
            }, 'FcMemberTabs.vue');

            nutsHub.listen('open-members-modal', function(Object) {
                self.selectTab(Object.index);
            }, 'FcMemberTabs.vue');

            nutsHub.listen('close-members-modal', function() {
                self.selectTab(self.columnMaxKey + 1);
            }, 'FcMemberTabs.vue');

            nutsHub.listen('member-edit-button', function() {
                if(self.isValueChanged) {
                    var member = {
                        id: self.tabs[self.selectedTab].id,
                        name: self.fields.name,
                        color: self.fields.color
                    }
                    self.$root.editUpdateMember(member);
                }
            }, 'FcMemberTabs.vue');

            nutsHub.listen('member-delete-button', function() {
                console.log('Nothing to do');
            }, 'FcMemberTabs.vue');
        }
    } 
</script>

<style>
.tab-contents {
    width: 100%;
    margin: 20px;
} 
</style>
