<p>
Click URL below to reset your password:<br />
<br />
<a href="{{ $link = url('password/reset', $token).'?email='.urlencode($user->getEmailForPasswordReset()) }}"> {{ $link }} </a><br>
<br />
This URL is effective for {{ \Config::get('auth.passwords.users.expire') }} minutes from you've been received this email.
</p>
