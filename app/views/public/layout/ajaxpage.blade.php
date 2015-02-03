<html>
	<head>
		<title>Anti doping | {{ $title }}</title>

		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

		{{ HTML::style('assets/css/jquery.jscrollpane.css') }}
		{{ HTML::style('assets/css/site.css') }}
	</head>

	<body>
		<script>
			$("body").removeAttr("class");
			$('body').addClass('{{ $bodyClass }}');
		</script>
		@yield('page-content')
	</body>

</html>
