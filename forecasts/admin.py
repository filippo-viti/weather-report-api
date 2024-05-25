from django.contrib import admin

from forecasts.models import Location, WeatherForecast, WeatherQuery

admin.site.register(Location)
admin.site.register(WeatherForecast)
admin.site.register(WeatherQuery)
