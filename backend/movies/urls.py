"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.MovieListCreate.as_view()),
    path('search/<str:title>', views.search_movie, name='search-movie'),
    path('<int:tmdb>', views.get_movie, name='get-movies'),
    path('upcoming/', views.get_upcoming, name='get-movies-upcoming'),
    path('now-playing/', views.get_now_playing, name='get-movies-now-playing'),
    path('<int:tmdb>/credits', views.get_credits, name='get-mvoies-credits'),
]
