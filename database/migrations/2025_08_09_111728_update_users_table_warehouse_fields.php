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
        Schema::table('users', function (Blueprint $table) {
            // Add company_id and current_warehouse_id fields
            $table->foreignUuid('company_id')->nullable()->constrained('companies')->onDelete('set null')->onUpdate('cascade');
            $table->foreignUuid('current_warehouse_id')->nullable()->constrained('warehouses')->onDelete('set null')->onUpdate('cascade');
            $table->json('warehouse_permissions')->nullable();
            
            // Add indexes for performance
            $table->index('company_id');
            $table->index('current_warehouse_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop the added columns
            $table->dropForeign(['company_id']);
            $table->dropForeign(['current_warehouse_id']);
            $table->dropIndex(['company_id']);
            $table->dropIndex(['current_warehouse_id']);
            $table->dropColumn(['company_id', 'current_warehouse_id', 'warehouse_permissions']);
        });
    }
};
