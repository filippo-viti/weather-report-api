from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    favorite_locations = models.ManyToManyField('forecasts.Location', related_name='favorite_of')
