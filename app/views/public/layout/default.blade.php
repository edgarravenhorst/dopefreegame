<html>
	<head>
		<title>Anti doping | {{ $title }}</title>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		{{ HTML::script('assets/js/external/midway.min.js') }}

		{{ HTML::style('assets/css/site.css') }}
	</head>
	<body class='{{ $bodyClass }}'>

		@if(Auth::user())
			{{ link_to_route('user_logout', 'Uitloggen') }}
		@endif

		@yield('page-content')

		<section id='app-interface'>
			<button class='audio-control'></button>
			<ul class='partners'>
				<li><a href=#""><img src="" /></a></li>
				<li><a href=#""><img src="" /></a></li>
				<li><a href=#""><img src="" /></a></li>
			</ul>
		</section>

	</body>
</html>