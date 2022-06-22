from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Question, Article
from .serializers import QuestionSerializer, ArticleSerializer


@api_view(['GET', 'POST'])
def questions_list(request):
    if request.method == 'GET':
        data = Question.objects.all()

        serializer = QuestionSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def questions_detail(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        data = Question.objects.filter(pk=pk)

        serializer = QuestionSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = QuestionSerializer(
            question, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def articles_list(request):
    if request.method == 'GET':
        data = Article.objects.all()

        serializer = ArticleSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def articles_detail(request, pk):
    try:
        article = Article.objects.get(pk=pk)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        data = Article.objects.filter(pk=pk)

        serializer = ArticleSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ArticleSerializer(
            article, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
