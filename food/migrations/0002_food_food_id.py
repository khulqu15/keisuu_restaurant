# Generated by Django 5.0.1 on 2024-02-07 04:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='food',
            name='food_id',
            field=models.CharField(blank=True, max_length=10),
        ),
    ]