<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function($table) {
			$table->bigIncrements('id');
			$table->bigInteger('bonds_nr');
			$table->integer('score');
			
			$table->string('serial_code');
			$table->integer('email');
			$table->string('password');
			
			$table->string('first_name');
			$table->string('pre_last_name');
			$table->string('last_name');
			$table->string('club');
			$table->integer('licence_nr');
			
			$table->tinyInteger('has_played');
			$table->tinyInteger('has_finished');
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
		Schema::drop('users');
	}

}
