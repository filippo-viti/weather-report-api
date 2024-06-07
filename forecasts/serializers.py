from rest_framework import serializers
from .models import Location, WeatherForecast


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class WeatherForecastSerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = WeatherForecast
        fields = '__all__'


class AverageWeatherSerializer(serializers.Serializer):
    location = LocationSerializer()
    date = serializers.DateField()
    average_temperature = serializers.FloatField()
    average_weather = serializers.CharField()
