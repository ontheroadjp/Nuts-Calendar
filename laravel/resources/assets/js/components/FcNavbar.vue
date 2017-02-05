<template>
    <nav class="nav navbar-fixed-top" style="border-bottom: 1px solid #00d1b2; padding-left: 25px;">
    
        <div class="nav-left">
            <a class="nav-item is-brand" href="/">
                <img src="//bulma.io/images/bulma-type.png" alt="Bulma logo">
            </a>
        </div>
    
        <span class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
        </span>
    
        <div class="nav-right nav-menu">

            <a v-link="{ path: '/' }" class="nav-item">Home(v-link)</a>
            <template v-if="! $store.state.user.token">
                <a v-link="{ path: '/login' }" class="nav-item">Login</a>
                <a v-link="{ path: '/register' }" class="nav-item">Register</a>
            </template>
            <template v-else>
                <li class="nav-item">
                    <a v-link="{ path: '/dashboard' }">Dashboard</a>
                </li>
                <li class="nav-item dropdown">
                    <a
                        href="#"
                        class="dropdown-toggle nav-item"
                        data-toggle="dropdown"
                        role="button"
                        aria-expanded="false"
                    > {{ $store.state.user.name }}
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" role="menu">
                        <li>
                            <a v-link="{path: '/me/settings'}">
                                <i class="fa fa-user"></i> Account Settings
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="logout()">
                                <i class="fa fa-btn fa-arrow-circle-o-right"></i> Logout
                            </a>
                        </li>
                    </ul>
    
                </li>
            </template>

            <span class="nav-item">
                <a class="button" >
                    <span class="icon">
                        <i class="fa fa-twitter"></i>
                    </span>
                    <span>Tweet</span>
                </a>
            </span>
        
        </div>
    </nav>
</template>

<script>
    import userMixin from '../mixins/User.js';
    
    export default {
        mixins: [
            userMixin
        ],
    }
</script>

<style>
    
</style>
