# Generated by Django 5.0.1 on 2024-02-07 06:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0002_food_food_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Translation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('japan', models.TextField()),
                ('english', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='food',
            name='japan_name',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='food',
            name='myanmar_name',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
