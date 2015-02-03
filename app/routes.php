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

//Route::get('/', array('as'=>'homepage', 'uses'=>'PageController@show_homepage'));

Route::get('/', array('as'=>'ajax', 'uses'=>'PageController@show_ajax'));

Route::get('/activate/{activationcode}', array('as'=>'activateUser', 'uses'=>'PageController@show_login'));

Route::get('/login', array('as'=>'homepage', 'uses'=>'PageController@show_homepage'));
Route::post('/login', array('as'=>'user_login', 'uses'=>'UserController@init_user'));

Route::group(array('before' => 'auth'), function(){
	Route::get('/voorwaarden', array('as'=>'terms', 'uses'=>'PageController@show_terms'));
	Route::get('/game', array('as'=>'game_start', 'uses'=>'PageController@show_game'));
	Route::get('/finish', array('as'=>'game_finish', 'uses'=>'PageController@show_congrats'));

	Route::get('/submit/{questionID}/{answerID}', array('as'=>'submitAnswer', 'uses'=>'GameController@submit_answer'));
	Route::get('/resetsubmission', array('as'=>'resetSubmission', 'uses'=>'GameController@reset_submission'));

	Route::get('/logout', array('as'=>'user_logout', 'uses'=>'UserController@user_logout'));
});
