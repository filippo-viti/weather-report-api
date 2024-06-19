from datetime import datetime

import factory
from factory.django import DjangoModelFactory
from .models import Location, WeatherForecast
from django.utils import timezone
import random


class LocationFactory(DjangoModelFactory):
    class Meta:
        model = Location

    name = factory.Faker('city')
    latitude = factory.Faker('latitude')
    longitude = factory.Faker('longitude')


class WeatherForecastFactory(DjangoModelFactory):
    class Meta:
        model = WeatherForecast

    location = factory.Iterator(Location.objects.all())
    date = factory.Faker('date_between_dates', date_start=datetime(2024, 6, 3), date_end=datetime(2024, 6, 9))
    time = factory.Faker('time', pattern='%H:%M:%S')
    temperature = factory.LazyFunction(lambda: round(random.uniform(-10, 40), 1))
    description = factory.Faker('random_element', elements=['Sunny', 'Partly Cloudy', 'Cloudy', 'Snowy', 'Rainy'])
