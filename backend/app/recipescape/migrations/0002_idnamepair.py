# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2018-03-30 07:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipescape', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='idNamePair',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('t', models.TextField()),
                ('num', models.IntegerField()),
                ('title', models.TextField()),
            ],
        ),
    ]
