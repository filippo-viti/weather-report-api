from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Location, WeatherForecast
from .serializers import LocationSerializer, WeatherForecastSerializer


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
