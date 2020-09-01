from django.db import models
from movies.models import Movie

# List
class List(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(null=True)
    movies = models.ManyToManyField(Movie, related_name='movies')
    user  = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
    private = models.BooleanField(default=False)
    official = models.BooleanField(default=False)

    def __str__(self):
        return '{} - {} - {}'.format(self.id, self.name, self.user)