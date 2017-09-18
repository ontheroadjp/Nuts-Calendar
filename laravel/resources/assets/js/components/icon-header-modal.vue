<template>
<modal>
    <div class="modal-card">

        <section class="modal-card-header" 
            style="padding: 50px;" 
            :style="[headerStyle]">

            <button 
                class="delete" 
                style="position: absolute; top: 20px; right: 20px;"
                aria-label="close" 
                @click="onClose()"
            ></button>

            <table style="width:100%">
                <tr>
                    <td rowspan="3" style="width: 70px">
                        <span class="fa-stack fa-lg">
                            <i class="fa fa-2x" :class="icon"
                                style="margin-left:1px; color: #fff"></i>
                        </span>
                    </td>
                </tr>
                <slot name="header"></slot>
            </table>
        </section> 

        <section class="modal-card-body" style="padding: 60px">
            <slot name="body"></slot>
        </section>
    </div>
</modal>
</template>

<script>
//import { mapState } from 'vuex';
import modal from './modal.vue';

export default {
    components: { modal },

    props: {
        icon:        { type: String, default: 'fa-user' },
        headerStyle: { type: String, default: 'background-color: #546e7a; color: #fff;' },
        opacity:     { type: Number, default: 0.85 },
        onClose:     { type: Function, required: true }
    }

//    computed: {
////        ...mapState({
////            theme: state => state.app.theme
////        }),
//
////        headerColor: function() {
////            return {
////                this.headerColor
//////                    'background-color': this.theme.primary.code,
//////                    'background-color': '#546e7a',
//////                    'color': 'white'
////            }
////        }
//    }
} 
</script>
