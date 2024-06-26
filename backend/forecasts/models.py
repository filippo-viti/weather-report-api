from django.contrib.auth import get_user_model
from django.db import models, IntegrityError

User = get_user_model()


class Location(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name


class WeatherForecast(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='forecasts')
    date = models.DateField()
    time = models.TimeField(null=True, blank=True)
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

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['location', 'date', 'time'], name='unique_location_date_time'),
            models.UniqueConstraint(fields=['location', 'date'], condition=models.Q(time__isnull=True),
                                    name='unique_location_date_no_time')
        ]

    def __str__(self):
        return f'{self.date} {self.time or ""} - {self.location.name}'


class UserQuery(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField(null=True, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Processing')
    result = models.ForeignKey(WeatherForecast, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'location', 'date', 'time'], name='unique_user_location_date_time'),
            models.UniqueConstraint(fields=['user', 'location', 'date'], condition=models.Q(time__isnull=True),
                                    name='unique_user_location_date_no_time')
        ]

    def __str__(self):
        return f'{self.user.username} - {self.location.name} - {self.date} {self.time or ""}'
