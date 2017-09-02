<template>
<!--
<div>
<button class="modal-close" @click="close()"></button>
<div class="modal-card">
    <header class="modal-card-head">
        <p class="modal-card-title">Member Edit</p>
        <button class="delete" @click="close()"></button>
    </header>
    <section class="modal-card-body">

        <div class="field">
            <label class="label">Select column</label>
            <div class="control">
                <span class="select">
                    <select v-model="memberId">
                        <option 
                            v-for="member in members" 
                            :value="member.id"
                        >{{ member.name }}
                        </option>
                    </select>
                </span>
                <span class="is-pulled-right">
                    <input 
                        id="is-show" 
                        class="nuts-input-checkbox" 
                        type="checkbox" 
                        v-model="input.isShow"
                    >
                    <label for="is-show">Display</label>
                </span>
            </div>
        </div>
        
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" type="text" v-model="input.name" placeholder="Name">
            </div>
        </div>

        <div class="field">
            <label class="label">Order</label>
            <div class="control">
                <span class="select">
                    <select v-model="input.order">
                        <option v-for="member in members">
                        {{ member.order }}
                        </option>
                    </select>
                </span>

            </div>
        </div>

    </section>
    <footer class="modal-card-foot">
        <a :class="['button', theme.primary.class]" @click="ok()">Save changes</a>
        <a class="button" @click="close()">Cancel</a>
    </footer>
</div>
</div>
-->
</template>

<script>
import { mapState } from 'vuex';
import { focus } from '../../../directives/focus.js';

//export default {
//    name: 'edit-column-modal-content',
//
//    directives: { focus },
//
//    computed: {
//        ...mapState({
//            members: state => state.calendar.data.members,
//            memberId: state => state.calendar.behavior.column.editingColumnId,
//            theme: state => state.app.theme
//        })
//    },
//
//    methods: {
//        ok: function() {
//            this.execUpdateMember(this.memberId, this.input.name);
//            this.close();
//        },
//
//        close: function() {
//            this.input.name = '';
//            this.input.order = '';
//
//            const payload = {
//                isEditing: false,
//                editingColumnId: null
//            }
//            this.$store.commit('toggleColumnEditing', payload);
//        }
//    }
//}
</script>

<style lang="scss" scoped>
    /* empty */
</style>
