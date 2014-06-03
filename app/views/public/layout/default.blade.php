<html>
	<head>
		<title>Anti doping | {{ $title }}</title>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		{{ HTML::script('assets/js/external/midway.min.js') }}

		{{ HTML::style('assets/css/site.css') }}
	</head>
	<body class='{{ $bodyClass }}'>
		
		@yield('page-content')
		
	</body>
</html>