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
        Schema::create('warehouse_histories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->date('date');
			$table->foreignUuid('warehouse_id')->nullable()->constrained('warehouses')->onDelete('cascade')->onUpdate('cascade');
			$table->foreignUuid('user_id')->nullable()->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('customer_id')->nullable()->constrained('customers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('supplier_id')->nullable()->constrained('suppliers')->onDelete('set null')->onUpdate('cascade');
			$table->foreignUuid('order_id')->nullable()->constrained('orders')->onDelete('cascade')->onUpdate('cascade');
			$table->foreignUuid('order_item_id')->nullable()->constrained('order_items')->onDelete('cascade')->onUpdate('cascade');
			$table->foreignUuid('product_id')->nullable()->constrained('products')->onDelete('cascade')->onUpdate('cascade');
			$table->foreignUuid('payment_id')->nullable()->constrained('payments')->onDelete('cascade')->onUpdate('cascade');
			$table->foreignUuid('expense_id')->nullable()->constrained('expenses')->onDelete('cascade')->onUpdate('cascade');
			$table->double('amount')->default(0);
			$table->float('quantity', 8, 2)->default(0);
			$table->enum('status', ['paid', 'unpaid', 'partially_paid'])->nullable()->default(null);
			$table->enum('type', ['purchases', 'payment-out', 'payment-orders', 'purchase-returns', 'payment-in', 'sales', 'order-items', 'sales-returns', 'quotations'])->nullable();
			$table->string('transaction_number')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warehouse_histories');
    }
};
