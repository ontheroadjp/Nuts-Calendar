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

    <style>
        .nuts-sidebar{
            position: fixed;
            color: #fff;
        }

        .nuts-sidebar.left {
            top: 0;
            left: 0;
            bottom: 0;
            width: 270px;
            background: rgba(221, 221, 221, 0.95);
        }

        .nuts-sidebar.right {
            top: 0;
            right: 0;
            bottom: 0;
            width: 270px;
            background: rgba(221, 221, 221, 0.95);
        }

        .nuts-sidebar.top {
            left: 0;
            right: 0;
            top: 0;
            height: 270px;
            background: rgba(1, 209, 178, 1);
        }

        .nuts-sidebar.bottom {
            left: 0;
            right: 0;
            bottom: 0;
            height: 270px;
            background: rgba(1, 209, 178, 1);
        }
    </style>

<body>

<div class="container">

    <nuts-modal
        ok_label="Save Changes"
        cancel_label="Close"
    >
        <h4 slot="header">Member configuration</h4>
        <p>
            name:<br>
            gendar:<br>
            birth date:<br>
        </p>
    </nuts-modal>

    <h1>Family Calendar</h1>
    <div style="font-size: 2.5em;">
        <nuts-ym-field></nuts-ym-field>
    </div>

<!--
    <div class="row">
        <div class="col-md-12">
            <div style="float:right;">
                <a href="#" class="btn btn-info" data-action="toggle" data-side="left">Toggle Sidebar</a>
            </div>
        </div>
    </div>
-->

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#nuts-modal">
  Launch demo modal
</button>
<!-- Button trigger modal -->

    <div class="row" style="margin-bottom: 15px;">
        <div class="col-md-12">
            <div style="float:right;">
                <nuts-toggle-button on_label="Normal Mode" off_label="Insert Mode"></nuts-toggle-button>
            </div>
        </div><!-- // col-md-12 -->
    </div><!-- // .row -->

    <div class="row">
        <calendar></calendar>
    </div><!-- // .row -->

    <nuts-sidebar>

        <nuts-ym-selector></nuts-ym-selector>

        <!-- insert mode toggle button -->
        <div class="form-group">
            <button
                class="btn btn-primary"
                @click="is_insert_mode = !is_insert_mode, inserting_cell = ''"
            >
                @{{ is_insert_mode ? "Insert mode" : "Normal mode" }}
            </button>
        </div>
    </nuts-sidebar>

</div><!-- // .container -->
</body>

<!-- ------------------------------------------------------------------------
TEMPLATE - calendar
------------------------------------------------------------------------ -->
<template id="calendar">
<div class="row">
<div class="col-md-12">
<div class="panel panel-default">

    <!-- table -->
    <table
        class="table table-striped"
        :class="{ calendar: this.is_insert_mode }"
    >

    <!-- table header -->
    <thead>
        <tr>
            <th>Date</th>
            <th
                v-for="member in members"
                data-toggle="modal"
                data-target="#nuts-modal"
            >@{{ member.name }}</th>
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

                        <span @click="editClick(event)">
                            @{{ event.content }}
                        </span>

                        <span v-show="event.is_hover && !is_insert_mode">
                            <button
                                class=" glyphicon glyphicon-trash"
                                @click="deleteEvent(members, event, event_index)"
                            ></button>
                        </span>

                    </span><!-- // VIEW MODE -->

                    <!-- EDIT MODE -->
                    <span v-show="event.editing">

                        <span v-show="is_insert_mode">
                            @{{ event.content }}
                        </span>

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

                </div><!-- // event roop -->

                <!-- INSERT MODE -->
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
                </template><!-- // INSERT MODE -->

            </td>
        </tr>
    </tbody>
    </table>

</div><!-- // .panel -->
</div><!-- // col-md-12 -->
</div><!-- // .row -->
</template>

<!-- ------------------------------------------------------------------------
TEMPLATE - nuts-sidebar
------------------------------------------------------------------------ -->
<template id="nuts-sidebar">
<div class="nuts-sidebar left">
     <a href="#" class="btn" data-action="toggle" data-side="left">x</a>
     <slot></slot>
</div>
</template>

<!-- ------------------------------------------------------------------------
TEMPLATE - nuts-modal
------------------------------------------------------------------------ -->
<template id="nuts-modal">
<!-- Modal -->
<div class="modal fade" id="nuts-modal" tabindex="-1" role="dialog" aria-labelledby="nutsModalLabel">
<div class="modal-dialog" role="document">
<div class="modal-content">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="nutsModalLabel">
            <slot name="header"></slot>
        </h4>
    </div>
    <div class="modal-body">
        <slot></slot>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">@{{ cancel_label }}</button>
        <button type="button" class="btn btn-primary">@{{ ok_label }}</button>
    </div>
</div>
</div>
</div>
</template>
<!-- ------------------------------------------------------------------------
TEMPLATE - nuts-toggle-button
------------------------------------------------------------------------ -->
<template id="nuts-toggle-button">
    <button class="btn btn-primary" @click="pushed">@{{ is_on ? on_label : off_label }}</button>
</template>

<!-- ------------------------------------------------------------------------
TEMPLATE - nuts-ym-selector
------------------------------------------------------------------------ -->
<template id="nuts-ym-selector">
<div class="form-group form-inline">

    <div class="form-group">
        <select
            class="form-control"
            v-model="year"
            @change="changeValue"
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
            @change="changeValue"
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

</div><!-- // .fort-group .form-inline -->
</template>

<!-- ------------------------------------------------------------------------
TEMPLATE - nuts-ym-field
------------------------------------------------------------------------ -->
<template id="nuts-ym-field">
    <span v-if="!editing" @click="editing = true">@{{ year }} 年 @{{ month }} 月</span>
    <span v-else>
        <div class="form-group form-inline">

            <div class="form-group">
                <select
                    class="form-control"
                    v-model="year"
                    @change="changeValue"
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
                    @change="changeValue"
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

            <span :style="cancelButtonStyle">(</span>
            <a href="#" @click="editing =false" :style="cancelButtonStyle">x</a>
            <span :style="cancelButtonStyle">)</span>
        </div>
    </span>
</template>

<!-- core -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.js"></script>
<!-- <script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.1.4/vue.js"></script> -->
<script src="//cdn.jsdelivr.net/vue.resource/1.0.3/vue-resource.min.js"></script>

<!-- sidebar -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-sidebar/3.3.2/jquery.sidebar.min.js"></script>

<script>
    Vue.directive('focus', {
        update: function () {
            console.log('v-focus update!');
            var object = this.el;
            Vue.nextTick(function() {
                object.focus();
            });
        }
    });

    Vue.component('nuts-sidebar', {
        template: "#nuts-sidebar",
        data: function() {
            return {
                shared: root_data
            }
        },
        ready: function() {
            // initialize
            var sides = ["left", "top", "right", "bottom"];
            for (var i = 0; i < sides.length; ++i) {
                var cSide = sides[i];
                $(".nuts-sidebar." + cSide).sidebar({side: cSide});
            }

            // click event
            $(".btn[data-action]").on("click", function () {
                var $this = $(this);
                console.log($this);
                var action = $this.attr("data-action");
                var side = $this.attr("data-side");
                $(".nuts-sidebar." + side).trigger("sidebar:" + action);
                return false;
            });
        }
    })

    Vue.component('nuts-modal', {
        name: "nuts-modal",
        template: "#nuts-modal",
        props: ['cancel_label','ok_label'],
        data: function() {
            return {
                is_visible: false
            }
        },
        methods: {
            changeValue: function() {
                bus.$emit('value-change', this.message);
            }
        },
    })


    var nutsBus = new Vue();

    Vue.component('nuts-toggle-button', {
        template: "#nuts-toggle-button",
        props: [
            'on_label', 'off_label'
        ],
        data: function() {
            return {
//                label_on: "Normal Mode",
//                label_off: "Insert Mode",
                is_on: false
            }
        },
        methods: {
            pushed: function() {
                this.is_on = !this.is_on
                nutsBus.$emit('change_mode', this.is_on);
            }
        },
    })


    Vue.component('nuts-ym-selector', {
        template: "#nuts-ym-selector",
        data: function() {
            return {
                now: new Date(),
                year: now.getFullYear(),
                month: now.getMonth() + 1
            }
        },
        methods: {
            changeValue: function() {
                nutsBus.$emit('ymchange', this.year, this.month);
            }
        },
    })

    Vue.component('nuts-ym-field', {
        template: "#nuts-ym-field",
        data: function() {
            return {
                now: new Date(),
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                editing: false,
                cancelButtonStyle: {
                    fontSize: '0.6em',
                }
            }
        },
        methods: {
            changeValue: function() {
                nutsBus.$emit('ymchange', this.year, this.month);
                this.editing = false;
            }
        },
    })

    Vue.component('calendar', {
        template: "#calendar",
        data: function() {
            return {
                calendar: [],
                members: [],
                shared: root_data,
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
                    url: '/api/calendar/' + this.shared.year + '/' + this.shared.month,
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

        watch: {
            'shared.year': {
                handler: function(new_val, old_val) {
                    this.fetchCalendar()
                },
                deep: true
            },

            'shared.month': {
                handler: function(new_val, old_val) {
                    this.fetchCalendar()
                },
                deep: true
            }
        },

        created() {
            const self = this;

            nutsBus.$on('ymchange', function(year, month) {
                console.log(year + ':' + month);
                self.shared.year = year;
                self.shared.month = month;
            });

            nutsBus.$on('change_mode', function(is_on) {
                console.log(is_on);
                self.is_insert_mode = is_on;
            });
        },

        ready: function() {
            this.fetchCalendar();
            //this.$watch('shared.month', (new_val, old_val) => {
            //    console.log('new: %s old: %s', new_val, old_val);
            //    this.fetchCalendar();
            //});
        }
    })

    var now = new Date();
    var root_data = {
        year: now.getFullYear(),
        month: now.getMonth() + 1
    };

    var vm = new Vue({
        el: '.container',
        data: {
            shared: root_data
        }
    })

</script>
</html>
