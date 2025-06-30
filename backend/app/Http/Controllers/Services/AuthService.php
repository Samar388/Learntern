<?php

namespace App\Http\Controllers\Services;

use App\Http\Controllers\Services\FileService\FileUploadService;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\UploadedFile;

// Service class to handle authentication.

class AuthService
{

    public function __construct(protected FileUploadService $uploader) {}

    public function register(array $data, ?UploadedFile $avatar = null): array
    {
        DB::beginTransaction();

        try {
            $fileUrl = $avatar ? $this->uploader->uploadToS3($avatar, 'avatars') : null;

            $user = User::create([
                'full_name'    => $data['full_name'],
                'email'        => $data['email'],
                'phone_number' => $data['phone_number'],
                'role'         => $data['role'],
                'password'     => bcrypt($data['password']),
                'avatar'       => $fileUrl,
            ]);

            try {
                event(new Registered($user));
            } catch (\Exception $e) {
                DB::rollBack();
                throw new \Exception("Failed to send verification mail", 500);
            }

            DB::commit();

            return [
                'user'  => $user,
                'token' => $user->createToken('auth_token')->accessToken,
            ];
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function login(string $email, string $password): array
    {
        try {
            $user = User::where('email', $email)->first();

            if (!$user) {
                throw new \Exception("No user exists with this email", 404);
            }

            if (!Auth::attempt(['email' => $email, 'password' => $password])) {
                throw new \Exception("Invalid credentials", 401);
            }

            return [
                'user'  => $user,
                'token' => $user->createToken('auth_token')->accessToken,
            ];
        } catch (\Throwable $e) {
            throw $e;
        }
    }

    public function logout(User $user): void
    {
        $user->token()->revoke();
    }
}
