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
        Schema::create('order_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('order_id')->constrained('orders')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamp('expire_date')->nullable();
            $table->foreignUuid('product_id')->constrained('products')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('unit_id')->nullable()->constrained('units')->onDelete('set null')->onUpdate('cascade');
            $table->float('quantity', 8, 2);
            $table->double('mrp')->nullable()->default(0);
			$table->double('unit_price');
			$table->double('single_unit_price');
			$table->foreignUuid('tax_id')->nullable()->constrained('taxes')->onDelete('set null')->onUpdate('cascade');
			$table->float('tax_rate', 8, 2)->default(0);
			$table->enum('tax_type', ['exclusive', 'inclusive'])->nullable()->default('exclusive');
			$table->float('discount_rate', 8, 2)->nullable();
			$table->double('total_tax')->nullable();
			$table->double('total_discount')->nullable();
			$table->double('subtotal');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
