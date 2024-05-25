from rest_framework import serializers
from .models import Location, WeatherForecast, WeatherQuery


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class WeatherForecastSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherForecast
        fields = '__all__'


class WeatherQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherQuery
        fields = '__all__'
