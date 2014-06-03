<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSomeInvitedUsers extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		
		DB::table('invited_users')->insert(array(
			'email' => '',
			'bonds_nr' => '111',
			'serial_code' => 'AA0000',
			
			'first_name' => 'Edgar',
			'pre_last_name' => '',
			'last_name' => 'Ravenhorst',
			'club' => 'Edge-Art',
			'licence_nr' => '1',
			
			'created_at' => date('Y-m-d H:m:s'),
			'updated_at' => date('Y-m-d H:m:s')
		));
		
		DB::table('invited_users')->insert(array(
			'email' => '',
			'bonds_nr' => '222',
			'serial_code' => 'AA0001',
			
			'first_name' => 'Robbie',
			'pre_last_name' => '',
			'last_name' => 'Geen idee',
			'club' => 'GroepUtrecht',
			'licence_nr' => '1',
			
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
		DB::table('invited_users')->where('bonds_nr', '=', '111');
		DB::table('invited_users')->where('bonds_nr', '=', '222');
	}

}
