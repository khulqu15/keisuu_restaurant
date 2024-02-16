from django.contrib import admin

from import_export.admin import ImportExportModelAdmin

from . import models


@admin.register(models.Customer)
class CustomerAdmin(ImportExportModelAdmin):
    date_heirarchy = (
        'updated_at',
    )
    list_display = (
        'restaurant',
        'name',
        'created_at',
        'updated_at'
    )
    search_fields = (
        'created_at',
        'name',
    )


@admin.register(models.Reservation)
class ReservationAdmin(ImportExportModelAdmin):
    date_heirarchy = (
        'updated_at',
    )
    list_display = (
        'restaurant',
        'customer',
        'date',
        'time',
        'number',
        'created_at',
        'updated_at'
    )
    search_fields = (
        'created_at',
    )


@admin.register(models.Table)
class TableAdmin(ImportExportModelAdmin):
    date_heirarchy = (
        'updated_at',
    )
    list_display = (
        'restaurant',
        'number',
        'is_reserved',
        'created_at',
        'updated_at'
    )
    search_fields = (
        'created_at',
    )