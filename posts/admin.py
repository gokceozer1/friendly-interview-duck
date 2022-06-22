from django.contrib import admin
from .models import Question, Article


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('company', 'position', 'question',
                    'answer', 'get_articles')

    def get_articles(self, obj):
        return "\n".join([p.headline for p in obj.articles.all()])


class ArticleAdmin(admin.ModelAdmin):
    list_display = ('headline', 'text')

# Register your models here.


admin.site.register(Question, QuestionAdmin)
admin.site.register(Article, ArticleAdmin)
