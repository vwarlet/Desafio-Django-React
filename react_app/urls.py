from django.urls import path
from . import views


urlpatterns = [
    # path('', views.index),
    path('', views.index),
    path('clientes/', views.cliente),
    path('vendedores/', views.vendedor),
    path('Comissao/', views.comissao),
    path('vendas/', views.venda)
]
