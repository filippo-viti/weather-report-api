# Generated by Django 5.0.6 on 2024-06-18 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forecasts', '0004_userquery'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weatherforecast',
            name='time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]