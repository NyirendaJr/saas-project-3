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
        Schema::create('currencies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->unique()->nullable();
            $table->string('code', 3)->unique()->nullable();
            $table->string('symbol')->nullable();
            $table->foreignUuid('warehouse_id')->constrained('warehouses')->cascadeOnDelete()->cascadeOnUpdate();
            $table->boolean('is_default')->default(false);
            $table->boolean('is_deletable')->default(false);
            $table->string('position')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('currencies');
    }
};
