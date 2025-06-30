<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->id()->primary();
            $table->string('title');
            $table->boolean('isDiscussion')->default(false)->nullable();
            $table->string('resource')->nullable();
            $table->boolean('completed')->default(false);
            $table->unsignedBigInteger('created_by');
            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};
