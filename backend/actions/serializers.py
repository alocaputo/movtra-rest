from rest_framework import serializers
from movies.serializers import MovieSerializer
from .models import Diary
from django.contrib.auth import authenticate

class  ActionSerializer(serializers.Serializer):
    movie = serializers.IntegerField()
    user = serializers.IntegerField()
    action = serializers.CharField(max_length=16)
    value = serializers.BooleanField()

class DiarySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    movie = MovieSerializer(read_only=True)
    rating = serializers.DecimalField(max_digits=2, decimal_places=1)
    review = serializers.TimeField()
    favorite = serializers.BooleanField()
    date = serializers.DateField()

    class Meta:
        model = Diary
        fields = '__all__'