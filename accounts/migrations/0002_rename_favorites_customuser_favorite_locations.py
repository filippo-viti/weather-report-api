# Generated by Django 5.0.6 on 2024-06-05 22:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='favorites',
            new_name='favorite_locations',
        ),
    ]