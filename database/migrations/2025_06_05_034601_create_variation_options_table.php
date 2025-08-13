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
        Schema::create('variation_options', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('variation_type_id')->constrained('variation_types')->cascadeOnDelete();
            $table->string('value'); // e.g., "Red", "Large"
            $table->string('color_code')->nullable(); // For color variations
            $table->string('image')->nullable(); // For image variations
            $table->timestamps();
            
            $table->index('variation_type_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variation_options');
    }
};
