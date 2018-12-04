<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::middleware('auth:api')->group(function () {

    // return $request->user();
    Route::post('Auth/logout', 'AuthController@logout');
    Route::post('Auth/updateProfile', 'AuthController@update');
    Route::post('Auth/getUser', 'AuthController@getUser');
});
Route::post('Auth/register','AuthController@register');
Route::post('Auth/login','AuthController@login');
Route::post('Auth/refresh','AuthController@refresh');
// Route::post('sendPasswordResetLink','AuthController@sendPasswordResetLink');
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');
Route::post('resetPassword', 'ChangePasswordController@process');
