# Generated by Django 5.0.1 on 2024-02-14 06:41

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0003_restaurant_code_restaurant_created_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurant',
            name='created_at',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='updated_at',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
    ]
