from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('django_papelaria.urls')),
    path('', include('react_app.urls')),
]
