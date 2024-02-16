from django.contrib import admin

from import_export.admin import ImportExportModelAdmin

from . import models


@admin.register(models.FoodOrder)
class FoodOrderAdmin(ImportExportModelAdmin):
    date_heirarchy = (
        'updated_at',
    )
    list_display = (
        'customer',
        'table',
        'order_time',
        'status',
        'created_at',
        'updated_at'
    )
    search_fields = (
        'created_at',
    )


@admin.register(models.OrderItem)
class OrderItemAdmin(ImportExportModelAdmin):
    date_heirarchy = (
        'updated_at',
    )
    list_display = (
        'order',
        'food',
        'quantity',
        'subtotal',
        'timestamp',
        'status',
        'created_at',
        'updated_at'
    )
    search_fields = (
        'created_at',
    )


@admin.register(models.Payment)
class PaymentAdmin(ImportExportModelAdmin):
    date_heirarchy = (
        'updated_at',
    )
    list_display = (
        'order',
        'timestamp',
        'amount',
        'is_paid',
        'created_at',
        'updated_at'
    )
    search_fields = (
        'created_at',
    )