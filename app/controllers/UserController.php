<?php

class UserController extends BaseController {
	
	protected $restfull = true;

	public function show_login(){
		if (Auth::user())
			return Redirect::route('start_game');
		
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
			
			return Redirect::route('user_login')->withErrors($validator);
			
		}else {
			
			$credentials = array(
				'email' => $input['email'],
				'password' => $input['password']
			);
			
			if (Auth::attempt($credentials))
				return Redirect::route('admin_profile');
			else 
				return Redirect::route('user_login')->withErrors($validator);
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
			'first_name' => 'required',
			'last_name' => 'required',
			'email' => 'required|unique:users|email',
			'password' => 'required',
			'role' => '1'
		);
		
		$validator = Validator::make($input, $rules);
		
		if($validator->passes()){
			
			$password = $input['password'];
			$password = Hash::make($password);
			
			$user = new User();
			$user->first_name = $input['first_name'];
			$user->last_name = $input['last_name'];
			$user->email = $input['email'];
			$user->password = $password;
			$user->save();
			
			return Redirect::route('user_login');
		}else {
			return Redirect::route('user_register')->withInput()->withErrors($validator);
		}
	}
	
	public function user_logout(){
		Auth::logout();
		return Redirect::back();
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