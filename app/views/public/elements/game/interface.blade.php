<section id='game-interface'>

    <button class='btn-previous'></button>
    <button class='btn-next'></button>

    @foreach ($questions as $question)
    <section id='label-p{{$question->questionID}}' data-person='{{$question->questionID}}' class='label'>
        <h2><span class='color-1'>
            Challenge {{$question->questionID}}</span><br />
            {{$question->pFirstname}}<br />
            {{$question->pLastname}}<br />
            <span class='font-2'>{{$question->pProfession}}</span>
        </h2>
        <span class='arrow'></span>
    </section>
    @endforeach

    <footer>
        <section id='sponsors'></section>

        <section id='scores'>
            <ul class='scores_a'>
                <li class='score_challenge'>Challenge x score: <span class='value'>0000</span></li>
                <li class='score_minigame'>Mini game score: <span class='value'>0000</span></li>
            </ul>
            <ul class='scores_b'>
                <li class='score_total'>Jouw totaal score: <span class='value'>{{$submission->score}}</span></li>
                <li class='score_club'>Wielers Utrecht: <span class='value'>0431</span></li>
            </ul>
        </section>

        <section class='person-select'>
            <button data-frame="0" class='person1'><span class='overlay'></span></button>
            <button data-frame="72" class='person2'><span class='overlay'></span></button>
            <button data-frame="144" class='person3'><span class='overlay'></span></button>
            <button data-frame="216" class='person4'><span class='overlay'></span></button>
            <button data-frame="288" class='person5'><span class='overlay'></span></button>
        </section>
    </footer>
</section>
