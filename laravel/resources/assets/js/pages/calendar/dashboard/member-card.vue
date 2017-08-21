<template>
<div 
    :class="['card', 'card-foover', 'is-clickable', theme.primary.class]"
    @dragenter="handleDragEnter()"
>
    <div class="card-content">
    <div class="media">

        <div class="media-left">
            <span class="icon">
                <i class="fa fa-user-o"></i>
            </span>
        </div>

        <div class="media-content">
            <p style="margin-bottom: 10px;">{{ member.name }}</p>
            <p class="subtitle is-6">
                {{ member.description }}
            </p>

            <div>Today</div>
            <div class="columns">
                <div class="column is-6">
                    <p class="today-schedule">
                        Schedule:<br>
                        10:00 MTG w/yamada
                    </p>
                </div>
                <div class="column is-6">
                    <p class="today-ToDo">
                        ToDo:<br>
                        10:00 MTG w/yamada
                    </p>
                </div>
            </div>

            <div>within 7days</div>
            <div class="columns">
                <div class="column is-6">
                    <p class="today-schedule">
                        Schedule:<br>12件
                    </p>
                </div>
                <div class="column is-6">
                    <p class="today-ToDo">
                        ToDo:<br>20件
                    </p>
                </div>
            </div>

            <div class="icon"
                style="position: absolute; top: 20px; right: 20px;"
            ><i class="fa fa-gear"></i></div>
        </div>

    </div><!-- // .media -->
    </div><!-- // .card-content -->
</div><!-- // .card -->
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: [
        'member'
    ],

    computed: {
        ...mapState({
            'theme': state => state.app.theme
        })
    }
}
</script>

<style lang="scss" scoped>
</style>
