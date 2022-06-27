from rest_framework import serializers
from .models import Question, Article


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["articles"] = ArticleSerializer(
            instance.articles.all(), many=True).data
        return rep


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
