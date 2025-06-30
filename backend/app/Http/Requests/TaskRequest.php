<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'issued_date' => 'required|date',
            'deadline'    => 'required|date|after_or_equal:issued_date',

        ];
    }

    public function messages(): array
    {
        return [

            'title.required'       => 'The title is required.',
            'title.string'         => 'The title must be a string.',
            'title.max'            => 'The title may not be greater than 255 characters.',
            'description.string'   => 'The description must be a string.',
            'issued_date.required' => 'The issued date is required.',
            'issued_date.date'     => 'The issued date must be a valid date.',
            'deadline.required'    => 'The deadline is required.',
            'deadline.date'        => 'The deadline must be a valid date.',
            'deadline.after_or_equal' => 'The deadline must be after or equal to the issued date.',

        ];
    }
}
