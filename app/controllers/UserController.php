<?php

class UserController extends BaseController {

	protected $restfull = true;

	public function show_login(){
		if (Auth::user())
			return Redirect::route('game_start');

		$view = View::make('private.user.login');
		$view->title = 'Login';

		return $view;
	}

	public function post_login(){
		$input = Input::all();
		$rules = array(
			'email' => 'required',
			'password' => 'required'
		);

		$validator = Validator::make($input, $rules);

		if($validator->fails()) {

			return Redirect::route('homepage')->withErrors($validator);

		}else {

			$credentials = array(
				'email' => $input['email'],
				'password' => $input['password']
			);

			if (Auth::attempt($credentials))
				return Redirect::route('game_start');
			else
				return Redirect::route('homepage')->withErrors($validator);
		}
	}

	public function show_register(){
		$view = View::make('public.user.register');
		$view->title = 'Registreren';

		return $view;
	}

	public function admin_new_user(){
		$view = View::make('private.user.register');
		$view->title = 'Registreren';

		return $view;
	}

	public function post_register(){
		$input = Input::all();
		$rules = array(
			'bonds_nr' => 'required',
			'serial_code' => 'required',
			'email' => 'required|unique:users|email',
			'password' => 'required|confirmed'
		);

		$validator = Validator::make($input, $rules);

		if($validator->fails()) {
			return Redirect::route('homepage')->withInput()->withErrors($validator);
		}

		if($validator->passes()){
			$bonds_nr = $input['bonds_nr'];
			$invited_user = InvitedUser::whereBonds_nr($bonds_nr)->first();
			if ($invited_user){
				if ($invited_user->serial_code == $input['serial_code']) {
					$password = $input['password'];
					$password = Hash::make($password);

					$user = new User();
					$user->email = $input['email'];
					$user->password = $password;
					$user->first_name = $invited_user->first_name;
					$user->pre_last_name = $invited_user->pre_last_name;
					$user->last_name = $invited_user->last_name;
					$user->last_name = $invited_user->last_name;
					$user->club = $invited_user->club;
					$user->licence_nr = $invited_user->licence_nr;
					$user->save();

					Auth::login($user);

					$submission = new Submission();
					$submission->user_id = $user->id;
					$submission->score = 0;
					$submission->save();

					return Redirect::route('game_start');
				}else{
					return Redirect::route('homepage')->withInput();
				}
			}else {
				return Redirect::route('homepage')->withInput();
			}

		}
	}

	public function user_logout(){
		Auth::logout();
		return Redirect::route('homepage');
	}

	public function admin_edit_user(){
		$view = View::make('private.user.edit');
		$view->title = 'Instellingen';

		return $view;
	}

	public function update_user(){
		$input = Input::all();
		$password = $input['password'];
		$rules = array(
			'first_name' => 'required',
			'last_name' => 'required',
			'role' => '1'
		);

		if ($input['email'] != Auth::user()->email)
			$rules['email'] = 'required|unique:users|email';

		$validator = Validator::make($input, $rules);

		if($validator->passes()){

			$user = User::find(Auth::user()->id);
			$user->first_name = $input['first_name'];
			$user->last_name = $input['last_name'];
			$user->email = $input['email'];

			if ($password && Hash::make($password) != $user->password)
				$user->password = Hash::make($password);
			$user->save();

			return Redirect::route('user_settings');
		}else {
			return Redirect::route('user_settings')->withInput()->withErrors($validator);
		}
	}

	public function remove_user() {
		User::find(Input::get('id'))->delete();
		return Redirect::back();
	}

}