<!doctype html>
<html lang="ja" prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="utf-8">
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
                <select class="form-control" v-model="year" @change="this.fetch()">
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
                        <td>@{{ day.date }}</td>
                        <td v-for="members in day.events">

                            <span v-for="event in members">

                                    @{{ event.content }}<br>

                            </span>

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
<script src="//cdn.jsdelivr.net/vue.resource/1.0.3/vue-resource.min.js"></script>
<script>
var now = new Date();
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
                    var calendarReady = response.data.days.map(function(item) {
                        item.editing = false;
                        return item;
                    })
                    this.calendar = calendarReady;
                    this.members = response.data.members;
                    //this.calendar = response.data;
                }, function(response) {

                });
            }
        },


        ready: function() {
            this.fetchCalendar()
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

</script>
</html>
