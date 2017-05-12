<template>
<div>
<button class="modal-close" @click="close()"></button>
<div class="modal-card">
    <header class="modal-card-head">
        <p class="modal-card-title">Add new member</p>
        <button class="delete" @click="close()"></button>
    </header>
    <section class="modal-card-body">
        <div style="padding: 60px; width: 100%;">

            <div class="field">
                <label class="label">Name</label>
                <div class="control has-icon">
                    <input 
                        class="nuts-input-textbox" 
                        type="text" 
                        style="margin-bottom: 25px;"
                        v-model="input.name" 
                        :placeholder="nameHasError ? error.name : 'Name'"
                        v-focus
                    >
                    <span class="icon is-small" :style="[nameHasError ? style.error : '']">
                        <i class="fa fa-user"></i>
                    </span>
                </div>
            </div>

        </div>
    </section>
    <footer class="modal-card-foot">
        <a :class="['button', theme.primary.class]" @click="ok()">Save changes</a>
        <a class="button" @click="close()">Cancel</a>
    </footer>
</div><!-- // .modal-card -->
</div>
</template>

<script>
import { mapState } from 'vuex';
import memberApi from '../../../../services/member.js';

export default {
    mixins: [
        memberApi
    ],

    computed: {
        ...mapState({
            currentCalendarId: state => state.calendar.currentId,
            members: state => state.calendar.data.members,
            theme: state => state.app.theme,
        }),
    },

    methods: {
        ok: function() {
            const name = this.input.name;
            const order = Object.keys(this.members).length + 1;
            this.execInsertMember(this.currentCalendarId, name, order);
            this.close();
        },

        close: function() {
            this.$store.commit('toggleColumnInserting', {
                isInserting: false,
                insertingColumnId: null
            });
        },
    },
}
</script>
