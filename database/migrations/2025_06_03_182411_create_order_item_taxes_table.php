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
        Schema::create('order_item_taxes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('tax_name');
            $table->string('tax_type', 20);
            $table->double('tax_amount');
            $table->float('tax_rate', 8, 2);
            $table->foreignUuid('order_id')->constrained('orders')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('order_item_id')->constrained('order_items')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignUuid('tax_id')->nullable()->constrained('taxes')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_item_taxes');
    }
};
