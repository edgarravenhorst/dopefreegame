<?php

class PageController extends BaseController {

    function show_homepage() {
        if (Auth::user())
            return Redirect::route('terms');

        $view = View::make('public.pages.login');
        $view->title = 'Login';
        $view->bodyClass = 'loginscreen';
        $view->activationcode;

        return $view;
    }

    function show_ajax() {

        $view = View::make('public.pages.index');
        $view->title = 'Welkom';
        $view->bodyClass = '';
        $view->activationcode;

        return $view;
    }

    function show_login($activationcode) {
        if (Auth::user())
            return Redirect::route('terms');

        $view = View::make('public.pages.login');
        $view->title = 'Login';
        $view->bodyClass = 'loginscreen';
        $view->activationcode;
        return $view;
    }

    function show_terms() {
        $view = View::make('public.pages.terms');
        $view->title = 'Algemene voorwaarden';
        $view->bodyClass = 'terms';
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

        $submission = Submission::find($view->user->id);
        $questions = Questions::get();

        foreach($questions as $question){
            $is_answered = ($submission['question'.$question->questionID] != 0);
            $question->is_answered = $is_answered;
        }

        $view->finished = '';

        $view->submission = $submission;
        $view->questions = $questions;

        return $view;
    }

    function show_congrats() {
        $view = View::make('public.pages.finish');
        $view->title = 'Gefeliciteerd';
        $view->bodyClass = 'finish';
        $view->user = Auth::user();
        return $view;
    }

}
