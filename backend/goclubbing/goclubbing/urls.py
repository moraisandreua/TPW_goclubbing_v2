"""goclubbing URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/business/all', views.get_all_businesses),
    path('api/events/all', views.get_all_events),
    path('api/comments/all', views.get_all_comments),
    path('api/business_photos/all', views.get_all_business_photos),
    path('api/advertisements/all', views.get_all_advertisement),
    path('api/business/search', views.get_business_by_fields),
    path('api/events/search', views.get_events_by_fields),
    path('api/comments/search', views.get_comments_by_fields),
    path('api/advertisements/search', views.get_advertisement_by_fields),
    path('api/create/business', views.create_business),
    path('api/create/event', views.create_event),
    path('api/create/comment', views.create_comment),
    path('api/create/advertisement', views.create_advertisement),

]
