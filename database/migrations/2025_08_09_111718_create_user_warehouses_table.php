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
        Schema::create('user_warehouses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('warehouse_id')->constrained('warehouses')->onDelete('cascade')->onUpdate('cascade');
            $table->json('permissions')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Add unique constraint to prevent duplicate user-warehouse assignments
            $table->unique(['user_id', 'warehouse_id']);
            
            // Add indexes for better performance
            $table->index(['user_id', 'is_active']);
            $table->index(['warehouse_id', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_warehouses');
    }
};
