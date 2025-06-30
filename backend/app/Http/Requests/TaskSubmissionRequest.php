<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskSubmissionRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf',
            'link' => 'nullable|url',
            'status' => 'nullable|string|in:Submitted,Pending,Delayed',
            'submitted_at' => 'nullable|date',
        ];
    }

    public function messages(): array
    {
        return [
            'description.string' => 'Description must be a string.',
            'file.mimes' => 'File must be a PDF document.',
            'file.file' => 'File must be a valid file.',
            'link.url' => 'Link must be a valid URL.',
            'status.in' => 'Status must be one of: Submitted, Pending, or Delayed.',
            'status.string' => 'Status must be a string.',
            'submitted_at.date' => 'Submitted at must be a valid date.',
        ];
    }
}
