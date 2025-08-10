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
        Schema::create('product_variation_variation_option', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('product_variation_id')->constrained('product_variations')->cascadeOnDelete();
            $table->foreignUuid('variation_option_id')->constrained('variation_options')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variation_option');
    }
};
