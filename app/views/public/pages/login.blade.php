@extends('public.layout.default')

@section('page-content')

	<section id='login'>
		<figure class='logo'></figure>
		<ul class='errors'></ul>

		{{ Form::open(array('url'=>'login')) }}

			@if ($errors->any())
				<div id='login-errors' class='errors'>
					<a href='#' class='close' data-dismiss='alert'>&times;</a>
					{{ implode('', $errors->all("<li class='error'>:message</li>")) }}
				</div>
			@endif

			{{ Form::text('email', '', array('placeholder' => 'Jouw E-mailadres', 'class'=>'form-control'))}}<br />
			{{ Form::password('password', array('placeholder' => 'Jouw Licentienummer', 'class'=>'form-control'))}}<br />
			{{ Form::submit('Log in', array('class' =>'submit'))}}

		{{ Form::close() }}

	</section>

@stop