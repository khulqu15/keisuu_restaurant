# Generated by Django 5.0.1 on 2024-02-19 01:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0006_alter_restaurant_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurantstaff',
            name='role',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
