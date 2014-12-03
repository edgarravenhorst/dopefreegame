<?php

class GameController extends BaseController {

	function reset_submission() {
		$user = Auth::user();
		$submission = Submission::find($user->id);
		$submission->question1 = 0;
		$submission->question2 = 0;
		$submission->question3 = 0;
		$submission->question4 = 0;
		$submission->question5 = 0;
		$submission->score = 0;
		$submission->save();
	}

	function submit_answer($questionID, $answerID){

		$data = new stdClass();

		$view = View::make('private.json');
		$view->title = 'Test';
		$view->bodyClass = 'testpage';

		//get data
		$user = $view->user = Auth::user();
		$submission = Submission::find($user->id);

		//set the answer if not set
		if ($submission['question' . $questionID] == 0 ){
			$question = Questions::where('questionID', $questionID)->first();
			$scoreToAdd = $question['answer' . $answerID . '_score'];

			$submission['question' . $questionID] = $answerID;
			$submission->score += $scoreToAdd;
			$submission->save();

			$data->success = true;
			$data->result = array(
				'answerscore' => $scoreToAdd,
				'totalscore' => $submission->score
			);
			$submission->save();
		}else{
			$data->success = false;
			$data->message = 'Answer already submitted';
		}

		echo json_encode($data);
		return $view;
	}

}
