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
        Schema::create('stock_histories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('warehouse_id')->constrained('warehouses')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('product_id')->constrained('products')->onDelete('cascade')->onUpdate('cascade');
            $table->float('quantity', 8, 2);
            $table->float('old_quantity', 8, 2)->default(0);
            $table->enum('order_type', ['sales', 'purchase'])->nullable()->default('sales');
            $table->enum('stock_type', ['in', 'out'])->default('in');
            $table->enum('action_type', ['add', 'edit', 'delete'])->default('add');
            $table->foreignUuid('created_by')->nullable()->constrained('users')->onDelete('set null')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_histories');
    }
};
