<?php

class PageController extends BaseController {

	function show_homepage() {
		if (Auth::user())
			return Redirect::route('page_terms');

		$view = View::make('public.pages.login');
		$view->title = 'Welkom';
		$view->bodyClass = 'homepage';
		return $view;
	}

	function show_login() {
		if (Auth::user())
			return Redirect::route('page_terms');

		$view = View::make('public.pages.login');
		$view->title = 'Login';
		$view->bodyClass = 'login';
		return $view;
	}

	function show_terms() {
		$view = View::make('public.pages.terms');
		$view->title = 'Algemene voorwaarden';
		$view->bodyClass = 'game';
		$view->user = Auth::user();
		return $view;
	}

	function show_loading() {
		$view = View::make('public.pages.loading');
		$view->title = 'Loading game';
		$view->bodyClass = 'loading';
		$view->user = Auth::user();
		return $view;
	}

	function show_game() {
		$view = View::make('public.pages.game');
		$view->title = 'Doping game';
		$view->bodyClass = 'game';
		$view->user = Auth::user();
		return $view;
	}

	function show_congrats() {
		$view = View::make('public.pages.congrats');
		$view->title = 'Gefeliciteerd';
		$view->bodyClass = 'game';
		$view->user = Auth::user();
		return $view;
	}

}
