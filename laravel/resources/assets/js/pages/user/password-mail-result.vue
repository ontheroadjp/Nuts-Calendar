<template>
<div class="panel" style="margin-top: 120px;">
    <div style="
        padding: 60px;
        width: 100%;
        text-align: center;
    ">
        <span>
            <i :class="['fa', 'fa-3x', 'fa-btn', icon]"></i> 
            <span style="font-size: 36px; margin-left: 20px;">{{ message }}</span>
        </span>
        <p v-if="status === 'failed'">
            <a @click="$parent.passwordMailResult = ''">{{ t('passwordMailResult.tryAgain') }}</a>
        </p>
    </div>
</div>
</template>

<script>
import core from '../../mixins/core.js';

export default {
    props: [
        'status'
    ],

    mixins: [
        core
    ],

    computed: {
        icon: function() {
            return this.status === 'success' ? 'fa-envelope' : 'fa-close';
        },

        message: function() {
            return this.status === 'success' 
                ? this.t('passwordMailResult.success')
                : this.t('passwordMailResult.failed');
        }
    }
}
</script>
