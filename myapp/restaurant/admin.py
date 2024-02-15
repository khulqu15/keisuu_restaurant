from django.contrib import admin

from import_export.admin import ImportExportModelAdmin

from . import models


@admin.register(models.Restaurant)
class RestaurantAdmin(ImportExportModelAdmin):
    date_heirarchy = (
        'updated_at',
    )
    list_display = (
        'name',
        'address',
        'code',
        'created_at',
        'updated_at'
    )
    search_fields = (
        'created_at',
    )


@admin.register(models.RestaurantStaff)
class RestaurantStaffAdmin(ImportExportModelAdmin):
    date_heirarchy = (
        'updated_at',
    )
    list_display = (
        'restaurant',
        'name',
        'phone',
        'password',
        'address',
        'created_at',
        'updated_at'
    )
    search_fields = (
        'created_at',
    )


@admin.register(models.KitchenStaff)
class KitchenStaffAdmin(ImportExportModelAdmin):
    date_heirarchy = (
        'updated_at',
    )
    list_display = (
        'restaurant',
        'name',
        'phone',
        'password',
        'address',
        'created_at',
        'updated_at'
    )
    search_fields = (
        'created_at',
    )