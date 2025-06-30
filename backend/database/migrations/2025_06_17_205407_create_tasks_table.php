<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id()->primary();
            $table->unsignedBigInteger('module_id');
            $table->string('title');
            $table->text('description');
            $table->dateTime('issued_date')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->dateTime('deadline');
            $table->unsignedBigInteger('created_by');
            $table->timestamps();

            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
