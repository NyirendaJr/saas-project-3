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
        Schema::create('units', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('warehouse_id')->constrained('warehouses')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name');
            $table->string('short_name');
            $table->string('base_unit')->nullable();
            $table->foreignUuid('parent_id')->nullable()->constrained('units')->onDelete('cascade')->onUpdate('cascade');
            $table->string('operator')->nullable();
            $table->string('operator_value')->nullable();
            $table->boolean('is_deletable')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('units');
    }
};
