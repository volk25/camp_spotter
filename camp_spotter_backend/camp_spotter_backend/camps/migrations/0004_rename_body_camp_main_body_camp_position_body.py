# Generated by Django 4.0.1 on 2022-02-04 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('camps', '0003_remove_review_slug'),
    ]

    operations = [
        migrations.RenameField(
            model_name='camp',
            old_name='body',
            new_name='main_body',
        ),
        migrations.AddField(
            model_name='camp',
            name='position_body',
            field=models.TextField(max_length=2000, null=True),
        ),
    ]
