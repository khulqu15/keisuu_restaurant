# Generated by Django 5.0.1 on 2024-02-07 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='is_paid',
            field=models.BooleanField(blank=True, default=False),
        ),
    ]