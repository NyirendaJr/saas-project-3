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
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('customer_id')->constrained('customers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('supplier_id')->nullable()->constrained('suppliers')->onDelete('set null')->onUpdate('cascade');
            $table->foreignUuid('warehouse_id')->constrained('warehouses')->onDelete('cascade')->onUpdate('cascade');
			$table->enum('payment_type', ['in', 'out'])->default('out');
			$table->string('payment_number')->nullable();
			$table->dateTime('date');
			$table->double('amount')->default(0);
			$table->double('unused_amount')->default(0);
			$table->double('paid_amount')->default(0);
			$table->foreignUuid('payment_mode_id')->nullable()->constrained('payment_modes')->onDelete('set null')->onUpdate('cascade');
			$table->string('payment_receipt')->nullable();
			$table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
