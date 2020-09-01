from django.db import models
from django.contrib.auth.models import AbstractUser
from movies.models import Movie
from actions.models import Diary

# Create your models here.

class CustomUser(AbstractUser):
    bio = models.CharField(max_length=255, null=True)
    watched = models.ManyToManyField(Movie, related_name='watched')
    watchlist = models.ManyToManyField(Movie, related_name='watchlist')
    favorites = models.ManyToManyField(Movie, related_name='favorites')
    recent = models.ManyToManyField(Diary, related_name='recent')
    
    def __str__(self):
        return self.username