<template>
<div>
<button class="modal-close" @click="close()"></button>
<div class="modal-card">
    <header class="modal-card-head">
        <p class="modal-card-title">Member ({{ members[memberId].name }}) Edit</p>
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
                            value="{{ member.id }}"
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
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </span>

            </div>
        </div>

    </section>
    <footer class="modal-card-foot">
        <a class="button {{ theme.primary.class }}">Save changes</a>
        <a class="button" @click="close()">Cancel</a>
    </footer>
</div><!-- // .modal-card -->
</div>
</template>

<script>
export default {
    props: [
        'isActive', 'memberId'
    ],

    data() {
        return {
            input: {
                name: '',
                isShow: false,
            }
        }
    },

    watch: {
        'memberId': function(oldVal, newVal) {
            if(oldVal == '') return;
            this.input.name = this.members[this.memberId].name;
        }
    },
    methods: {
        close: function() {
            this.isActive = false;
            this.column = null;
        },
    },

    computed: {
        members: function() {
            return this.$store.state.calendar.data.members;
        },

        theme: function() {
            return this.$store.state.app.theme;
        }
    }
}
</script>
