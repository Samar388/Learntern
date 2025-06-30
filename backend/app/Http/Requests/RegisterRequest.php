<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'phone_number' => 'required|string|max:20',
            'role' => 'required|string|in:Intern,Admin,Mentor',
            'password' => 'required|string|min:6',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.required' => 'Full name is required.',
            'full_name.string' => 'Full name must be a string.',
            'full_name.max' => 'Full name may not be greater than 255 characters.',

            'email.required' => 'Email is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.max' => 'Email may not be greater than 255 characters.',
            'email.unique' => 'This email is already registered.',

            'phone_number.required' => 'Phone number is required.',
            'phone_number.string' => 'Phone number must be a string.',
            'phone_number.max' => 'Phone number may not be greater than 20 characters.',

            'role.required' => 'Role is required.',
            'role.string' => 'Role must be a string.',
            'role.in' => 'Role must be one of: intern, admin, user.',

            'password.required' => 'Password is required.',
            'password.string' => 'Password must be a string.',
            'password.min' => 'Password must be at least 6 characters.',

            'avatar.image' => 'Avatar must be an image.',
            'avatar.mimes' => 'Avatar must be a file of type: jpeg, png, jpg, gif.',
            'avatar.max' => 'Avatar may not be greater than 2MB.',
        ];
    }
}
