<!doctype html>
<html lang="ja" prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Family Calendar</title>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Lato:100" type="text/css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bulma/0.2.3/css/bulma.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/app.css">
</head>

<body>
    <nuts-alert></nuts-alert>

    <nuts-members-modal name="members-modal" :is_close_btn="false">
        <nuts-member-tabs></nuts-member-tabs>
    </nuts-members-modal>

    @include('partials.navbar')

    <fc-hero></fc-hero>

    <section style="margin: 20px;">

    <nuts-search-box></nuts-search-box>

    <nuts-members-modal-button emit="open-members-modal" v-show="!is_searching">
        Add Member
    </nuts-members-modal-button>

    <!-- <nuts-table-mode-toggle-button
        type="btn-info"
        on_label="Normal Mode"
        off_label="Insert Mode"
        emit="nuts-change-table-mode"
    ></nuts-table-mode-toggle-button> -->

    <!-- <nuts-sidebar-toggle-button
        type="btn-primary"
        on_label="Close sidebar"
        off_label="Open Sidebar"
        emit="nuts-sidebar-toggle"
    ></nuts-sidebar-action-button> -->

    </section>

    <!-- Calendar table -->
    <section style="margin: 0 20px 20px 20px;">
        <component :is="currentView"></component>
    </section>


    <!-- Sidebar -->
    <!-- <nuts-sidebar>
        <nuts-sidebar-toggle-button
            type="btn-primary"
            on_label="Close sidebar"
            off_label="Open Sidebar"
            emit="nuts-sidebar-toggle"
        ></nuts-sidebar-toggle-button> -->

        <!-- <nuts-ym-selector></nuts-ym-selector> -->

        <!-- insert mode toggle button -->
        <!-- <div class="row" style="margin-bottom: 15px;">
            <div class="col-md-12">
                <div style="float:right;">
                    <nuts-table-mode-toggle-button
                        type="btn-info"
                        on_label="Normal Mode"
                        off_label="Insert Mode"
                        emit="nuts-change-table-mode"
                    ></nuts-table-mode-toggle-button>
                </div>
            </div>
        </div>
    </nuts-sidebar> -->

    <section class="hero is-medium is-light is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">Primary bold title</h1>
                <h2 class="subtitle">Primary bold subtitle</h2>
            </div>
        </div>
    </section>

</body>

<!-- jquery & bootstrap -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<!-- <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->

<!-- vue.js -->
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.js"></script>
<script src="//cdn.jsdelivr.net/vue.resource/1.0.3/vue-resource.min.js"></script>

<!-- sidebar -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-sidebar/3.3.2/jquery.sidebar.min.js"></script>

<!-- main -->
<script src="/js/main.js"></script>
</html>
