@extends('layouts.app')

@section('content')

    <nuts-alert></nuts-alert>

    @include('partials.navbar')

    <fc-hero></fc-hero>

    <!-- Main -->
    <section style="margin: 0 20px 20px 20px;">
        <component :is="currentView"></component>
    </section>

    <section class="hero is-medium is-light is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">Primary bold title</h1>
                <h2 class="subtitle">Primary bold subtitle</h2>
            </div>
        </div>
    </section>

@endsection
