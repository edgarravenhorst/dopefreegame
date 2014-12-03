@extends('public.layout.default')

@section('page-content')

	<figure class='logo'></figure>

	<section id='page-content' class='midway-horizontal midway-vertical'>
		<section class='scroll-content'>
			<h4>Hallo, {{$user->first_name}} {{$user->pre_last_name}} {{$user->last_name}}</h4>
			<p>Ben je klaar voor de challenge? voleseq uatur, ent quideniatum reperspe quateni atibus alis estiossi adis que invellupta quae. </p><p>Et aut omnia dicatem dolen adiaseda pero mostrum re senimin cipita consequas as est, coreius eatur?te et que net, is duscimin nusdam dem faccabo rehentem. Velesci endicipsam quam quam fuga. Et vel moluptur accus ate sit.</p>
			<p>Ben je klaar voor de challenge? voleseq uatur, ent quideniatum reperspe quateni atibus alis estiossi adis que invellupta quae. </p><p>Et aut omnia dicatem dolen adiaseda pero mostrum re senimin cipita consequas as est, coreius eatur?te et que net, is duscimin nusdam dem faccabo rehentem. Velesci endicipsam quam quam fuga. Et vel moluptur accus ate sit.</p>
			<p>Ben je klaar voor de challenge? voleseq uatur, ent quideniatum reperspe quateni atibus alis estiossi adis que invellupta quae. </p><p>Et aut omnia dicatem dolen adiaseda pero mostrum re senimin cipita consequas as est, coreius eatur?te et que net, is duscimin nusdam dem faccabo rehentem. Velesci endicipsam quam quam fuga. Et vel moluptur accus ate sit.</p>
			<p>Ben je klaar voor de challenge? voleseq uatur, ent quideniatum reperspe quateni atibus alis estiossi adis que invellupta quae. </p><p>Et aut omnia dicatem dolen adiaseda pero mostrum re senimin cipita consequas as est, coreius eatur?te et que net, is duscimin nusdam dem faccabo rehentem. Velesci endicipsam quam quam fuga. Et vel moluptur accus ate sit.</p>
		</section>

		<div class='btn-terms'>Ik accepteer de <a href='#' >100% Dope Free Challenge wedstrijdvoorwaarden</a></div>

		<button class='btn-start-game'></button>
	</section>

	<script>
		$( ".btn-terms" ).click(function() {
		  $( this ).toggleClass( "checked" );
		  $( '.btn-start-game' ).toggleClass( "active" );
		});

		$( "#page-content" ).on('click', '.btn-start-game.active',function() {
			window.location.assign('game');
		});
	</script>

	{{ HTML::script('assets/js/edgeart/scrollbar.js') }}
@stop