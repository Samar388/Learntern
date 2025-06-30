<?php

namespace App\Http\Controllers\API\Discussion;

use App\Http\Controllers\BaseController;
use App\Models\Discussion;
use App\Models\DiscussionMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DiscussionMessageController extends BaseController
{

    public function store(Request $request, Discussion $discussion): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'message' => 'required|string|max:1000',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation failed.', $validator->errors(), 422);
            }

            $message = DiscussionMessage::create([
                'discussion_id' => $discussion->id,
                'user_id' => Auth::id(),
                'message' => $request->message,
            ]);

            $message->load('user');

            return $this->sendResponse($message, 'Message posted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to post message.', $e->getMessage(), 500);
        }
    }

    public function index(Discussion $discussion): JsonResponse
    {
        try {
            $messages = $discussion->messages()->with('user')->latest()->get();

            if ($messages->isEmpty()) {
                return $this->sendResponse([], 'No messages found for this discussion.');
            }

            return $this->sendResponse($messages, 'Messages fetched successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to fetch messages.', $e->getMessage(), 500);
        }
    }
}
