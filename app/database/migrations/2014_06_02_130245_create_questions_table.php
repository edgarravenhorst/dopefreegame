<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('questions', function($table) {
			$table->increments('id');

			$table->char('pFirstname', 255);
			$table->char('pLastname', 255);
			$table->char('pProfession', 255);
			$table->char('', 255);
			$table->char('pBirthplace', 255);
			$table->char('pCity', 255);
			$table->char('pLength', 255);
			$table->char('pWeight');
			$table->integer('pMinHearthrate');
			$table->integer('pMaxHearthrate');
			$table->char('pTeam', 255);

			$table->integer('questionID');
			$table->text('question');
			$table->text('answer1');
			$table->text('answer2');
			$table->text('answer3');
			$table->text('answer4');
			$table->text('answer5');

			$table->integer('answer1_score');
			$table->integer('answer2_score');
			$table->integer('answer3_score');
			$table->integer('answer4_score');
			$table->integer('answer5_score');

			$table->text('most_used_answer');

			$table->timestamps();
		});


		DB::table('questions')->insert(array(
            'pFirstName' => 'Thijs',
            'pLastname' => 'Zonneveld',
            'pProfession' => 'Wielrenner',
            'pBirthdate' => '00-00-0000',
            'pBirthplace' => 'Plaatsnaam',
            'pCity' => 'Plaatsnaam',
            'pLength' => '0.00m',
            'pWeight' => '00kg',
            'pMinHearthrate' => '1',
            'pMaxHearthrate' => '1',
            'pTeam' => 'Ploegnaam',

			'questionID' => '1',
			'question' => 'Je krijgt van een ploeggenoot een dopingmiddel aangeboden dat gegarandeerd niet opspoorbaar is bij een dopingcontrole. Wat zou jij ermee doen?',
			'answer1' => 'Ik ga de doping gebruiken. Het is een mooie kans om beter te presteren.',
			'answer2' => 'Ik gooi de doping weg. Ik begrijp mijn ploeggenoot wel, maar zelf wil ik absoluut niet gebruiken.',
			'answer3' => 'Ik gooi de doping weg. Ik keur het gedrag van mijn ploeggenoot af, maar dat vertel ik hem/haar niet.',
			'answer4' => 'Ik neem de doping niet aan en ga direct het gesprek aan met mijn ploeggenoot. Met zijn/haar dopinggebruik brengt hij het wielrennen in gevaar. Hij/zij moet onmiddellijk stoppen.',
			'answer5' => 'Ik weet het niet.',

			'answer1_score' => '-500000',
			'answer2_score' => '-200000',
			'answer3_score' => '-100000',
			'answer4_score' => '100000',
			'answer5_score' => '-10000',

			'most_used_answer' => '-1',

			'created_at' => date('Y-m-d H:m:s'),
			'updated_at' => date('Y-m-d H:m:s')
		));

		DB::table('questions')->insert(array(
            'pFirstName' => 'Rudi',
            'pLastname' => 'Kemna',
            'pProfession' => 'Coach',
            'pBirthdate' => '00-00-0000',
            'pBirthplace' => 'Plaatsnaam',
            'pCity' => 'Plaatsnaam',
            'pLength' => '0.00m',
            'pWeight' => '00kg',
            'pMinHearthrate' => '1',
            'pMaxHearthrate' => '1',
            'pTeam' => 'Ploegnaam',

			'questionID' => '2',
			'question' => 'Je bent ploegleider van een team. Een renner vraagt jou of het in orde is om in de koers pijnstillers te gebruiken om beter te presteren. Wat is jouw mening?',
			'answer1' => 'Ik moedig het gebruik aan, want het zou kunnen dat mijn renners dan beter gaan presteren.',
			'answer2' => 'Ik vind het prima als een renner pijnstillers wil gebruiken. Wie ben ik om daar iets van te zeggen.',
			'answer3' => 'Ik laat de keuze aan de renner, maar ik zeg wel dat ik er eigenlijk niet achter sta.',
			'answer4' => 'Ik accepteer niet dat mijn renners pijnstillers gebruiken om beter te presteren. Het zijn geneesmiddelen, die gebruik je niet zomaar.',
			'answer5' => 'Ik weet het niet.',

			'answer1_score' => '-200000',
			'answer2_score' => '-50000',
			'answer3_score' => '20000',
			'answer4_score' => '100000',
			'answer5_score' => '-10000',

			'most_used_answer' => '-1',

			'created_at' => date('Y-m-d H:m:s'),
			'updated_at' => date('Y-m-d H:m:s')
		));

		DB::table('questions')->insert(array(
            'pFirstName' => 'Kirsten',
            'pLastname' => 'Wild',
            'pProfession' => 'Wielrenner',
            'pBirthdate' => '00-00-0000',
            'pBirthplace' => 'Plaatsnaam',
            'pCity' => 'Plaatsnaam',
            'pLength' => '0.00m',
            'pWeight' => '00kg',
            'pMinHearthrate' => '1',
            'pMaxHearthrate' => '1',
            'pTeam' => 'Ploegnaam',

			'questionID' => '3',
			'question' => 'Vind jij dat je zomaar voedingssupplementen kunt gebruiken?',
			'answer1' => 'In bepaalde gevallen wel. Alleen als ik samen met bijvoorbeeld mijn sportarts concludeer dat de supplementen voor mij nuttig zijn én ze getest zijn op doping, dan neem ik ze.',
			'answer2' => 'Ja, als ik denk dat het helpt dan neem ik ze. Het maak dan niet uit of de supplementen volgens de sportarts nuttig zijn en of ze getest zijn op doping.',
			'answer3' => 'Nee, ik vind niet dat je zomaar supplementen kunt gebruiken, want er is grote kans dat er doping in zit.',
			'answer4' => 'Nee, ik vind niet dat je zomaar supplementen kunt gebruiken. Ik denk dat ik op andere vlakken (zoals training, voeding en mentaal) meer winst kan halen.',
			'answer5' => 'Ik weet het niet.',

			'answer1_score' => '100000',
			'answer2_score' => '-100000',
			'answer3_score' => '20000',
			'answer4_score' => '10000',
			'answer5_score' => '-10000',

			'most_used_answer' => '-1',

			'created_at' => date('Y-m-d H:m:s'),
			'updated_at' => date('Y-m-d H:m:s')
		));

		DB::table('questions')->insert(array(
            'pFirstName' => 'Thorwald',
            'pLastname' => 'Veneberg',
            'pProfession' => 'Wielrenner',
            'pBirthdate' => '00-00-0000',
            'pBirthplace' => 'Plaatsnaam',
            'pCity' => 'Plaatsnaam',
            'pLength' => '0.00m',
            'pWeight' => '00kg',
            'pMinHearthrate' => '1',
            'pMaxHearthrate' => '1',
            'pTeam' => 'Ploegnaam',

			'questionID' => '4',
			'question' => 'Iemand vertelt je dat hij/zij doping heeft gebruikt. Wat zou jij doen met deze informatie?',
			'answer1' => 'Niets. Een dopingtest moet maar aantonen of iemand doping heeft gebruikt.',
			'answer2' => 'Ik zou wachten tot na de koers. Heeft hij/zij in de prijzen gereden, dan zou ik direct naar de wedstrijdleiding stappen.',
			'answer3' => 'Ik zou het voorval melden (bijvoorbeeld bij het Vertrouwenspunt Sport). Ik noem daarbij geen namen.',
			'answer4' => 'Ik zou het voorval melden (bijvoorbeeld bij het Vertrouwenspunt Sport). Ik vertel dan ook om welke renner het gaat, want dopinggebruik kan echt niet (meer).',
			'answer5' => 'Ik weet het niet.',

			'answer1_score' => '-3000',
			'answer2_score' => '-2000',
			'answer3_score' => '500',
			'answer4_score' => '1000',
			'answer5_score' => '-100',

			'most_used_answer' => '-1',

			'created_at' => date('Y-m-d H:m:s'),
			'updated_at' => date('Y-m-d H:m:s')
		));

		DB::table('questions')->insert(array(
            'pFirstName' => 'Mike',
            'pLastname' => 'Theunissen',
            'pProfession' => 'Wielrenner',
            'pBirthdate' => '00-00-0000',
            'pBirthplace' => 'Plaatsnaam',
            'pCity' => 'Plaatsnaam',
            'pLength' => '0.00m',
            'pWeight' => '00kg',
            'pMinHearthrate' => '1',
            'pMaxHearthrate' => '1',
            'pTeam' => 'Ploegnaam',

			'questionID' => '5',
			'question' => 'Vind jij het belangrijk dat jouw ploeg een sterk antidopingbeleid heeft?',
			'answer1' => 'Nee, want er wordt nauwelijks nog doping gebruikt in het wielrennen.',
			'answer2' => 'Ja, want ik denk dat dit belangrijk is voor het realiseren van een schone wielersport.',
			'answer3' => 'Nee, ik vind het bijvoorbeeld veel belangrijker of ik bij mijn ploeg op hoog niveau kan presteren.',
			'answer4' => 'Ja, want ik wil zelf niet in de verleiding komen om doping te gebruiken.',
			'answer5' => 'Ik weet het niet.',

			'answer1_score' => '-100000',
			'answer2_score' => '100000',
			'answer3_score' => '-100000',
			'answer4_score' => '20000',
			'answer5_score' => '-10000',

			'most_used_answer' => '-1',

			'created_at' => date('Y-m-d H:m:s'),
			'updated_at' => date('Y-m-d H:m:s')
		));

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('questions');
	}

}
