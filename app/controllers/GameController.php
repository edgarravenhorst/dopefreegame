<?php

class GameController extends BaseController {
	
	function show_homepage(){
		if (Auth::user())
			return Redirect::route('game_start');
		
		$view = View::make('public.homepage');
		$view->title = 'Welkom';
		$view->bodyClass = 'homepage';
		return $view;
	}
	
	function game_start(){
		$view = View::make('public.game.start');
		$view->title = 'Start game';
		$view->bodyClass = 'game';
		$view->user = Auth::user();
		return $view;
	}
	
}
	