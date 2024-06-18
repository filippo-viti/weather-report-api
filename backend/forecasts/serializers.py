from rest_framework import serializers
from .models import Location, WeatherForecast, UserQuery


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class WeatherForecastSerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = WeatherForecast
        fields = '__all__'


class UserQuerySerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    result = WeatherForecastSerializer()

    class Meta:
        model = UserQuery
        fields = ['id', 'user', 'submitted_at', 'status', 'result']


class UserQueryCreateSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)  # Include id field

    time = serializers.TimeField(required=False, allow_null=True)

    class Meta:
        model = UserQuery
        fields = ['id', 'location', 'date', 'time']  # Include 'id' in fields list

    def create(self, validated_data):
        user = self.context['request'].user
        return UserQuery.objects.create(user=user, **validated_data)
