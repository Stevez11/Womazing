# Generated by Django 4.2.1 on 2023-07-10 08:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Coupon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=8, unique=True)),
                ('usage_count', models.PositiveIntegerField(default=0)),
                ('is_available', models.BooleanField(default=True)),
                ('expiry_date', models.DateTimeField(blank=True, null=True)),
            ],
        ),
    ]
