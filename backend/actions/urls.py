from django.urls import path, include
from knox import views as knox_views
from . import views

urlpatterns = [
    path('', views.Actions.as_view()),
    path('seen', views.Seen.as_view()),
    path('favorite', views.Favorite.as_view()),
    path('watchlist', views.Watchlist.as_view()),
    path('diary', views.DiaryView.as_view()),
]
