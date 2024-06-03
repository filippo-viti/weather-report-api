from django.db import models


class Location(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name


class WeatherForecast(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='forecasts')
    date = models.DateField()
    time = models.TimeField()
    temperature = models.FloatField()

    WEATHER_CHOICES = [
        ('Sunny', 'Sunny'),
        ('Partly Cloudy', 'Partly Cloudy'),
        ('Cloudy', 'Cloudy'),
        ('Rainy', 'Rainy'),
        ('Snowy', 'Snowy'),
        ('Stormy', 'Stormy'),
        ('Foggy', 'Foggy'),
        ('Windy', 'Windy'),
    ]
    description = models.CharField(max_length=20, choices=WEATHER_CHOICES)

    def __str__(self):
        return f'{self.date} {self.time} - {self.location.name}'
