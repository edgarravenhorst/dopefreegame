<html>
	<head>
		<title>Anti doping | {{ $title }}</title>

		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

		{{ HTML::style('assets/css/jquery.jscrollpane.css') }}
		{{ HTML::style('assets/css/site.css') }}
	</head>
	<body class='{{ $bodyClass }}'>



		@yield('page-content')

		<section id='main-interface'>
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

		{{ HTML::script('assets/js/external/midway.min.js') }}
		{{ HTML::script('assets/js/external/jquery.jscrollpane.min.js') }}
		{{ HTML::script('assets/js/external/jquery.mousewheel.js') }}

	</body>
</html>