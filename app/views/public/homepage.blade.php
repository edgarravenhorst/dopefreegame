@extends('public.layout.default')

@section('page-content')
	<section id='register' class='fluid columns-1 midway-horizontal midway-vertical'>
		<section class='span-6'>
			<section class='content'>
				<section class='inner'>
				<h1>Registreer uw deelname</h1>	
				{{ Form::open(array('url'=>'register')) }}
				
					@if ($errors->any())
						<div id='login-errors' class='errors'>
							<a href='#' class='close' data-dismiss='alert'>&times;</a>
							{{ implode('', $errors->all("<li class='error'>:message</li>")) }}
						</div>
					@endif
					
					{{ Form::text('bonds_nr', '', array('placeholder' => 'Bondsnummer', 'class'=>'form-control'))}}<br />
					{{ Form::text('serial_code', '', array('placeholder' => 'Deelname code', 'class'=>'form-control'))}}<br />
					{{ Form::text('email', '', array('placeholder' => 'Email', 'class'=>'form-control'))}}<br />
					{{ Form::password('password', array('placeholder' => 'Wachtwoord', 'class'=>'form-control'))}}<br />
					{{ Form::password('password_confirmation', array('placeholder' => 'Wachtwoord nogmaals', 'class'=>'form-control'))}}<br />
					{{ Form::submit('Registreren', array('class' =>'button'))}}
					
				{{ Form::close() }}
					
				</section>
			</section>
		</section>
		
		<section class='span-6'>
			<section class='content'>
				<section class='inner'>
				<h1>Of login</h1>	
				{{ Form::open(array('url'=>'login')) }}
				
					@if ($errors->any())
						<div id='login-errors' class='errors'>
							<a href='#' class='close' data-dismiss='alert'>&times;</a>
							{{ implode('', $errors->all("<li class='error'>:message</li>")) }}
						</div>
					@endif
					
					{{ Form::text('email', '', array('placeholder' => 'Email', 'class'=>'form-control'))}}<br />
					{{ Form::password('password', array('placeholder' => 'Wachtwoord', 'class'=>'form-control'))}}<br />
					{{ Form::submit('Inloggen', array('class' =>'button'))}}
					
					
				{{ Form::close() }}
					
				</section>
			</section>
		</section>
		
	</section>
@stop