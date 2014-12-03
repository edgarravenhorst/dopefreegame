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
			'questionID' => '1',
			'question' => 'Dit is vraag 1, wat is volgens jou het beste antwoord',
			'answer1' => 'Is het antwoord 1?',
			'answer2' => 'Is het antwoord 2?',
			'answer3' => 'Is het antwoord 3?',
			'answer4' => 'Is het antwoord 4?',
			'answer5' => 'Is het antwoord 5?',

			'answer1_score' => '10',
			'answer2_score' => '4',
			'answer3_score' => '2',
			'answer4_score' => '8',
			'answer5_score' => '6',

			'most_used_answer' => '-1',

			'created_at' => date('Y-m-d H:m:s'),
			'updated_at' => date('Y-m-d H:m:s')
		));

		DB::table('questions')->insert(array(
			'questionID' => '2',
			'question' => 'Dit is vraag 2, wat is volgens jou het beste antwoord',
			'answer1' => 'Is het antwoord 1?',
			'answer2' => 'Is het antwoord 2?',
			'answer3' => 'Is het antwoord 3?',
			'answer4' => 'Is het antwoord 4?',
			'answer5' => 'Is het antwoord 5?',

			'answer1_score' => '2',
			'answer2_score' => '6',
			'answer3_score' => '8',
			'answer4_score' => '10',
			'answer5_score' => '4',

			'most_used_answer' => '-1',

			'created_at' => date('Y-m-d H:m:s'),
			'updated_at' => date('Y-m-d H:m:s')
		));

		DB::table('questions')->insert(array(
			'questionID' => '3',
			'question' => 'Dit is vraag 3, wat is volgens jou het beste antwoord',
			'answer1' => 'Is het antwoord 1?',
			'answer2' => 'Is het antwoord 2?',
			'answer3' => 'Is het antwoord 3?',
			'answer4' => 'Is het antwoord 4?',
			'answer5' => 'Is het antwoord 5?',

			'answer1_score' => '8',
			'answer2_score' => '10',
			'answer3_score' => '4',
			'answer4_score' => '2',
			'answer5_score' => '6',

			'most_used_answer' => '-1',

			'created_at' => date('Y-m-d H:m:s'),
			'updated_at' => date('Y-m-d H:m:s')
		));

		DB::table('questions')->insert(array(
			'questionID' => '4',
			'question' => 'Dit is vraag 4, wat is volgens jou het beste antwoord',
			'answer1' => 'Is het antwoord 1?',
			'answer2' => 'Is het antwoord 2?',
			'answer3' => 'Is het antwoord 3?',
			'answer4' => 'Is het antwoord 4?',
			'answer5' => 'Is het antwoord 5?',

			'answer1_score' => '6',
			'answer2_score' => '4',
			'answer3_score' => '10',
			'answer4_score' => '8',
			'answer5_score' => '2',

			'most_used_answer' => '-1',

			'created_at' => date('Y-m-d H:m:s'),
			'updated_at' => date('Y-m-d H:m:s')
		));

		DB::table('questions')->insert(array(
			'questionID' => '5',
			'question' => 'Dit is vraag 5, wat is volgens jou het beste antwoord',
			'answer1' => 'Is het antwoord 1?',
			'answer2' => 'Is het antwoord 2?',
			'answer3' => 'Is het antwoord 3?',
			'answer4' => 'Is het antwoord 4?',
			'answer5' => 'Is het antwoord 5?',

			'answer1_score' => '2',
			'answer2_score' => '4',
			'answer3_score' => '6',
			'answer4_score' => '8',
			'answer5_score' => '10',

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
