<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Family Schedule</title>
    <link
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous"
    >
    <style>
        .navbar {
            margin-bottom: 0px;
        }
    </style>
</head>
<body>

    <div class="jumbotron">
        <div class="container">
            <h1>Family Schedule</h1>
            <p></p>
            <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>
        </div>
    </div>

    <div class="container">

        <div class="row">
            <div class="col-md-12 col-md-offset-0">

                <component is="datatable"></component>

                <pre>@{{ $children[0]._data | json }}</pre>
                <pre>@{{ $data | json }}</pre>

            </div><!-- // col-md-12 col-md-offset-0 -->
        </div><!-- // .row -->

    </div><!-- // .container -->

</body>

<template id="data-table">
    <section>
        <a data-toggle="collapse" data-target="#new-item-accordion" style="cursor: pointer;" >Add new item</a>

        <div id="new-item-accordion" class="collapse">
           <div class="well">
               <div class="form-group form-inline">

                    <!-- New date field -->
                    <div class="form-group">
                        <div class="input-group">
                            <input
                                type="date"
                                class="form-control"
                                v-model="new_date"
                                placeholder="date"
                                required
                            >
                        </div>
                    </div>

                    <!-- New member select -->
                    <div class="form-group">
                        <select class="form-control" v-model="new_member_id">
                            <option v-for="member in members" :value="member.id">@{{ member.name }}</option>
                        </select>
                    </div>

                    <!-- New content field -->
                    <div class="form-group">
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                value=""
                                v-model="new_content"
                                placeholder="content"
                                required
                            >
                        </div>
                    </div>

                    <!-- New Event Button -->
                    <div class="form-group">
                        <button
                            class="btn btn-primary glyphicon glyphicon-plus-sign"
                            @click="newItemInsert()"
                        >New Event</button>
                    </div>

               </div>
           </div>

        </div>
    </section>

    <h2>
        <div class="form-group form-inline">

            <div class="form-group">
                <select
                    v-model="search_member"
                    class="form-control"
                >
                    <option :value='' selected>All</option>
                    <option v-for="member in members" :value="member.id">
                        @{{ member.name }}
                    </option>
                </select>
            </div>
            <span> の </span>

            <div class="form-group">
                <select v-model="search_year" class="form-control">
                    @for ( $i=2014; $i<2018; $i++ )
                        <option :value="{{ $i }}">{{ $i }}</option>
                    @endfor
                </select>
                <span>年</span>
            </div>

            <div class="form-group">
                <select v-model="search_month" class="form-control">
                    @for ( $i=1; $i<13; $i++ )
                        <option :value="{{ $i }}">{{ $i }}</option>
                    @endfor
                </select>
                <span>月</span>
            </div>
            <span> のイベント</span>

            <!-- right side components -->
            <div style="float: right">

                <!-- search bar -->
                <div class="form-group list-query">
                    <div class="input-group">
                        <span class="input-group-addon glyphicon glyphicon-search"></span>
                        <input
                            v-model="search_query"
                            type="text"
                            class="form-control"
                            name="search"
                            placeholder="search"
                        >
                    </div>
                </div>

                <!-- search clear button -->
                <div class="form-group">
                    <button class="btn btn-primary" @click="initSearch">Clear</button>
                </div>

            </div>

        </div><!-- // .form-group .form-inline -->
    </h2>

<div style="margin-left: 124px; margin-bottom: 40px;">
    <div class="btn-group btn-group-sm" role="group">
        <button
            class="btn btn-default"
            @click="search_month == 1 ? ( search_month = 12, search_year -= 1 ) : search_month -= 1"
        >先月</button>

        <button
            class="btn btn-default"
            @click="search_month = (new Date()).getMonth() + 1, search_year = (new Date()).getFullYear()"
        >今月</button>

        <button
            class="btn btn-default"
            @click="search_month == 12 ? ( search_month = 1, search_year += 1 ) : search_month += 1"
        >来月</button>

    </div>
</div>

    <div class="panel panel-default">

        <table class="table table-striped">
            <tbody>
                <tr v-for="event in events
                        | filterBy search_member in 'member_id'
                        | filterBy search_query in 'content'
                        | filterBy search_year in 'year'
                        | filterBy search_month in 'month'
                ">

                    <!-- <td>@{{ event.id }}</td> -->

                    <td width="20%">
                        <input
                            v-if="event.editing || event.inserting"
                            v-model="event.date"
                            type="date"
                            class="form-control"
                        >
                        <span v-else style="font-size: 1.2em">@{{ event.day }} 日</span>
                        <span v-show="!event.editing">(@{{ event.day_of_week }})</span>
                    </td>

                    <td>
                        <div class="form-group {{ $errors->has('') ? 'has-error' : '' }}">
                            <select
                                v-model="event.member_id"
                                v-if="event.editing || event.inserting"
                                class="form-control"
                                name=""
                            >
                                <option v-for="member in members" :value="member.id">
                                    @{{ member.name }}
                                </option>
                            </select>
                            <span v-else class="label label-@{{ event.member.color }}" style="font-size: 1em">
                                @{{ event.member.name }}
                            </span>
                            {!! $errors->first('','<span class="help-block">:message</span>') !!}
                        </div>
                    </td>

                    <td width="50%">
                        <input
                            v-if="event.editing || event.inserting"
                            v-model="event.content"
                            type="text"
                            class="form-control"
                        >
                        <span v-else style="font-size: 1.2em">@{{ event.content }}</span>
                    </td>

                    <!-- Buttons in no editing mode -->
                    <td v-if="!event.editing && !event.inserting">
                        <div class="form-group">
                            <button
                                class="btn btn-success glyphicon glyphicon-pencil"
                                @click="itemEdit(event)">
                            </button>
                        </div>
                    </td>
                    <td v-if="!event.editing && !event.inserting">
                        <div class="form-group">
                            <button
                                class="btn btn-danger glyphicon glyphicon-trash"
                                @click="itemDelete(event)">
                            </button>
                        </div>
                    </td>

                    <!-- Buttons in insert mode -->
                    <td v-if="event.inserting">
                        <div class="form-group">
                            <button
                                class="btn btn-info glyphicon glyphicon-ok"
                                @click="itemInsert(event)">
                            </button>
                        </div>
                    </td>
                    <td v-if="event.inserting">
                        <div class="form-group">
                            <button
                                class="btn btn-default glyphicon glyphicon-remove"
                                @click="insertCancel(event)">
                            </button>
                        </div>
                    </td>

                    <!-- Buttons in editing mode -->
                    <td v-if="event.editing">
                        <div class="form-group">
                            <button
                                class="btn btn-info glyphicon glyphicon-ok"
                                @click="editUpdate(event)">
                            </button>
                        </div>
                    </td>
                    <td v-if="event.editing">
                        <div class="form-group">
                            <button
                                class="btn btn-default glyphicon glyphicon-remove"
                                @click="editCancel(event)">
                            </button>
                        </div>
                    </td>

                </tr>
            </tbody>
        </table>
    </div><!-- // .panel -->
</template>

<script src="//code.jquery.com/jquery-3.1.1.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.js"></script>
<script src="//cdn.jsdelivr.net/vue.resource/1.0.3/vue-resource.min.js"></script>

<script>
    now = new Date();
    Vue.component('datatable', {

        template: "#data-table",

        data: function() {
            return {
                search_query: '',
                search_year: now.getFullYear(),
                search_month: now.getMonth() + 1,
                search_member: '',
                events: [],
                members: [],
                new_date: '',
                new_member_id: '',
                new_content: ''
            }
        },

        ready: function() {
            this.fetchEvents();
            this.fetchMembers();
        },

        methods: {
            fetchEvents: function() {
                this.$http({
                    url: '/api/event',
                    method: 'GET'
                }).then( function(response) {
                    var storiesReady = response.data.map(function(item) {
                        var event_date = new Date(item.date);
                        item.inserting = false;
                        item.editing = false;
                        item.year = event_date.getFullYear();
                        item.month = event_date.getMonth() + 1;
                        item.day = event_date.getDate();
                        var weekDayList = [ "日","月","火","水","木","金","土" ];
                        item.day_of_week = weekDayList[event_date.getDay()];
                        return item;
                    })
                    this.events = storiesReady;
                    this.events.sort(function (a,b) {
                        if(a.date < b.date) return -1;
                        if(a.date > b.date) return 1;
                    })
                }, function(response) {

                });
            },

            fetchMembers: function() {
                this.$http({
                    url: '/api/member',
                    method: 'GET'
                }).then( function(response) {
                    var membersReady = response.data.map(function(item) {
                        item.inserting = false;
                        item.editing = false;
                        return item
                    })
                    this.members = membersReady;
                }, function(response) {

                });
            },

            initSearch: function() {
                this.search_query = '';
                this.search_year = now.getFullYear();
                this.search_month = now.getMonth() + 1;
                this.search_member = '';
            },

            newItemInsert: function() {
                var new_item = {
                    member_id: this.new_member_id,
                    content: this.new_content,
                    date: this.new_date,
                    inserting: false,
                    editing: false
                };
                this.events.unshift(new_item);
                this.itemInsert(new_item);
                //$("button").prop('disabled', true);
            },

            insertCancel: function(item) {
                this.events.shift();
                $("button").prop('disabled', false);
                item.inserting = false;
            },

            itemInsert: function(item) {
                var url = '/api/event';
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content')
                this.$http({
                    url: url,
                    method: 'POST',
                    body: item
                }).then(
                    function(response) {
                        //$("button").prop('disabled', false);
                        item.inserting = false;
                        Vue.set(item, 'id', response.data.id);
                    }, function(response) {

                    }
                )
            },

            itemEdit: function(item) {
                item.editing = true;
                item.oldContent = item.content;
                item.oldDate = item.date;
                $("button").prop('disabled', true);
            },

            editCancel: function(item) {
                item.editing = false;
                item.content = item.oldContent;
                item.date = item.oldDate;
                $("button").prop('disabled', false);
            },

            editUpdate: function(item) {
                var url = '/api/event/' + item.id;
                Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content')
                this.$http({
                    url: url,
                    method: 'PATCH',
                    body: item
                }).then(
                    function(response) {
                        item.editing = false;
                        $("button").prop('disabled', false);
                    }, function(response) {

                    }
                )
            },

            itemDelete: function(item) {
                var url = '/api/event/' + item.id;
                this.$http({
                    url: url,
                    method: 'DELETE',
                }).then(
                    function(response) {
                        this.$parent.events.$remove(item);
                    }, function(response) {

                    }
                )
            },
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

