from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Diary
class Diary(models.Model):
    id = models.AutoField(primary_key=True)
    movie  = models.ForeignKey('movies.Movie', on_delete=models.CASCADE)
    user  = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
    date = models.DateField()
    review = models.TextField(null=True)
    rating = models.DecimalField(null=2, max_digits=2, decimal_places=1, validators=[MinValueValidator(0), MaxValueValidator(5)])
    favorite = models.BooleanField(default=False)

    def __str__(self):
        return '{} - {} - {}'.format(self.date, self.movie, self.user)