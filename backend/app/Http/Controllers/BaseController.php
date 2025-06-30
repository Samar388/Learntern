<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

// A utility class to send uniform API response.

class BaseController extends Controller
{

    public function sendResponse(mixed $result, string $message, int $code = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ], $code);
    }

    public function sendError(string $error, $errorMessages = null, int $code = 404): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
}
