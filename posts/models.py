from multiprocessing import AuthenticationError
from datetime import datetime
from django.db import models
from django.utils import timezone
from django.urls import reverse

# Create your models here.


class Article(models.Model):
    headline = models.CharField(max_length=200)
    text = models.TextField()
    area = models.CharField(max_length=200, blank=True,)
    image = models.TextField(blank=True)
    publish_date = models.DateTimeField(default=datetime.now, blank=True)
    author = models.TextField(blank=True, default="Gokce Ozer")

    class Meta:
        ordering = ['headline']

    def get_absolute_url(self):
        return reverse("article_detail", kwargs={'pk': self.pk})

    def __str__(self):
        return self.headline


class Question(models.Model):
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    question = models.TextField()
    answer = models.TextField(blank=True)
    articles = models.ManyToManyField(Article, blank=True)

    def get_absolute_url(self):
        return reverse("post_detail", kwargs={'pk': self.pk})

    def __str__(self):
        return self.question
