<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvitedUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('invited_users', function($table) {
			$table->bigIncrements('id');
			$table->string('email');
			
			$table->bigInteger('bonds_nr');
			$table->string('serial_code');
			
			$table->string('first_name');
			$table->string('pre_last_name');
			$table->string('last_name');
			$table->string('club');
			$table->integer('licence_nr');
            $table->integer('agreed_to_terms');
			
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
		Schema::drop('invited_users');
	}

}
