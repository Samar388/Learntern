<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // Pivot table

    public function up(): void
    {
        Schema::create('module_interns', function (Blueprint $table) {
            $table->id()->primary();
            $table->unsignedBigInteger('module_id');
            $table->unsignedBigInteger('intern_id');

            $table->timestamps();

            $table->foreign('intern_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('module__interns');
    }
};
