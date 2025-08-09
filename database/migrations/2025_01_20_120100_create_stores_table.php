<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('code')->unique(); // Store identifier (e.g., WH001, ST001)
            $table->enum('type', ['warehouse', 'store', 'outlet', 'distribution_center'])
                  ->default('store');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->json('operating_hours')->nullable();
            $table->json('settings')->nullable(); // Store-specific settings
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['company_id', 'is_active']);
            $table->index(['code', 'company_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
