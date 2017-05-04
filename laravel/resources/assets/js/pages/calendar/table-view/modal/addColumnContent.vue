<template>
<div>
<button class="modal-close" @click="close()"></button>
<div class="modal-card">
    <header class="modal-card-head">
        <p class="modal-card-title">Add new member</p>
        <button class="delete" @click="close()"></button>
    </header>
    <section class="modal-card-body">

        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" type="text" v-model="input.name" placeholder="Name">
            </div>
        </div>

    </section>
    <footer class="modal-card-foot">
        <a class="button {{ theme.primary.class }}" @click="ok()">Save changes</a>
        <a class="button" @click="close()">Cancel</a>
    </footer>
</div><!-- // .modal-card -->
</div>
</template>

<script>
import memberApi from '../../../../services/member.js';

export default {
    props: [
        'isActive', 'memberId'
    ],

    mixins: [
        memberApi
    ],

    data() {
        return {
            input: {
                name: '',
                isShow: false,
                order: '',
            }
        }
    },

    computed: {
        members: function() {
            return this.$store.state.calendar.data.members;
        },

        theme: function() {
            return this.$store.state.app.theme;
        }
    },

    methods: {
        ok: function() {
            const payload = {
                name: this.input.name,
                order: Object.keys(this.members).length + 1,
            }
            this.execInsertMember(this.$store.state.calendar.currentId, payload);
            this.close();
        },

        close: function() {
            this.isActive = false;
            this.column = null;
        },
    },

    watch: {
        'memberId': function(oldVal, newVal) {
            if(oldVal == '') return;
            this.input.name = this.members[this.memberId].name;
            this.input.isShow = this.members[this.memberId].isShow;
            this.input.order = this.members[this.memberId].order;
        }
    },
}
</script>
