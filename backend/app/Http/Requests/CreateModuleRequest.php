<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateModuleRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'isDiscussion' => 'required|boolean',
            "mentor_email" => 'required|email|max:255'
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The title field is required.',
            'title.string' => 'The title must be a string.',
            'title.max' => 'The title may not be greater than 255 characters.',
            'mentor_email.required' => 'Email is required.',
            'mentor_email.email' => 'Please provide a valid email address.',
            'mentor_email.max' => 'Email may not be greater than 255 characters.',
            'isDiscussion.required' => 'The isDiscussion field is required.',
            'isDiscussion.boolean' => 'The isDiscussion field must be true or false.',

        ];
    }
}
