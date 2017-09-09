<template>
<!--
<modal v-if="isActive">
-->
<modal>
    <div class="modal-card">

        <section class="modal-card-body" 
            style="padding: 40px;" 
            :style="[style.bgPrimary]">

            <button 
                class="delete" 
                style="position: absolute; top: 20px; right: 20px;"
                aria-label="close" 
                @click="clickClose()"
            ></button>

            <table style="width:100%">
                <tr>
                    <td rowspan="3" style="width: 70px">
                        <span class="fa-stack fa-lg">
                            <i class="fa fa-calendar fa-2x" 
                                style="margin-left:1px; color: #fff"></i>
                        </span>
                    </td>
                </tr>
                <slot name="header"></slot>
            </table>
        </section> 

        <section class="modal-card-body thin" style="padding: 60px">
            <slot name="body"></slot>
        </section>
    </div>
</modal>
</template>

<script>
import { mapState } from 'vuex';
import modal from './modal.vue';

export default {
    components: {
        modal
    },

    props: {
//        isActive: { type: Boolean, required: true },
//        isActiveSync: { type: Boolean, required: true },
        onClose: { type: Function, required: true }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        style: function() {
            return {
                bgPrimary: {
                    'background-color': this.theme.primary.code,
                    'color': 'white'
                }
            }
        }
    },

    methods: {
        clickClose: function() {
            this.onClose();
//            this.$emit('update:isActiveSync', !this.isActiveSync);
        },
    }
} 
</script>
