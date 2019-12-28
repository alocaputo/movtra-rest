from django.db import models
from django.contrib.auth.models import AbstractUser
from movies.models import Movie

# Create your models here.

class CustomUser(AbstractUser):
    bio = models.CharField(max_length=255, null=True)
    watched = models.ManyToManyField(Movie, related_name='watched')
    watchlist = models.ManyToManyField(Movie, related_name='watchlist')
    favorites = models.ManyToManyField(Movie, related_name='favorites')
    
    def __str__(self):
        return self.username