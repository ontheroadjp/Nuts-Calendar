<nav class="nav navbar-fixed-top" style="border-bottom: 1px solid #00d1b2;">
    <div class="nav-left">
        <a class="nav-item is-brand" href="/">
            <img src="//bulma.io/images/bulma-type.png" alt="Bulma logo">
        </a>
    </div>

<!--
    <div class="nav-center">
        <a class="nav-item" href="#">
            <span class="icon">
                <i class="fa fa-facebook"></i>
            </span>
        </a>
        <a class="nav-item" href="#">
            <span class="icon">
                <i class="fa fa-twitter"></i>
            </span>
        </a>
    </div>
-->

    <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
    </span>

    <div class="nav-right nav-menu">
                    @if (Auth::guest())
                        <a href="{{ url('/login') }}" class="nav-item">Login</a>
                        <a href="{{ url('/register') }}" class="nav-item">Register</a>
                    @else
                        <li class="dropdown">
                            <a
                                href="#"
                                class="dropdown-toggle nav-item"
                                data-toggle="dropdown"
                                role="button"
                                aria-expanded="false"
                            >
                                {{ Auth::user()->name }} <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu" role="menu">
                                <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                            </ul>
                        </li>
                    @endif
<!--
        <a class="nav-item" href="#">
            Dashboard
        </a>
        <a class="nav-item" href="#">
            Documentation
        </a>
-->
        <span class="nav-item">
            <a class="button" >
                <span class="icon">
                    <i class="fa fa-twitter"></i>
                </span>
                <span>Tweet</span>
            </a>
            <!-- <a class="button is-primary" href="#">
                <span class="icon">
                    <i class="fa fa-download"></i>
                </span>
                <span>Download</span>
            </a> -->
        </span>
    </div>
</nav>
