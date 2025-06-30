<?php

namespace App\Http\Controllers\Services;

use App\Models\Discussion;
use App\Models\Module;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;

class ModuleService
{
    public function createModule(array $data, User $mentor): Module | null
    {
        try {
            $module = Module::create([
                'title' => $data['title'],
                'isDiscussion' => $data['isDiscussion'],
                'created_by' => Auth::id(),
            ]);

            if ($data['isDiscussion']) {
                $discussion = Discussion::create([
                    'module_id' => $module->id
                ]);
                $module->update(['discussion_id' => $discussion->id]);
            }

            if ($mentor) {
                $module->mentors()->attach($mentor->id);
            }

            return $module;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function updateModule(Module $module, array $data): Module | null
    {
        try {
            $module->update([
                'title' => $data['title']
            ]);

            return $module;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function deleteModule(Module $module): bool
    {
        try {
            $module->delete();
            return true;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function getAllModules()
    {
        try {
            return Module::with(['mentors'])
                ->withCount(['mentors', 'interns'])
                ->get();
        } catch (Exception $e) {
            throw $e;
        }
    }
}
