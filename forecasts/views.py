from datetime import datetime

from django.db.models import Avg
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from .models import Location, WeatherForecast
from .serializers import LocationSerializer, WeatherForecastSerializer, AverageWeatherSerializer


class LocationListCreate(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class WeatherForecastListCreate(generics.ListCreateAPIView):
    queryset = WeatherForecast.objects.all()
    serializer_class = WeatherForecastSerializer


@api_view(['GET'])
def get_forecast(request):
    location_name = request.query_params.get('location')
    date = request.query_params.get('date')
    time = request.query_params.get('time')

    try:
        location = Location.objects.get(name=location_name)
        forecast = WeatherForecast.objects.get(location=location, date=date, time=time)
        serializer = WeatherForecastSerializer(forecast)
        return Response(serializer.data)
    except (Location.DoesNotExist, WeatherForecast.DoesNotExist):
        return Response({'error': 'Forecast not found'}, status=404)


class AverageWeatherView(APIView):
    def get(self, request, location, date):
        try:
            date_obj = datetime.strptime(date, '%Y-%m-%d').date()
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)

        forecasts = WeatherForecast.objects.filter(location=location, date=date_obj)

        if not forecasts.exists():
            return Response({'error': 'No data available for this date.'}, status=status.HTTP_404_NOT_FOUND)

        average_temperature = forecasts.aggregate(Avg('temperature'))['temperature__avg']
        average_weather = forecasts.values('description').annotate(count=Avg('temperature')).order_by('-count').first()[
            'description']

        data = {
            'date': date_obj,
            'average_temperature': average_temperature,
            'average_weather': average_weather
        }

        serializer = AverageWeatherSerializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)
