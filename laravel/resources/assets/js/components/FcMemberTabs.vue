<template>
    <div class="card" style="width: 70%;">

        <div class="panel-heading">
            Column Settings
        </div>

        <div class="tabs is-toggle is-fullwidth">
            <ul>
                <li v-for="tab in $store.state.members" :class="{ 'is-active': tab.id == selectedTab }">
                    <a href="#" @click="selectTab(tab.id)">
                        <span class="icon is-small">
                            <i class="fa fa-user"></i>
                        </span>{{ tab.name }}
                    </a>
                </li>
                <li :class="{ 'is-active': isNewTabSelected }">
                    <a href="#" @click="selectTab()">
                        <span class="icon is-small">
                            <i class="fa fa-plus"></i>
                        </span>Add New Member
                    </a>
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

        <footer v-if="!isNewTabSelected" class="card-footer">
            <a class="card-footer-item"
                @click="resetFields()"
                v-show="isFieldsValueChanged"
            >
                <span class="icon is-small">
                    <i class="fa fa-undo"></i>
                </span>Reset</a>

            <a class="card-footer-item"
                @click="editUpdateMember()"
                v-show="isFieldsValueChanged && !isFieldsEmpty"
            >
                <span class="icon is-small">
                    <i class="fa fa-floppy-o"></i>
                </span>Save</a>

            <a class="card-footer-item"
                @click="deleteMember()"
               ><span class="icon is-small"><i class="fa fa-trash"></i></span>Delete</a>

            <a class="card-footer-item"
                @click="close"
               ><span class="icon is-small"><i class="fa fa-times"></i></span>Close</a>
        </footer>

        <footer v-else class="card-footer">
            <a class="card-footer-item"
                @click="insertMember()"
                v-show="isFieldsValueChanged && !isFieldsEmpty"
            >
                <span class="icon is-small">
                    <i class="fa fa-floppy-o"></i>
                </span>Add</a>

            <a class="card-footer-item"
                @click="close"
               ><span class="icon is-small"><i class="fa fa-times"></i></span>Close</a>
        </footer>

    </div>
</template>

<script>
    import VueResource from 'vue-resource';
    import memberApi from '../api/MemberApi.js';

    export default {

        mixins: [
            memberApi
        ],

        data() {
            return {

                fields: {
                    name: '',
                    color: ''
                },

                old_values: {
                    name: '',
                    color: ''
                },

            }
        },

        computed: {
//            tabs: function() {
//                return this.$store.state.members;
//            },

            isActive: function() {
                return this.$store.state.membersModal.isActive;
            },
            
            selectedTab: function() {
                return this.$store.state.membersModal.selectedTab;
            },

            isNewTabSelected: function() {
//                return this.selectedTab == this.columnMaxKey + 1;
                return this.selectedTab == this.newColumnKey;
            },

            isFieldsEmpty: function() {
                return (this.fields.name == '') || (this.fields.color == '');
            },

            isFieldsValueChanged: function() {
                return (this.fields.name != this.old_values.name) ||
                        (this.fields.color != this.old_values.color);
            },

//            columnMaxKey: function() {
//
//                let keys = Object.keys(this.$store.state.members);
//
//                keys.map(function(key) {
//                    return parseInt(key);
//                });
//
//                return Math.max.apply(null, keys);
//            },

            newColumnKey: function() {
                return this.$store.getters.newColumnKey;
            }
        },

        watch: {

            'isActive': function() {
                if(!this.isActive) {
//                    this.$store.commit('setMembersModalSelectedTab', this.columnMaxKey + 1) 
                    this.$store.commit('setMembersModalSelectedTab', this.newColumnKey) 
                }
            },

            'selectedTab': function() {
                let tabs = this.$store.state.members;
//                if(this.selectedTab != this.columnMaxKey + 1) {
                if(this.selectedTab != this.newColumnKey) {
                    this.fields.name = tabs[this.selectedTab].name;
                    this.fields.color = tabs[this.selectedTab].color;
                    this.old_values.name = this.fields.name;
                    this.old_values.color = this.fields.color;
                } else {
                    this.fields.name = '';
                    this.fields.color = '';
                    this.old_values.name = '';
                    this.old_values.color = '';
                }
            }
        },

        methods: {

//            addMember() {
//                this.tabs.push({name: this.fields.name, color: this.fields.color});
//            },

            selectTab(index) {
                index == null
//                    ? this.$store.commit('setMembersModalSelectedTab', this.columnMaxKey + 1) 
                    ? this.$store.commit('setMembersModalSelectedTab', this.newColumnKey) 
                    : this.$store.commit('setMembersModalSelectedTab', parseInt(index));
            },

            resetFields() {
                this.fields.name = this.old_values.name;
                this.fields.color = this.old_values.color;
            },

            close() {
                this.$store.commit('setMembersModalIsActive', false);
            },

        },

//        created() {
//            const self = this;
//
//            nutsHub.listen('memberUpdateFailed', function(Object) {
//                self.fields.name = Object.response.data.name;
//                self.fields.color = Object.response.data.color;
//            }, 'FcMemberTabs.vue')
//        }

    } 
</script>

<style>
.tab-contents {
    width: 100%;
    margin: 20px;
} 
</style>
