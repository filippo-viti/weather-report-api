from django.urls import path
from .views import LocationList, WeatherForecastList, AverageWeatherView, UserQueryListCreate, LocationDetail, \
    UserQueryDetail

urlpatterns = [
    path('locations/', LocationList.as_view(), name='location-list'),
    path('locations/<int:id>/', LocationDetail.as_view(), name='location-detail'),
    path('forecasts/', WeatherForecastList.as_view(), name='forecast-list'),
    path('queries/', UserQueryListCreate.as_view(), name='user-query-list-create'),
    path('queries/<int:id>/', UserQueryDetail.as_view(), name='user-query-detail'),
    path('average-weather/<str:location>/<str:date>/', AverageWeatherView.as_view(), name='average-weather'),
]
