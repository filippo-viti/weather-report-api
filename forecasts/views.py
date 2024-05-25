from rest_framework import generics

from .models import WeatherForecast, WeatherQuery, Location
from .serializers import WeatherForecastSerializer, WeatherQuerySerializer, LocationSerializer


class LocationView(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class WeatherForecastView(generics.ListAPIView):
    serializer_class = WeatherForecastSerializer

    def get_queryset(self):
        location_id = self.request.query_params.get('location_id')
        # forecast_date = self.request.query_params.get('date')
        # forecast_time = self.request.query_params.get('time')
        queryset = WeatherForecast.objects.filter(
            location_id=location_id,
        #   forecast_time__date=forecast_date,
        #   forecast_time__time=forecast_time
        )
        return queryset


class WeatherQueryView(generics.CreateAPIView):
    queryset = WeatherQuery.objects.all()
    serializer_class = WeatherQuerySerializer
