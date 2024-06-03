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
