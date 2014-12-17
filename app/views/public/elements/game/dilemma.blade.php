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
			<section class='question'>
				<section class='content'>
					<section class='inner'>
					<h1>Dilemma Naam {{ $question->questionID }}</h1>
					<p>{{ $question->question }}</p>
					<h1>Wat zou jij doen?</h1>
					<ul class='answers'>
						<li id='a' data-id="1" class='answer1'>{{ $question->answer1 }}</li>
						<li id='b' data-id="2" class='answer2'>{{ $question->answer2 }}</li>
						<li id='c' data-id="3" class='answer3'>{{ $question->answer3 }}</li>
						<li id='d' data-id="4" class='answer4'>{{ $question->answer4 }}</li>
						<li id='e' data-id="5" class='answer5'>{{ $question->answer5 }}</li>
					</ul>
					</section>
					<button class='btn-continue'>Verder</button>
				</section>
			</section>

			<section class="videocontainer">
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

			<button class='btn-close'></button>
		</section>