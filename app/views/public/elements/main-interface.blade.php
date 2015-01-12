<section id='main-interface'>
	<audio id="background-audio" autoplay loop>
		<source src="{{ asset('assets/audio/bgsound.ogg') }}" type="audio/ogg">
  		<source src="{{ asset('assets/audio/bgsound.mp3') }}" type="audio/mpeg">
	</audio>
	<header>
		@if(Auth::user())
			{{ link_to_route('user_logout', 'Uitloggen') }}
		@endif
		<button class='audio-control'></button>
	</header>
	<footer>
		<ul class='sponsors'>
			<li class='logo-knwu'></li>
			<li class='logo-dopefree'></li>
			<li class='logo-authoriteit'></li>
		</ul>
	</footer>
</section>
