<template>
<span>
    <p class="title thin-200" :style="style.title">
        Nuts <strong>Calendar</strong>
    </p>

    <p class="subtitle thin" style="color: #fff">
        <small>
            Manage your task & events in easily, quickly and a fun!
        </small>
    </p>
</span>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        style: function() {
            return {
                title: {
                    'color': this.theme.secondary.code
                }
            }
        }
    }
}
</script>
