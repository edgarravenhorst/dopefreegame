<?php

class UserController extends BaseController {

	protected $restfull = true;

	function init_user(){
		$input = Input::all();
		$rules = array(
			'email' => 'email|required',
			'password' => 'required'
		);

		$validator = Validator::make($input, $rules);

		$credentials = array(
			'email' => $input['email'],
			'password' => $input['password']
		);

		if($validator->fails()) {
			return Redirect::route('homepage')->withErrors($validator);
		}else {

			$activationcode = $input['activationcode'];
			var_dump($activationcode);
			if ($activationcode){

				if (User::Exists($activationcode)) {

					if (Auth::attempt($credentials)) Redirect::route('terms');
					else Redirect::route('homepage')->with($input['activationcode'])->withErrors($validator);

				}else {

					$invited_user = InvitedUser::whereBonds_nr($activationcode)->first();
					if ($invited_user && $invited_user->licence_nr == $input['password']) {
						$password = $invited_user->licence_nr;
						$password = Hash::make($password);

						$user = new User();
						$user->email = $input['email'];
						$user->password = $password;
						$user->first_name = $invited_user->first_name;
						$user->pre_last_name = $invited_user->pre_last_name;
						$user->last_name = $invited_user->last_name;
						$user->last_name = $invited_user->last_name;
						$user->club = $invited_user->club;
						$user->bonds_nr = $invited_user->bonds_nr;
						$user->licence_nr = $invited_user->licence_nr;
						$user->save();

						Auth::login($user);

						$submission = new Submission();
						$submission->user_id = $user->id;
						$submission->score = 0;
						$submission->save();

						return Redirect::route('terms');
					}else var_dump('register failed');
				}
			}else {

				if (Auth::attempt($credentials))return  Redirect::route('terms');
				else return Redirect::route('homepage')->with($input['activationcode'])->withErrors($validator);

			}
		}
	}

	public function user_logout(){
		Auth::logout();
		return Redirect::route('ajax');
	}

}
