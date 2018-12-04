@component('mail::message')
# Change Password Request

Click on the button below to change password

@component('mail::button', ['url' => 'http://localhost:4200/response-password-reset?token='.$token])
Password Reset
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
