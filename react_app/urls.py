from django.urls import path
from .views import index


urlpatterns = [
    path('', index),
    path('comissao', index),
    path('venda', index),
    path('cliente', index),
    path('vendedor', index),
    path('produto', index),
    path('nova-venda', index),
    path('venda/<int:id>/editar', index),
    path('novo-cliente', index),
    path('cliente/<int:id>/editar', index),
    path('novo-vendedor', index),
    path('vendedor/<int:id>/editar', index),
    path('novo-produto', index),
    path('produto/<int:id>/editar', index),
]
