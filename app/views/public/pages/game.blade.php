@extends('public.layout.ajaxpage')

@section('page-content')
	<script> var userID = {{$user->id}}</script>
	<section id='loading-overlay' class=''>

	</section>

	<section id='game-carousel'>
		<canvas id='carousel' width='1280' height="720"></canvas>
	</section>


	@include('public.elements.game.interface')


	@foreach ($questions as $question)
		@include('public.elements.game.dilemma')
	@endforeach

	<section id='score-overlay'>
		<section class='inner'>
			<h2>Eindscore<br /><span class='font-2'>challenge 3</span></h2>
			<h1><span class='points'></span><br /><span class='font-2'>Punten</span></h1>
		</section>
	</section>

	{{ HTML::script('assets/js/external/jquery.touchSwipe.js') }}
	{{ HTML::script('assets/js/edgeart/carousel.js') }}
	{{ HTML::script('assets/js/edgeart/videocontroller.js') }}
	{{ HTML::script('assets/js/edgeart/game.js') }}

	<script>
		initCarousel();
	</script>
@stop