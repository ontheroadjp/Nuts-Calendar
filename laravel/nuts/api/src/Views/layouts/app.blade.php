<!DOCTYPE html>
<html lang="en">
<head>
    <!-- <meta name="csrf-token" content="{{ csrf_token() }}"> -->
    @if (isset( $api_token ))
        <meta name="api-token" content="{{ $api_token }}">
    @endif

    <meta charset="utf-8">
    <title>Family Calendar</title>

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
<!--
    <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
    <style>
        body { font-family: 'Lato'; font-weight: 200; background: #f0f0f1; }
    </style>
-->
    <style>
        body { background: #f0f0f1; }
    </style>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>

    {{-- @include('layouts.original_nav') --}}

    @yield('content')

    <!-- JavaScripts -->
    <script src="{{ mix('js/manifest.js') }}"></script>
    <script src="{{ mix('js/vendor.js') }}"></script>
    <script src="{{ mix('js/main.js') }}"></script>
</body>
</html>
