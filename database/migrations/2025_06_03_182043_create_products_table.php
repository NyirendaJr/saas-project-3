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
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 1000);
			$table->string('slug', 1000)->nullable();
			$table->string('barcode_symbology', 10);
			$table->string('item_code');
            $table->string('part_number')->nullable();
            $table->string('sku')->nullable();
			$table->string('image')->nullable();
            $table->text('description')->nullable();
			$table->foreignUuid('category_id')->nullable()->constrained('categories')->onDelete('set null')->onUpdate('cascade');
			$table->foreignUuid('brand_id')->nullable()->constrained('brands')->onDelete('set null')->onUpdate('cascade');
			$table->foreignUuid('unit_id')->nullable()->constrained('units')->onDelete('set null')->onUpdate('cascade');
			$table->foreignUuid('user_id')->nullable()->constrained('users')->onDelete('set null')->onUpdate('cascade');
			$table->foreignUuid('warehouse_id')->nullable()->constrained('warehouses')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('tax_id')->nullable()->constrained('taxes')->onDelete('set null')->onUpdate('cascade');
			$table->float('current_stock', 8, 2)->default(0);
			$table->double('mrp')->nullable()->default(0);
			$table->double('purchase_price')->default(0);
			$table->double('sales_price')->default(0);
			$table->enum('purchase_tax_type', ['exclusive', 'inclusive'])->nullable()->default('exclusive');
			$table->enum('sales_tax_type', ['exclusive', 'inclusive'])->nullable()->default('exclusive');
			$table->integer('stock_quantitiy_alert')->nullable();
			$table->integer('opening_stock')->nullable();
			$table->date('opening_stock_date')->nullable();
			$table->double('wholesale_price')->nullable()->default(0);
			$table->integer('wholesale_quantity')->nullable();
			$table->enum('status', ['in_stock', 'out_of_stock'])->default('in_stock');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
