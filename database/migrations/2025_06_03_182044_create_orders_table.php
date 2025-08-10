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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('customer_id')->constrained('customers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('warehouse_id')->constrained('warehouses')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('user_id')->nullable()->constrained('users')->onDelete('cascade')->onUpdate('cascade');
			$table->foreignUuid('tax_id')->nullable()->constrained('taxes')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('cancelled_by')->nullable()->constrained('users')->onDelete('set null')->onUpdate('cascade');
            $table->foreignUuid('from_warehouse_id')->nullable()->constrained('warehouses')->onDelete('cascade')->onUpdate('cascade');
            $table->date('order_date');
            $table->dateTime('expire_date')->nullable();
            $table->enum('order_status', ['received', 'completed', 'confirmed', 'ordered', 'processing', 'shipping', 'pending'])->default('ordered');
			$table->string('invoice_number', 20);
			$table->enum('invoice_type', ['regular', 'proforma', 'pos'])->default('pos');
			$table->enum('order_type', ['purchases', 'purchase-returns', 'sales', 'sales-returns', 'quotations'])->default('sales');
			$table->float('tax_rate', 8, 2)->nullable()->default(0);
			$table->double('tax_amount')->default(0);
			$table->double('discount')->nullable()->default(0);
			$table->double('shipping')->nullable()->default(0);
			$table->double('subtotal')->default(0);
			$table->double('total')->default(0);
			$table->double('paid_amount')->default(0);
			$table->double('due_amount')->default(0);
			$table->text('notes')->nullable();
			$table->string('document')->nullable();
			$table->enum('payment_status', ['paid', 'unpaid', 'partially_paid'])->default('unpaid');
			$table->float('total_items', 8, 2)->default(0);
			$table->float('total_quantity', 8, 2)->default(0);
			$table->text('terms_condition')->nullable();
			$table->boolean('is_deletable')->default(true);
			$table->boolean('cancelled')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
