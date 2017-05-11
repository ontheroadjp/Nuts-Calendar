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
            <a @click="$parent.passwordMailResult = ''">try again</a>
        </p>
    </div>
</div>
</template>

<script>
export default {
    props: [
        'status'
    ],

    computed: {
        icon: function() {
            return this.status === 'success' ? 'fa-envelope' : 'fa-close';
        },

        message: function() {
            return this.status === 'success' 
                ? 'Sent Reset Link Mail Successfully' 
                : 'Sent Reset Link Mail failed';
        }
    }
}
</script>

<style>
</style>
