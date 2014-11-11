<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', array('as'=>'homepage', 'uses'=>'GameController@show_homepage'));

Route::post('register', array('as'=>'user_register', 'uses'=>'UserController@post_register'));
Route::post('login', array('as'=>'user_login', 'uses'=>'UserController@post_login'));
Route::get('logout', array('as'=>'user_logout', 'uses'=>'UserController@user_logout'));

Route::group(array('before' => 'auth'), function(){

	Route::get('/uitleg', array('as'=>'game_start', 'uses'=>'GameController@game_start'));

});