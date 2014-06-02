<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubmissionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('submissions', function($table) {
			$table->bigIncrements('id');
			$table->bigInteger('user_id');
			
			$table->integer('question1');
			$table->integer('question2');
			$table->integer('question3');
			$table->integer('question4');
			$table->integer('question5');
			$table->integer('question6');
			$table->integer('question7');
			$table->integer('question8');
			$table->integer('question9');
			$table->integer('question10');
			
			$table->integer('score');

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
		Schema::drop('submissions');
	}

}
