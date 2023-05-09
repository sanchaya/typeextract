from django.db import models
from django.conf import settings


TEMP_DIR = f"{settings.MEDIA_ROOT}/temp"

class SupportedLanguages(models.Model):
    language = models.CharField(max_length=200)
    language_code = models.CharField(max_length=200)


class Characters(models.Model):
    language = models.ForeignKey(SupportedLanguages,related_name="char_language",on_delete=models.DO_NOTHING)
    character = models.CharField(max_length=20)

class Category(models.Model):
    cat_name = models.CharField(max_length=200)

class Genre(models.Model):
    name = models.CharField(max_length=200)

class Book(models.Model):
    name = models.CharField(max_length=500)

class BookLang(models.Model):
    language = models.ForeignKey(SupportedLanguages,related_name="book_language",on_delete=models.DO_NOTHING)
    book = models.ForeignKey(Book,related_name="book_multi_lang",on_delete=models.DO_NOTHING)
    book_name = models.CharField(max_length=500)

class BookAuthor(models.Model):
    author_name = models.CharField(max_length=250)

class BookAuthorLang(models.Model):
    author_name = models.CharField(max_length=250)
    author = models.ForeignKey(BookAuthor,related_name="book_author_multiling",on_delete=models.DO_NOTHING)
    language = models.ForeignKey(SupportedLanguages,related_name="author_language",on_delete=models.DO_NOTHING)

class Publisher(models.Model):
    publiser_name = models.CharField(max_length=250)

class PublisherLang(models.Model):
    publiser_name = models.CharField(max_length=250)
    publisher = models.ForeignKey(Publisher,related_name="publisher_multiling",on_delete=models.DO_NOTHING)
    language = models.ForeignKey(SupportedLanguages,related_name="publisher_language",on_delete=models.DO_NOTHING)

class PrintingPress(models.Model):
    name = models.CharField(max_length=250)
    location = models.CharField(max_length=250)

class PrintingPressLang(models.Model):
    name = models.CharField(max_length=250)
    location = models.CharField(max_length=250)
    language = models.ForeignKey(SupportedLanguages,related_name="press_language",on_delete=models.DO_NOTHING)
    press = models.ForeignKey(PrintingPress,related_name="press_multiling",on_delete=models.DO_NOTHING)



class BookInfo(models.Model):
    sid = models.CharField(max_length=100)
    book = models.ForeignKey(Book,related_name="book_book_info",on_delete=models.DO_NOTHING)
    publisher = models.ForeignKey(Publisher,related_name="publisher_book_info",on_delete=models.DO_NOTHING)
    printing_press = models.ForeignKey(PrintingPress,related_name="press_book_info",on_delete=models.DO_NOTHING)
    printed_year = models.IntegerField()
    genre = models.ForeignKey(Genre,related_name="genre_book_info",on_delete=models.DO_NOTHING)
    category = models.ForeignKey(Category,related_name="category_book_info",on_delete=models.DO_NOTHING)
    collection =  models.CharField(max_length=50)
    collection_items = models.CharField(max_length=50)
    url = models.URLField()

def upload_path_map(instance,filename):
    return  f"{settings.MEDIA_ROOT}/{instance.character.language.language_code}/{instance.character.character}/{instance.id}.jpg"

    

class CharMap(models.Model):
    character = models.ForeignKey(Characters,related_name="char_charmap",on_delete=models.DO_NOTHING)
    book_info = models.ForeignKey(BookInfo,related_name="map_book",on_delete=models.DO_NOTHING) 
    char_img = models.FileField(upload_to=upload_path_map)
    page_no = models.IntegerField()
    co_ordinates = models.JSONField()
    # created_by = models.ForeignKey()