# Generated by Django 5.0.1 on 2024-02-07 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0002_payment_is_paid'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='status',
            field=models.CharField(blank=True, choices=[('pending', 'Pending'), ('progress', 'In Progress'), ('completed', 'Completed')], default='pending', max_length=200),
        ),
    ]
