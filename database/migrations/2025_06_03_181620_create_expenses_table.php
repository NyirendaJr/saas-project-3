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
        Schema::create('expenses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('bill')->nullable();
			$table->foreignUuid('expense_category_id')->nullable()->constrained('expense_categories')->onDelete('set null')->onUpdate('cascade')->nullable();
			$table->foreignUuid('warehouse_id')->constrained('warehouses')->onDelete('cascade')->onUpdate('cascade');
			$table->float('amount', 8, 2);
			$table->foreignUuid('user_id')->nullable()->constrained('users')->onDelete('set null')->onUpdate('cascade');
			$table->string('notes', 1000)->nullable();
			$table->dateTime('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
