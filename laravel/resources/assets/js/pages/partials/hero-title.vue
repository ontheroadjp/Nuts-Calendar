<template>
<span>
    <p class="title thin-200" :style="titleStyle">
        Nuts <strong>Calendar</strong>
    </p>

    <p class="subtitle thin" :style="subtitleStyle">
        <small>
            Manage your task & events in easily, quickly and a fun!
        </small>
    </p>
</span>
</template>

<script>
import { mapState } from 'vuex';
import chroma from 'chroma-js';

export default {
    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('dashboard', {
            disabled: state => state.disabled
        }),

        titleStyle: function() {
            if( this.disabled ) {
                return { color: chroma(this.theme.secondary.code).alpha(0.5).css('hsl') }
            }

            return { color: this.theme.secondary.code }    
        },

        subtitleStyle: function() {
            if( this.disabled ) { 
                return {
                    color: 'rgba(242, 242, 242, 0.3)',
                    pointerEvents: 'none'
                }
            }

            return { color: 'rgb(242, 242, 242)' }
        }
    }
}
</script>
