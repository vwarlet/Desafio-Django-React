from rest_framework import viewsets
from .models import Cliente, Produto, Vendedor, Venda, ProdutoVendido, Comissao
from .serializers import (ClienteSerializer, ProdutoSerializer, ProdutoVendidoSerializer,
                          VendedorSerializer, VendaSerializer, ComissaoSerializer)


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer


class VendedorViewSet(viewsets.ModelViewSet):
    queryset = Vendedor.objects.all()
    serializer_class = VendedorSerializer


class VendaViewSet(viewsets.ModelViewSet):
    # O script comentado abaixo foi usado 1x para criar uma venda com 2 produtos
    # e automaticamente adicionando no endpoint produtos-vendidos:
    # - a venda
    # - o produto
    # - e a quantidade (1 por padrão)

    # Venda.objects.create(
    #     nota_fiscal="1234",
    #     data="2023-01-01 00:00:00",
    #     cliente=Cliente.objects.get(id=1),
    #     vendedor=Vendedor.objects.get(id=1),
    # )
    # venda = Venda.objects.get(id=1)
    # produto1 = Produto.objects.get(id=1)
    # produto2 = Produto.objects.get(id=2)
    # venda.produtos.add(produto1)
    # venda.produtos.add(produto2)

    # http_method_names = ['get']
    queryset = Venda.objects.all()
    serializer_class = VendaSerializer


class ProdutoVendidoViewSet(viewsets.ModelViewSet):
    queryset = ProdutoVendido.objects.all()
    serializer_class = ProdutoVendidoSerializer


class ComissaoViewSet(viewsets.ModelViewSet):
    queryset = Comissao.objects.all()
    serializer_class = ComissaoSerializer
