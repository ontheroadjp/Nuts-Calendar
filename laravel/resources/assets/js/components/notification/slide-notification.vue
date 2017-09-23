<template>
<slide-panel v-if="isActive" :bgColor="bgColor" :height="height">
    <div class="panel-body">
<!--
    <div style="display: flex; justify-content: center; align-items: center; height: 75%;">
        <i v-if="type === 'success'" class="fa fa-check-circle fa-3x"></i>
        <i v-else-if="type === 'danger' || type === 'failed'" class="fa fa-exclamation-circle fa-3x"></i>
-->
        <icon :type="type" :size=3></icon>
        <div style="padding-left: 10px;"
            v-text="message ? message : defaultMessage"
        ></div>
    </div>

    <div class="buttons">
        <button class="button strip"
            style="color:#fff"
            @click="clickClose()"
        >OK</button>
    </div>
</slide-panel>
</template>

<script>
import slidePanel from '../panel/slide-panel.vue';
import icon from './notification-icon.vue';

export default {
    components: { slidePanel, icon },

    props: {
        type:     { type: String, required: true, validator: function(value) {
                         const expectation = [
                             'success', 'info', 'warning', 'danger', 'failed'
                         ];
                         return expectation.indexOf(value) > -1;
                  }},
        height:   { type: String, default: '300px' },
        isActive: { type: Boolean, required: true },
        message:  { type: String, required: false }
    },

    computed: {
        bgColor: function() {
            switch(this.type) {
                case "success": return '#23d160'; break;
                case "info":    return '#3273dc'; break;
                case "warning": return '#ffdd57'; break;
                case "danger":  return '#ff3860'; break;
                case "failed":  return '#ff3860'; break;
            }
        },

        defaultMessage: function() {
            return this.type.toUpperCase();
        }
    },

    methods: {
        clickClose() {
            this.$emit('close');
        }
    }
};
</script>

<style lang="scss" scoped>
.panel-body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75%;
}

.buttons {
    display: inline-flex;
    justify-content: space-around;
    width: 100%;
}
</style>
