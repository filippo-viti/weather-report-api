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

    def __str__(self):
        return f'{self.date} {self.time} - {self.location.name}'
