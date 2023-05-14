from django.urls import path, include
from rest_framework import routers
from .views import ClienteViewSet, ProdutoViewSet, VendedorViewSet, VendaViewSet, ComissaoViewSet, ProdutoVendidoViewSet


router = routers.DefaultRouter()
router.register('clientes', ClienteViewSet, basename='Clientes')
router.register('produtos', ProdutoViewSet, basename='Produtos')
router.register('vendedores', VendedorViewSet, basename='Vendedores')
router.register('vendas', VendaViewSet, basename='Venda')
router.register('comissao', ComissaoViewSet, basename='Comissao')

urlpatterns = [
    path('', include(router.urls))
]
