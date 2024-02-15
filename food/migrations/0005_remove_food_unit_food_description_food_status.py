# Generated by Django 5.0.1 on 2024-02-09 01:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0004_translation_myanmar'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='food',
            name='unit',
        ),
        migrations.AddField(
            model_name='food',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='food',
            name='status',
            field=models.CharField(blank=True, choices=[('available', 'Available'), ('out of stock', 'Out of stock')], default='available', max_length=255),
        ),
    ]