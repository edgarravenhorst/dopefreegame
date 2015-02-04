
<script>
    $("body").removeAttr("class");
    $('body').addClass('{{ $bodyClass }}');
</script>

@yield('page-content')
