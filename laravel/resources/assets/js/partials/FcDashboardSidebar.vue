<template>
    <aside class="menu is-ancestor">

        <p class="menu-label" v-for="items in menu">
            <ul class="menu-list">
                <li v-for="item in items"><a class="is-active">item</a></li>
            </ul>
        </p>

        <p class="menu-label">General</p>
        <ul class="menu-list">
            <li><a class="is-active">Calendars</a></li>
        </ul>

        <p class="menu-label">Administration</p>
        <ul class="menu-list">
            <li><a>Team Settings</a></li>
            <li>
                <a>HOGEHOGE HOGEHOGE</a>
                <a>Manage Your Team</a>
                <a>Manage Your Team</a>
                <!--
                    <ul>
                    <li><a>Members</a></li>
                    <li><a>Plugins</a></li>
                    <li><a>Add a member</a></li>
                    </ul>
                -->
            </li>
        </ul>

        <p class="menu-label">Transactions</p>
        <ul class="menu-list">
            <li><a>Payments</a></li>
        </ul>
    </aside>
</template>

<script>
    export default {

        data() {
            return {
                menu: {
                    General: [
                        'Calendars'
                    ],

                    Administration: [
                        'hoge', 'foo', 'bar'
                    ],
                },
            }
        },
        props: {
        },
        methods: {
        },
        created() {
        },
        ready() {
        },
    }
</script>

<style>
</style>
