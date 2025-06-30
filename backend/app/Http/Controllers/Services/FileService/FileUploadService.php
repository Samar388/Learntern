<?php

namespace App\Http\Controllers\Services\FileService;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

// Service class to handle file upload in S3.

class FileUploadService
{
    public function uploadToS3(UploadedFile $file, string $directory, string $visibility = 'public'): ?string
    {
        try {
            $path = $file->store($directory, 's3');
            Storage::disk('s3')->setVisibility($path, $visibility);

            return Storage::disk('s3')->url($path);
        } catch (\Exception $e) {
            return null;
        }
    }
}
