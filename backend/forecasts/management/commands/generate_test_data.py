# forecasts/management/commands/generate_test_data.py

from django.core.management.base import BaseCommand

from forecasts.factories import LocationFactory, WeatherForecastFactory
from forecasts.models import WeatherForecast, Location, UserQuery


class Command(BaseCommand):
    help = 'Generate test data for Location and WeatherForecast models'

    def handle(self, *args, **kwargs):
        WeatherForecast.objects.all().delete()
        Location.objects.all().delete()
        UserQuery.objects.all().delete()

        for _ in range(3):
            location = LocationFactory()
            self.stdout.write(self.style.SUCCESS(f'Created Location: {location.name}'))

        # Generate 100 weather forecasts
        for _ in range(100):
            forecast = WeatherForecastFactory()
            self.stdout.write(self.style.SUCCESS(
                f'Created WeatherForecast: {forecast.location.name} on {forecast.date} at {forecast.time}'))

        self.stdout.write(self.style.SUCCESS('Successfully generated test data'))
