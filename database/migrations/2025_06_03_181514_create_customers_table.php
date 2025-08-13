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
        Schema::create('customers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('warehouse_id')->nullable()->constrained('warehouses')->onUpdate('cascade')->onDelete('cascade');
            $table->boolean('login_enabled')->default(false);
            $table->string('name');
            $table->string('email');
            $table->string('password')->nullable();
            $table->string('phone')->nullable();
            $table->string('profile_image')->nullable();
            $table->string('address', 1000)->nullable();
            $table->string('shipping_address', 1000)->nullable();
            $table->enum('status', ['enabled', 'disabled'])->default('enabled');
            $table->double('opening_balance')->default(0);
            $table->enum('opening_balance_type', ['receive', 'pay'])->default('receive');
            $table->integer('credit_period')->default(0);
            $table->double('credit_limit')->default(0);
            $table->integer('purchase_order_count')->default(0);
            $table->integer('purchase_return_count')->default(0);
            $table->integer('sales_order_count')->default(0);
            $table->integer('sales_return_count')->default(0);
            $table->double('total_amount')->default(0);
            $table->double('paid_amount')->default(0);
            $table->double('due_amount')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
