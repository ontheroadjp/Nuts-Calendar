<!doctype html>
<html lang="ja" prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Family Calendar</title>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <style>
        table.calendar tbody td {
            color: #ccc;
        }
        table.calendar tbody tr:hover th {
            background: #eee;
        }
        table.calendar:hover tbody tr:hover td {
            color: #666;
            background: rgba(145, 235, 250, 0.1);
        }
        table.calendar:hover tbody:hover td:hover {
            opacity: 1;
            background: rgba(145, 235, 250, 0.5);
        }
    </style>
<body>
<div class="container">

    <h1>Family Calendar</h1>
    <calendar></calendar>

</div><!-- // .container -->
</body>

<template id="calendar">
<div id="ym-selector" class="row">
    <div class="col-md-12">

        <div class="form-group form-inline">

            <div class="form-group">
                <select
                    class="form-control"
                    v-model="year"
                    @change="this.fetchCalendar()"
                >
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                </select>
            </div>年

            <div class="form-group">
                <select
                    class="form-control"
                    v-model="month"
                    @change="this.fetchCalendar()"
                >
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
            </div>月

            <!-- insert mode toggle button -->
            <div class="form-group">
                <button
                    class="btn btn-primary"
                    @click="this.is_insert_mode = !this.is_insert_mode, this.inserting_cell = ''"
                >
                    @{{ this.is_insert_mode ? "Insert mode" : "Normal mode" }}
                </button>
            </div>

        </div><!-- // .fort-group .form-inline -->

    </div><!-- // col-md-12 -->
</div><!-- // .row -->

<div class="row">

    <div id="sidebar" class="col-md-3 pc-side-nav">
        <div class="panel panel-default">

            <div class="panel-body">
                <span style="font-size: 6em;">@{{ month_us[month] }}</span>
                <!-- <span style="font-size: 3em;">月</span> -->
            </div><!-- // .panel-body -->

            <div class="panel-body">
                <span style="float: right; font-size: 2em;">@{{ year }}</span>
            </div><!-- // .panel-body -->

        </div><!-- // .panel -->
    </div><!-- // col-md-2 -->

    <div id="main" class="col-md-9">
        <div class="panel panel-default">

            <!-- table -->
            <table
                id="family-calendar"
                class="table table-striped"
                :class="{ calendar: this.is_insert_mode }"
            >

            <!-- table header -->
            <thead>
                <tr>
                    <th>Date</th>
                    <th v-for="member in members">@{{ member.name }}</th>
                </tr>
            </thead>

            <!-- table body -->
            <tbody>
                <tr
                    class="day-@{{ day_index + 1 }}"
                    v-for="(day_index, day) in calendar"
                >
                    <td>@{{ day.date }}</td>
                    <td
                        class="day-@{{ day_index + 1 }}-@{{ member_index }}"
                        v-for="(member_index, members) in day.events"
                        @click="insertClick('day-' + (this.day_index + 1) + '-' + this.member_index)"
                    >

                        <template v-if="'day-@{{ day_index + 1 }}-@{{ member_index }}' == this.inserting_cell">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="New Event here.."
                                v-focus
                            >
                            <button class="glyphicon glyphicon-remove"></button>
                            <button class="glyphicon glyphicon-floppy-disk"></button>
                        </template>

                        <div
                            v-for="(event_index, event) in members"
                            class="form-inline"
                            @mouseout="event.is_hover = false"
                        >

                            <!-- VIEW MODE -->
                            <span
                                v-show="!event.editing"
                                @mouseover="event.is_hover = true"
                            >

                                <!-- event content -->
                                <span @click="editClick(event)">
                                    @{{ event.content }}
                                </span>

                                <!-- trush button -->
                                <span v-show="event.is_hover && !is_insert_mode">
                                    <button
                                        class=" glyphicon glyphicon-trash"
                                        @click="deleteEvent(members, event, event_index)"
                                    ></button>
                                </span>

                            </span><!-- // VIEW MODE -->

                            <!-- EDIT MODE -->
                            <span v-show="event.editing">

                                <!-- event content for insert mode -->
                                <span v-show="is_insert_mode">
                                    @{{ event.content }}
                                </span>

                                <!-- edit form -->
                                <template v-if="!is_insert_mode && event.editing" >
                                    <input
                                        type="text"
                                        class="form-control"
                                        @blur="this.editUpdate(event)"
                                        v-model="event.content"
                                        v-focus
                                    >
                                </template>

                            </span><!-- // EDIT MODE -->

                        </div><!-- // event -->

                        <!-- insert new event form -->
                        <template v-if="'day-' + (this.day_index + 1) + '-' + this.member_index == this.inserting_cell">
                            <div class="form-inline">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="New Event here.."
                                    v-focus
                                >
                                <button class="glyphicon glyphicon-floppy-disk"></button>
                            </div>
                        </template>

                    </td>

                </tr>
            </tbody>
            </table>

        </div><!-- // .panel -->
    </div><!-- // col-md-12 -->
</div><!-- // .row -->
</template>

<!-- core -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.js"></script>
<!-- <script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.1.4/vue.js"></script> -->
<script src="//cdn.jsdelivr.net/vue.resource/1.0.3/vue-resource.min.js"></script>
<style>
.pc-side-nav-fixed {
	top: 2%;
    width: 21.8%;
	position: fixed;
}
.thead-fixed {
	top: 2%;
    width: 100%;
	position: fixed;
}
</style>

<script>
// PC用のサイドバー固定
(function(){
	 $(function(){

         console.log(this);

		 var fix = $('.pc-side-nav'), //固定したいコンテンツ
		 side = $('#sidebar'), //サイドバーのID
		 main = $('#main'), //固定する要素を収める範囲
		 sideTop = side.offset().top;
		 fixTop = fix.offset().top,
		 mainTop = main.offset().top,
		 w = $(window);

         thead = $('thead');

		 var adjust = function(){
			 fixTop = fix.css('position') === 'static' ? sideTop + fix.position().top : fixTop;
			 var fixHeight = fix.outerHeight(true),
			 mainHeight = main.outerHeight(),
			 winTop = w.scrollTop();

			 if( winTop + fixHeight > mainTop + mainHeight) {
				fix.removeClass('pc-side-nav-fixed');
				main.removeClass('col-md-push-3');
				thead.removeClass('thead-fixed');
			 } else if(winTop >= fixTop){
				fix.addClass('pc-side-nav-fixed');
				main.addClass('col-md-push-3');
				thead.addClass('thead-fixed');
			 } else {
				fix.removeClass('pc-side-nav-fixed');
				main.removeClass('col-md-push-3');
				thead.removeClass('thead-fixed');
			 }
		 }

		 w.on('scroll', adjust);
	 });
})(jQuery);

    //(function(window, $) {
    //    'use strict';
    //    $(function() {
    //        setTimeout(function() {
    //            $('#sidebar').affix({
    //                offset: {
    //                    top: function() {
    //                        return (this.top = $('header').outerHeight(true));
    //                    },
    //                    bottom: function() {
    //                        return (this.bottom = $('footer').outerHeight(true));
    //                    }
    //                }
    //            })
    //        }, -50);
    //    });
    //})(window, jQuery);
</script>

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
                month: now.getMonth() + 1,
                is_insert_mode: false,
                inserting_cell: '',
                month_us: {
                    '01': 'Jan',
                    '02': 'Feb',
                    '03': 'Mar',
                    '04': 'Apr',
                    '05': 'May',
                    '06': 'Jun',
                    '07': 'Jul',
                    '08': 'Aug',
                    '09': 'Sep',
                    '10': 'Oct',
                    '11': 'Nov',
                    '12': 'Dec'
                }
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

            insertClick: function(cell) {
                if( this.is_insert_mode ) {
                    this.inserting_cell = cell;
                }
            },

            editClick: function(event) {
                if( !this.is_insert_mode ) {
                    event.editing = true;
                }
            },

            editUpdate: function(event) {
                var url = '/api/event/' + event.id;
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
                this.$http({
                    url: url,
                    method: 'PATCH',
                    body: event
                }).then(
                    function(response) {
                        console.log('updated!');
                        event.editing = false;
                        $("button").prop('disabled', false);
                    }, function(response) {
                        alert('error');
                    }
                )
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

</script>
</html>
