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
			$table->string('email');

			$table->string('password');

			$table->string('first_name');
			$table->string('pre_last_name');
			$table->string('last_name');
			$table->string('club');

			$table->bigInteger('bonds_nr');
			$table->integer('licence_nr');

			$table->tinyInteger('has_finished');
			$table->string('remember_token');
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
