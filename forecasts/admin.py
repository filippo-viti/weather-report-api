from django.contrib import admin

from forecasts.models import Location, WeatherForecast

admin.site.register(Location)
admin.site.register(WeatherForecast)
