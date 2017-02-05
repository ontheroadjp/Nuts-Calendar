@extends('layouts.app')

@section('content')
    <component :is="currentView"></component>
@endsection
