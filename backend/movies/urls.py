from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.MovieViewSet.as_view()),
    path('search/<str:title>', views.search_movie, name='search-movie'),
    path('<int:tmdb>', views.get_movie, name='get-movies'),
    path('upcoming/', views.get_upcoming, name='get-movies-upcoming'),
    path('now-playing/', views.get_now_playing, name='get-movies-now-playing'),
    path('<int:tmdb>/credits', views.get_credits, name='get-mvoies-credits'),
]
