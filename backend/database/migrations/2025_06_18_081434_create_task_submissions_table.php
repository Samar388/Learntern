<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('task_submissions', function (Blueprint $table) {
            $table->id()->primary();
            $table->unsignedBigInteger('task_id');
            $table->unsignedBigInteger('user_id');
            $table->text('description');
            $table->string('file_path')->nullable();
            $table->string('link')->nullable();
            $table->enum('status', ['Submitted', 'Pending', 'Delayed']);
            $table->dateTime('submitted_at');
            $table->timestamps();

            $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_submissions');
    }
};
