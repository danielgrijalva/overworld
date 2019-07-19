# Generated by Django 2.2.3 on 2019-07-16 22:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('actions', '0004_journal_entry_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='journal',
            name='entry_type',
            field=models.CharField(choices=[('F', 'Finished'), ('S', 'Started'), ('P', 'Played'), ('A', 'Abandoned'), ('R', 'Replayed')], default='F', max_length=1),
        ),
    ]
