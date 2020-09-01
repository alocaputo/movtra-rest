from django.db import models

# Create your models here.
class Movie(models.Model):
    tmdb_id = models.IntegerField(primary_key=True)
    adult = models.BooleanField(default=False)
    belongs_to_collection = models.IntegerField(null=True, blank=True)
    budget = models.IntegerField(null=True, blank=True)
    homepage = models.CharField(null=True, blank=True, max_length=100)
    imdb_id = models.CharField(null=True, blank=True, max_length=100)
    original_language = models.CharField(blank=True, null=True, max_length=100)
    original_title = models.CharField(blank=True, null=True, max_length=100)
    overview = models.TextField(null=True, blank=True)
    popularity = models.DecimalField(max_digits=10, null=True, decimal_places=6, blank=True)
    backdrop_path = models.CharField(null=True, blank=True, max_length=100)
    poster_path = models.CharField(null=True, blank=True, max_length=100)
    release_date = models.DateField(blank=True, null=True)
    revenue = models.IntegerField(null=True, blank=True)
    runtime = models.IntegerField(null=True, blank=True)
    status = models.CharField(blank=True, null=True, max_length=100)
    tagline = models.CharField(blank=True, null=True, max_length=100)
    title = models.CharField(max_length=100)
    video = models.BooleanField(default=False)
    vote_average = models.DecimalField(max_digits=3, null=True, decimal_places=1 , blank=True, default=0)
    vote_count = models.IntegerField(null=True, blank=True)
    last_updated = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return '%s - %s' % (self.tmdb_id, self.title)