
from django.urls import path
from typeextractor import views

urlpatterns = [
path('image', views.view_image, name='view_image'),
path('image-process', views.image_process, name='image-process')
]
