from django.urls import path
from .views import LocationListCreate, WeatherForecastListCreate, get_forecast

urlpatterns = [
    path('locations/', LocationListCreate.as_view(), name='location-list-create'),
    path('forecasts/', WeatherForecastListCreate.as_view(), name='forecast-list-create'),
    path('get_forecast/', get_forecast, name='get-forecast'),
]
