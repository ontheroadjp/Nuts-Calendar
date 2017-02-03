<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @if (isset( $api_token ))
        <meta name="api-token" content="{{ $api_token }}">
    @endif
    <title>Family Calendar</title>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Lato:100,300,400,700">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bulma/0.2.3/css/bulma.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/app.css">
    {{-- <link href="{{ elixir('css/app.css') }}" rel="stylesheet"> --}}

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <style>
[draggable] {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  /* Required to make elements draggable in old WebKit */
  -khtml-user-drag: element;
  -webkit-user-drag: element;
}
        body {
            font-family: 'Lato';
        }

        .fa-btn {
            margin-right: 6px;
        }
    </style>
</head>
<body id="app-layout">

    {{-- @include('layouts.original_nav') --}}
    @include('partials.navbar')

    <!-- <div style="margin-top: 45px"></div> -->

    @yield('content')

    <!-- JavaScripts -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.js"></script>

    <script
        src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossorigin="anonymous">
    </script>

    {{-- <script src="{{ elixir('js/app.js') }}"></script> --}}
    <script src="/js/main.js"></script>

</body>
</html>
