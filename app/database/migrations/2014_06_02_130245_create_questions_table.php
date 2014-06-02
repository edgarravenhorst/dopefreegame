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
			$table->text('question');
			$table->text('answer1');
			$table->text('answer2');
			$table->text('answer3');
			$table->text('answer4');
			$table->text('answer5');
			
			$table->text('most_used_answer');
			$table->text('difficulty_before');
			$table->text('difficulty_after');

			$table->timestamps();
		});
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
