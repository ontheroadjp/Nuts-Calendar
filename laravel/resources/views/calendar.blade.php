<!doctype html>
<html lang="ja" prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Family Calendar</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.2.3/css/bulma.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>

<body>
<div class="container">

    <nuts-modal v-show="isActive">
        <div class="card is-fullwidth">
          <header class="card-header">
            <p class="card-header-title">
              Component
            </p>
            <a class="card-header-icon">
              <i class="fa fa-angle-down"></i>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
              <br>
              <small>11:09 PM - 1 Jan 2016</small>
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">Save</a>
            <a class="card-footer-item">Edit</a>
            <a class="card-footer-item">Delete</a>
          </footer>
        </div>
    </nuts-modal>

    <h1>Family Calendar</h1>
    <div style="font-size: 2.5em;">
        <nuts-ym-field year-from="2015" year-period="6"></nuts-ym-field>
    </div>

    <div class="row" style="margin-bottom: 15px;">
        <div class="col-md-12">
            <div style="float:right;">
                <nuts-sidebar-toggle-button
                    type="btn-primary"
                    on_label="Close sidebar"
                    off_label="Open Sidebar"
                    emit="nuts-sidebar-toggle"
                ></nuts-sidebar-action-button>
            </div>
        </div>
    </div>

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

    <div class="row">
        <calendar></calendar>
    </div>

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
    </nuts-sidebar>

</div><!-- // .container -->
</body>

<!-- jquery & bootstrap -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<!-- vue.js -->
<script src="//cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.js"></script>
<script src="//cdn.jsdelivr.net/vue.resource/1.0.3/vue-resource.min.js"></script>

<!-- sidebar -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-sidebar/3.3.2/jquery.sidebar.min.js"></script>

<!-- main -->
<script>
    var nutsBus = new Vue();
</script>
<script src="/js/main.js"></script>
</html>
