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
        Schema::create('landings', function (Blueprint $table) {
            $table->id();
            $table->enum('category', ['stories', 'published',  'portraits', 'drone-shots', 'prints']);
            $table->enum('size', ['small', 'medium', 'large']);
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
        Schema::dropIfExists('landings');
    }
};
