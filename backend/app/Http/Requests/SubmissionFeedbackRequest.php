<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmissionFeedbackRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'comment' => 'nullable|string',
            'score'   => 'required|numeric|min:0',
            'status'  => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'score.required' => 'The score field is required.',
            'score.numeric'  => 'The score must be a number.',
            'score.min'      => 'The score must be at least 0.',
            'status.required' => 'The status field is required.',
            'status.string'  => 'The status must be a string.',
            'comment.string' => 'The comment must be a string.',
        ];
    }
}
