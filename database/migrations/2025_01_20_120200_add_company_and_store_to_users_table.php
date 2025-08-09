<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('company_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('current_store_id')->nullable()->constrained('stores')->onDelete('set null');
            $table->json('store_permissions')->nullable(); // Store-specific permissions cache
            
            $table->index(['company_id', 'current_store_id']);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropForeign(['current_store_id']);
            $table->dropColumn(['company_id', 'current_store_id', 'store_permissions']);
        });
    }
};
