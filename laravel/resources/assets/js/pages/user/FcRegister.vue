<template>
<div class="container" style="width: 100%; height: 100vh">
<div class="row">
<div class="col-md-8 col-md-offset-2">

<!--
            <div class="panel panel-default">
                <div class="panel-heading">Register</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ url('/register') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                            <label for="name" class="col-md-4 control-label">Name</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}">

                                @if ($errors->has('name'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}">

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <label for="password" class="col-md-4 control-label">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password">

                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                            <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation">

                                @if ($errors->has('password_confirmation'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password_confirmation') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fa fa-btn fa-user"></i> Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
-->

    <!-- ------------------------------------------------------------------ -->

    <div class="panel" style="margin-top: 120px;">
        <!-- <p class="panel-heading">Login</p> -->
        <!-- <div class="panel-block"> -->
        <div style="
            padding: 60px;
            width: 100%;
        ">

            <form>

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input 
                        class="nuts-input-textbox is-medium" 
                        type="text" 
                        placeholder="{{ nameHasError ? errors.name : 'Name' }}"
                        style="margin-bottom: 25px;"
                        v-model="input.name"
                        v-focus
                    >
                    <span class="icon" :style="[nameHasError ? style.error : '']">
                        <i class="fa fa-user"></i>
                    </span>
                </p>
            </div>

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input 
                        class="nuts-input-textbox is-medium" 
                        type="email" 
                        placeholder="{{ emailHasError ? errors.email : 'E-Mail Address' }}"
                        style="margin-bottom: 25px;"
                        v-model="input.email"
                    >
                    <span class="icon" :style="[emailHasError ? style.error : '']">
                        <i class="fa fa-envelope"></i>
                    </span>
                </p>
            </div>

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input 
                        class="nuts-input-textbox is-medium" 
                        type="password" 
                        placeholder="{{ passwordHasError ? errors.password : 'Password' }}"
                        style="margin-bottom: 20px;"
                        v-model="input.password"
                    >
                    <span class="icon" :style="[passwordHasError ? style.error : '']">
                        <i class="fa fa-lock"></i>
                    </span>
                </p>
            </div>

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input 
                        class="nuts-input-textbox is-medium" 
                        type="password" 
                        placeholder="{{ passwordConfirmationHasError ? errors.passwordConfirmation : 'Password ( Confirm )' }}"
                        style="margin-bottom: 20px;"
                        v-model="input.passwordConfirmation"
                    >
                    <span class="icon" :style="[passwordConfirmationHasError ? style.error : '']">
                        <i class="fa fa-lock"></i>
                    </span>
                </p>
            </div>

            <p class="control is-horizontal is-pulled-right">
                <a 
                    class="btn btn-link" 
                    v-link="{path: '/login'}"
                >Login Form</a>
            </p>

            <div class="is-clearfix" style="margin-bottom: 25px"></div>

            <p style="text-align: center;">
                <button 
                    type="submit"
                    class="button is-nuts-primary is-large" 
                    style="width: 25%" 
                    @click.prevent="register()"
                >Register</button>
            </p>

            </form>

        </div>
    </div><!-- // .panel -->

</div><!-- // .col-x -->
</div><!-- // .row -->
</div><!-- // .container -->
</template>

<script>
    import userMixin from '../../mixins/User.js';
    export default {
        mixins: [
            userMixin
        ],
    }
</script>

<style>
</style>
