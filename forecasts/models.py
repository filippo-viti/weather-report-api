from django.db import models


class Location(models.Model):
    name = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    country = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.city}, {self.state}, {self.country}"


class WeatherForecast(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    forecast_time = models.DateTimeField()
    temperature = models.DecimalField(max_digits=5, decimal_places=2)
    humidity = models.DecimalField(max_digits=5, decimal_places=2)
    wind_speed = models.DecimalField(max_digits=5, decimal_places=2)
    weather_condition = models.CharField(max_length=255)

    def __str__(self):
        return f"Forecast for {self.location} at {self.forecast_time}"


class WeatherQuery(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    query_time = models.DateTimeField(auto_now_add=True)
    requested_date = models.DateField()
    requested_time = models.TimeField()

    def __str__(self):
        return f"Query for {self.location} on {self.requested_date} at {self.requested_time}"
