# Generated by Django 4.2.10 on 2024-02-15 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True, verbose_name='作成日'),
        ),
        migrations.AddField(
            model_name='customer',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True, verbose_name='更新日'),
        ),
        migrations.AddField(
            model_name='reservation',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True, verbose_name='作成日'),
        ),
        migrations.AddField(
            model_name='reservation',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True, verbose_name='更新日'),
        ),
        migrations.AddField(
            model_name='table',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True, verbose_name='作成日'),
        ),
        migrations.AddField(
            model_name='table',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True, verbose_name='更新日'),
        ),
    ]
