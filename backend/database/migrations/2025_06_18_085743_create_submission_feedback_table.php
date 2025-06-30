<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('submission_feedback', function (Blueprint $table) {
            $table->id()->primary();
            $table->unsignedBigInteger('task_submission_id');
            $table->unsignedBigInteger('mentor_id');
            $table->text('comment');
            $table->integer('score');
            $table->enum('status', ['Approved', 'Needs Revision']);
            $table->timestamps();

            $table->foreign('task_submission_id')->references('id')->on('task_submissions')->onDelete('cascade');
            $table->foreign('mentor_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submission_feedback');
    }
};
