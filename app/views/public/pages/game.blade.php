@extends('public.layout.default')

@section('page-content')
	<script> var userID = {{$user->id}}</script>
	<section id='loading-overlay' class=''>

	</section>

	<section id='game-carousel'>
		<canvas id='carousel' width='1280' height="720"></canvas>
	</section>

	<section id='game-interface'>
		
		<section id="video-container">		
			<video id="main-video" preload>
				<source src="https://s3-us-west-2.amazonaws.com/dopefreegame/videos/thijs/verhaal.mp4" type="video/mp4"></source>
			</video>
			
			<section id="load-bar">
				<section id="loader"></section>
			</section>
			 <section id="video-controls">			 	
			    <button type="button" id="play-pause"><img src="assets/images/video/pause-btn.png"/></button>
			    <button type="button" id="mute"><img src="assets/images/video/mute-btn.png"/></button> 
			    <section id="time-indicator"></section>	
			    <section id="time-duration"></section>			    
			    <input type="button" id="skip-btn" value="skip" />
			 </section>
		</section>
		
		
		<button class='btn-previous'></button>
		<button class='btn-next'></button>

		<section id='label-p1' data-person='1' class='label'>
			<h2><span class='color-1'>
				Challenge 1</span><br />
				Voornaam<br />
				Achternaam<br />
				<span class='font-2'>Taakomschrijving</span>
			</h2>
		</section>
		<section id='label-p2' data-person='2' class='label'>
			<h2><span class='color-1'>
				Challenge 2</span><br />
				Voornaam<br />
				Achternaam<br />
				<span class='font-2'>Taakomschrijving</span>
			</h2>
		</section>
		<section id='label-p3' data-person='3' class='label'>
			<h2><span class='color-1'>
				Challenge 3</span><br />
				Voornaam<br />
				Achternaam<br />
				<span class='font-2'>Taakomschrijving</span>
			</h2>
		</section>
		<section id='label-p4' data-person='4' class='label'>
			<h2><span class='color-1'>
				Challenge 4</span><br />
				Voornaam<br />
				Achternaam<br />
				<span class='font-2'>Taakomschrijving</span>
			</h2>
		</section>
		<section id='label-p5' data-person='5' class='label'>
			<h2><span class='color-1'>
				Challenge 5</span><br />
				Voornaam<br />
				Achternaam<br />
				<span class='font-2'>Taakomschrijving</span>
			</h2>
		</section>

		<footer>
			<ul class='sponsors'>
				<li class='logo-knwu'></li>
				<li class='logo-dopefree'></li>
				<li class='logo-authoriteit'></li>
			</ul>

			<section class='person-select'>
				<button data-frame="0" class='person1'><span class='overlay'></span></button>
				<button data-frame="72" class='person2'><span class='overlay'></span></button>
				<button data-frame="144" class='person3'><span class='overlay'></span></button>
				<button data-frame="216" class='person4'><span class='overlay'></span></button>
				<button data-frame="288" class='person5'><span class='overlay'></span></button>
			</section>
		</footer>
	</section>


	@foreach ($questions as $question)
		@if ($question->is_answered)
			 <section id='dilemma-p{{$question->questionID}}' data-id='{{$question->questionID}}' class='dilemma finished'>
		@else
			 <section id='dilemma-p{{$question->questionID}}' data-id='{{$question->questionID}}' class='dilemma'>
		@endif

			<section class='summery'>
				<section class='content '>
					<h1>Naam Persoon {{$question->questionID}}</h1>
					<table>
						<tr><td>Geboortedatum</td><td>00 Maand 1900</td></tr>
						<tr><td>Geboorteplaats</td><td>Plaatsnaam</td></tr>
						<tr><td>Woonplaats</td><td>Plaatsnaam</td></tr>
						<tr><td>Lengte</td><td>0,00 meter</td></tr>
						<tr><td>Gewicht</td><td>00 Kilo</td></tr>
						<tr><td>Rustpols</td><td>00</td></tr>
						<tr><td>Maximum hartslag</td><td>000</td></tr>
						<tr><td>Huidige ploeg</td><td>Ploegnaam</td></tr>
					</table>
				</section>
				<button class='btn-start-challenge'>
					<h2>
						start<br />
						<span class='font-2'>Challenge 1</span>
					</h2>
				</button>
			</section>
			<section data-id='{{ $question->questionID }}' class='question'>
				<section class='content'>
					<section class='inner'>
					<h1>Dilemma Naam {{ $question->questionID }}</h1>
					<p>{{ $question->question }}</p>
					<h1>Wat zou jij doen?</h1>
					<ul class='answers'>
						<li data-id="a" class='answer1'>{{ $question->answer1 }}</li>
						<li data-id="b" class='answer2'>{{ $question->answer2 }}</li>
						<li data-id="c" class='answer3'>{{ $question->answer3 }}</li>
						<li data-id="d" class='answer4'>{{ $question->answer4 }}</li>
						<li data-id="e" class='answer5'>{{ $question->answer5 }}</li>
					</ul>
					</section>
					<button class='btn-continue'>Verder</button>
				</section>
			</section>

			<video class='vid1'></video>
			<video class='vid2'></video>

			<button class='btn-close'></button>
		</section>
	@endforeach

	<section id='score-overlay'>
		<section class='inner'>
			<h2>Eindscore<br /><span class='font-2'>challenge 3</span></h2>
			<h1><span class='points'></span><br /><span class='font-2'>Punten</span></h1>
		</section>
	</section>

	{{ HTML::script('assets/js/external/jquery.touchSwipe.js') }}
	{{ HTML::script('assets/js/edgeart/carousel.js') }}
	{{ HTML::script('assets/js/edgeart/game.js') }}
@stop