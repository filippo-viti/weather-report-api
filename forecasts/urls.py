from django.urls import path
from .views import LocationView, WeatherForecastView, WeatherQueryView

urlpatterns = [
    path('location/', LocationView.as_view(), name='location'),
    path('forecast/', WeatherForecastView.as_view(), name='weather-forecast'),
    path('query/', WeatherQueryView.as_view(), name='weather-query'),
]

