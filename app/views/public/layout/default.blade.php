<html>
	<head>
		<title>Anti doping | {{ $title }}</title>

		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

		{{ HTML::script('assets/js/external/jquery.touchSwipe.js') }}
		{{ HTML::style('assets/css/jquery.jscrollpane.css') }}
		{{ HTML::style('assets/css/site.css') }}

	</head>
	<body class='{{ $bodyClass }}'>

		@include('public.elements.main-interface')

		@yield('page-content')
		{{ HTML::script('assets/js/external/midway.min.js') }}
		{{ HTML::script('assets/js/external/jquery.jscrollpane.min.js') }}
		{{ HTML::script('assets/js/external/jquery.mousewheel.js') }}
		{{ HTML::script('assets/js/edgeart/pagecontroller.js') }}


	</body>
</html>
