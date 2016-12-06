<!doctype html>
<html lang="ja" prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Family Calendar</title>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>

<div class="container">
    <h1>Family Calendar</h1>
    <calendar></calendar>
</div><!-- // .container -->

</body>

<template id="calendar">
<div class="row">
    <div class="col-md-12">

        <div class="form-group form-inline">

            <div class="form-group {{ $errors->has('') ? 'has-error' : '' }}">
                <select class="form-control" v-model="year" @change="this.fetchCalendar()">
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                </select>
                {!! $errors->first('','<span class="help-block">:message</span>') !!}
            </div>年

            <div class="form-group {{ $errors->has('') ? 'has-error' : '' }}">
                <select class="form-control" v-model="month" @change="this.fetchCalendar()">
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                </select>
                {!! $errors->first('','<span class="help-block">:message</span>') !!}
            </div>月

            <div class="form-group">
                <button class="btn btn-primary">Add Event</button>
            </div>

        </div><!-- // .fort-group .form-inline -->

    </div><!-- // col-md-12 -->
</div><!-- // .row -->

<div class="row">
    <div class="col-md-12">
        <div class="panel panel-default">

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th v-for="member in members">@{{ member.name }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="day in calendar">
                        <td @click="day.info['key'] = true,console.log('insert')">@{{ day.date }}</td>
                        <td v-for="members in day.events">

                            <div v-for="(index, event) in members" class="form-inline" @mouseout="event.is_hover = false">

                                <span v-show="!event.editing" @mouseover="event.is_hover = true">

                                    <span @click="event.editing = true">
                                        @{{ event.content }}
                                    </span>

                                    <span v-show="event.is_hover">
                                        <button class=" glyphicon glyphicon-trash" @click="deleteEvent(members, event, index)"></button>
                                    </span>


                                </span>

                                <span v-if="event.editing" >
                                    <input type="text" class="form-control" @blur="event.editing = false" v-model="event.content" v-focus>
                                    <button class="glyphicon glyphicon-refresh"></button>
                                    <!-- <button class="glyphicon glyphicon-remove"></button> -->
                                </span>

                                <span v-if="day.info['key']" >
                                    <br><input type="text" class="form-control" @blur="event.editing = false" v-model="event.content">
                                    <button class="glyphicon glyphicon-refresh"></button>
                                    <!-- <button class="glyphicon glyphicon-remove"></button> -->
                                </span>

                            </div>

                        </td>
                    </tr>
                </tbody>
            </table>

        </div><!-- // .panel -->
    </div><!-- // col-md-12 -->
</div><!-- // .row -->
</template>

<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.js"></script>
<!-- <script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.1.4/vue.js"></script> -->
<script src="//cdn.jsdelivr.net/vue.resource/1.0.3/vue-resource.min.js"></script>
<script>
var now = new Date();
    Vue.directive('focus', {
        update: function () {
            console.log('v-focus update!');
            var object = this.el;
            Vue.nextTick(function() {
                object.focus();
            });
        }
    });

    Vue.component('calendar', {

        template: "#calendar",

        data: function() {
            return {
                calendar: [],
                members: [],
                year: now.getFullYear(),
                month: now.getMonth() + 1
            }
        },

        methods: {
            fetchCalendar: function() {
                this.$http({
                    url: '/api/calendar/' + this.year + '/' + this.month,
                    method: 'GET'
                }).then( function(response) {
                    //var calendarReady = response.data.days.map(function(item) {
                    //    item.editing = false;
                    //    return item;
                    //})
                    //this.calendar = calendarReady;
                    this.calendar = response.data.days;
                    this.members = response.data.members;
                }, function(response) {

                });
            },

            deleteEvent: function(members, event, index) {
                var url = '/api/event/' + event.id;
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content')
                this.$http({
                    url: url,
                    method: 'DELETE',
                }).then(
                    function(response) {
                        console.log('success: delete event (id:event.id)');
                        members.splice(index, 1);
                    }, function(response) {
                        alert('error');
                    }
                )
            },

            editCancel: function() {
                this.is_hover = false;
                this.editing = false;
            }
        },

        watch: function() {

        },

        ready: function() {
            this.fetchCalendar();
        }
    })

    var vm = new Vue({
        el: 'body',
        data: {

        },
        computed: {

        },
        methods: {

        },
    })

//jQuery(function ($) {
//});


</script>
</html>
