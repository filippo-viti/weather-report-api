from datetime import datetime

from django.db.models import Avg
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Location, WeatherForecast, UserQuery
from .serializers import LocationSerializer, WeatherForecastSerializer, AverageWeatherSerializer, UserQuerySerializer


class LocationList(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class LocationDetail(generics.RetrieveAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class WeatherForecastList(generics.ListAPIView):
    queryset = WeatherForecast.objects.all()
    serializer_class = WeatherForecastSerializer


class UserQueryListCreate(generics.ListCreateAPIView):
    queryset = UserQuery.objects.all()
    serializer_class = UserQuerySerializer


class UserQueryDetail(generics.RetrieveAPIView):
    queryset = UserQuery.objects.all()
    serializer_class = UserQuerySerializer


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
