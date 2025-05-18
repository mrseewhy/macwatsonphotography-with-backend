<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prints', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('size');
            $table->string('range');
            $table->integer('amount');
            $table->enum('type', ['link', 'upload']);
            $table->string('link')->nullable();
            $table->string('file')->nullable();
            $table->string('path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prints');
    }
};
