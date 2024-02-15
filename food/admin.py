from django.contrib import admin

from import_export.admin import ImportExportModelAdmin

from . import models


@admin.register(models.Category)
class CategorymerAdmin(ImportExportModelAdmin):
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
    )


@admin.register(models.Food)
class FoodvationAdmin(ImportExportModelAdmin):
    date_heirarchy = (
        'updated_at',
    )
    list_display = (
        'restaurant',
        'category',
        'name',
        'japan_name',
        'myanmar_name',
        'status',
        'price',
        'description',
        'image',
        'food_id',
        'created_at',
        'updated_at'
    )
    search_fields = (
        'created_at',
    )


@admin.register(models.Translation)
class TranslationAdmin(ImportExportModelAdmin):
    date_heirarchy = (
        'updated_at',
    )
    list_display = (
        'english',
        'japan',
        'myanmar',
        'created_at',
        'updated_at'
    )
    search_fields = (
        'created_at',
    )