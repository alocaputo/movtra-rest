# Generated by Django 2.2.8 on 2020-01-03 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('actions', '0002_diary_favorite'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diary',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
