@extends('public.layout.default')

@section('page-content')

	<figure class='logo'></figure>

	<section id='login' class='midway-horizontal midway-vertical'>
		<ul class='errors'></ul>

		{{ Form::open(array('route' => 'user_login','autocomplete' => 'off')) }}

			@if ($errors->any())
				<div id='login-errors' class='errors'>
					{{ implode('', $errors->all("<li class='error'>:message</li>")) }}
				</div>
			@endif
			{{ Form::hidden('activationcode', $activationcode) }}
			{{ Form::text('email', '', array('placeholder' => 'Jouw E-mailadres', 'class'=>'form-control'))}}<br />
			{{ Form::text('password', '', array('placeholder' => 'Jouw Licentienummer', 'class'=>'form-control'))}}<br />
			{{ Form::submit('', array('class' =>'submit'))}}

		{{ Form::close() }}

	</section>

@stop