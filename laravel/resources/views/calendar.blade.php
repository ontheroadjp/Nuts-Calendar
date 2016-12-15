<!doctype html>
<html lang="ja" prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Family Calendar</title>
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

@include('partials.navbar');

<section id="signboard" class="hero is-primary" style="margin-top: -2px;">
    <div class="hero-body">
        <div class="container">

            <div id="mc_embed_signup" class="columns is-vcentered">
                <div class="column is-one-third is-left">
                    <p class="title">Family <strong>Calendar</strong></p>
                    <p class="subtitle"><small>Manage your task & events in easily, quickly and a fun!</small></p>
                </div>

                <div class="column">
                    <span class="is-pulled-right" style="font-size: 1.8em;">
                        <nuts-ym-field year-from="2015" year-period="6"></nuts-ym-field>
                    </span>
                </div>

            </div>
        </div>
    </div>

    <div class="hero-foot" style="height: 36px;">
        <div class="container">
            <nav class="tabs is-boxed">
                <ul>
                    <li class="is-active"><a href="#">Calendar</a></li>
                    <li><a href="#">Add Event</a></li>
                    <li><a href="#">Event Search</a></li>
                </ul>

                <a class="button is-primary is-outlined">
                    <span class="icon"><i class="fa fa-cog"></i></span>
                    <span>Settings</span>
                </a>

            </nav>
        </div>
    </div>

</section>


<section style="margin: 20px;">

    <span class="is-pulled-right">

        <nuts-members-modal-button emit="open-members-modal">
            Add Member
        </nuts-members-modal-button>

        <nuts-table-mode-toggle-button
            type="btn-info"
            on_label="Normal Mode"
            off_label="Insert Mode"
            emit="nuts-change-table-mode"
        ></nuts-table-mode-toggle-button>

        <nuts-sidebar-toggle-button
            type="btn-primary"
            on_label="Close sidebar"
            off_label="Open Sidebar"
            emit="nuts-sidebar-toggle"
        ></nuts-sidebar-action-button>

    </span>

</section>



<!-- Calendar table -->
<section style="margin: 0 20px 20px 20px;">
    <calendar></calendar>
</section>


<!-- Sidebar --><!--
<nuts-sidebar>
    <nuts-sidebar-toggle-button
        type="btn-primary"
        on_label="Close sidebar"
        off_label="Open Sidebar"
        emit="nuts-sidebar-toggle"
    ></nuts-sidebar-toggle-button>

    <nuts-ym-selector></nuts-ym-selector>

    <!-- insert mode toggle button -->
    <div class="row" style="margin-bottom: 15px;">
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
      <h1 class="title">
        Primary bold title
      </h1>
      <h2 class="subtitle">
        Primary bold subtitle
      </h2>
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
