<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('warehouses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('company_id')->constrained('companies')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->boolean('show_email_on_invoice')->default(false);
            $table->boolean('show_phone_on_invoice')->default(false);
            $table->boolean('show_mrp_on_invoice')->default(false);
            $table->boolean('show_discount_tax_on_invoice')->default(false);
            $table->string('address')->nullable();
            $table->text('terms_condition')->nullable();
            $table->text('bank_details')->nullable();
            $table->string('signature')->nullable();
            $table->foreignId('region_id')->nullable();
            $table->foreignId('district_id')->nullable();
            $table->foreignId('ward_id')->nullable();
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('warehouses');
    }
};
