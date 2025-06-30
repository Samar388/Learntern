<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    // Pivot Table

    public function up(): void
    {
        Schema::create('module_mentors', function (Blueprint $table) {
            $table->id()->primary();
            $table->unsignedBigInteger('mentor_id');
            $table->unsignedBigInteger('module_id')->unique();

            $table->timestamps();

            $table->foreign('mentor_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('module__mentors');
    }
};
