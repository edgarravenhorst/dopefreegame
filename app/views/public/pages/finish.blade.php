@extends('public.layout.ajaxpage')

@section('page-content')

<section id='page-content'>

    <h1>Gefeliciteerd</h1>
    <p>Je hebt de challenge doorstaan</p>

    <button class='ranking'>Check je ranking!</button>

    <p>Like onze facebook pagina <strong><a href='#' >100% Dope Free Challenge</a></strong><br /> en maak kans op een raceset t.w.v. €200,- </p>

    <section>
        <p>Deel je score</p>
        <a href='#' class='sharebtn btn-fb'>F</a>
        <a href='#' class='sharebtn btn-twitter'>T</a>
    </section>

    <footer>
        <p>100% Dope Free Challenge is onderdeel van 'koersen op een schone sport' <br />
            mede mogelijk gemaakt door een financiering van de VWS
        </p>
        <ul>
            <li class='logo-1'></li>
            <li class='logo-2'></li>
            <li class='logo-3'></li>
            <li class='logo-4'></li>
        </ul>
    </footer>

</section>

<section id='score-overlay'>
    <section class='inner'>
        <h2>Eindscore<br /><span class='font-2'>challenge 3</span></h2>
        <h1><span class='points'></span><br /><span class='font-2'>Punten</span></h1>
    </section>
</section>

<script>
    $(document).ready(function(){
        $('#score-overlay').addClass('visible');
    })
</script>

@stop
