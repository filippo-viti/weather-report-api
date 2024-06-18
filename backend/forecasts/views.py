from collections import Counter

from django.db.models import Avg
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Location, WeatherForecast, UserQuery
from .serializers import LocationSerializer, WeatherForecastSerializer, UserQuerySerializer, \
    UserQueryCreateSerializer


class LocationList(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class LocationDetail(generics.RetrieveAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class WeatherForecastList(generics.ListAPIView):
    queryset = WeatherForecast.objects.all()
    serializer_class = WeatherForecastSerializer


class UserQueryCreateView(generics.CreateAPIView):
    queryset = UserQuery.objects.all()
    serializer_class = UserQueryCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user_query = serializer.save()
        if not user_query.time:
            self.compute_average_weather(user_query)
        else:
            user_query.status = 'Processing'
            user_query.save()

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data = {
            'queryId': response.data['id'],
            'status': 'processing'
        }
        return response

    def compute_average_weather(self, user_query):
        forecasts = WeatherForecast.objects.filter(
            location=user_query.location,
            date=user_query.date
        )

        average_weather = forecasts.aggregate(
            average_temperature=Avg('temperature')
        )

        if forecasts.exists():
            descriptions = [forecast.description for forecast in forecasts]
            most_common_description = Counter(descriptions).most_common(1)[0][0]

            avg_forecast = WeatherForecast.objects.create(
                location=user_query.location,
                date=user_query.date,
                time=None,
                temperature=average_weather['average_temperature'],
                description=most_common_description
            )
            user_query.result = avg_forecast
            user_query.status = 'Completed'
            user_query.save()
        else:
            user_query.status = 'Failed'
            user_query.save()


class UserQueryDetailView(generics.RetrieveAPIView):
    queryset = UserQuery.objects.all()
    serializer_class = UserQuerySerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)