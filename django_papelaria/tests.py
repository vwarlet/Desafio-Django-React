from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Produto, Cliente, Vendedor, Venda
from .serializers import ProdutoSerializer, ClienteSerializer, VendedorSerializer, VendaSerializer


class ClienteTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.cliente_data = {'nome': 'Teste', 'email': 'teste@teste.com', 'telefone': '(11) 99999-9999'}
        self.response = self.client.post(
            '/api/clientes/',
            self.cliente_data,
            format='json'
        )

    def test_create_cliente(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_get_cliente(self):
        cliente = Cliente.objects.get(id=1)
        serializer = ClienteSerializer(cliente)
        response = self.client.get('/api/clientes/1/')
        self.assertEqual(response.data, serializer.data)

    def test_update_cliente(self):
        cliente = Cliente.objects.get(id=1)
        updated_cliente_data = {'nome': 'Teste atualizado', 'email': 'teste@teste.com', 'telefone': '(11) 99999-9999'}
        response = self.client.put(
            '/api/clientes/1/',
            updated_cliente_data,
            format='json'
        )
        updated_cliente = Cliente.objects.get(id=1)
        serializer = ClienteSerializer(updated_cliente)
        self.assertEqual(response.data, serializer.data)

    def test_delete_cliente(self):
        response = self.client.delete('/api/clientes/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class ProdutoTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.produto_data = {'codigo': '123', 'descricao': 'Teste', 'valor': 10.0, 'comissao': 5}
        self.response = self.client.post(
            '/api/produtos/',
            self.produto_data,
            format='json'
        )

    def test_create_produto(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_get_produto(self):
        produto = Produto.objects.get(id=1)
        serializer = ProdutoSerializer(produto)
        response = self.client.get('/api/produtos/1/')
        self.assertEqual(response.data, serializer.data)

    def test_update_produto(self):
        produto = Produto.objects.get(id=1)
        updated_produto_data = {'codigo': '123', 'descricao': 'Teste atualizado', 'valor': 20.0, 'comissao': 2}
        response = self.client.put(
            '/api/produtos/1/',
            updated_produto_data,
            format='json'
        )
        updated_produto = Produto.objects.get(id=1)
        serializer = ProdutoSerializer(updated_produto)
        self.assertEqual(response.data, serializer.data)

    def test_delete_produto(self):
        response = self.client.delete('/api/produtos/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class VendedorTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.vendedor_data = {'nome': 'Teste', 'email': 'teste@teste.com', 'telefone': '(11) 99999-9999'}
        self.response = self.client.post(
            '/api/vendedores/',
            self.vendedor_data,
            format='json'
        )

    def test_create_vendedor(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_get_vendedor(self):
        vendedor = Vendedor.objects.get(id=1)
        serializer = VendedorSerializer(vendedor)
        response = self.client.get('/api/vendedores/1/')
        self.assertEqual(response.data, serializer.data)

    def test_update_vendedor(self):
        vendedor = Vendedor.objects.get(id=1)
        updated_vendedor_data = {'nome': 'Teste atualizado', 'email': 'teste@teste.com', 'telefone': '(11) 99999-9999'}
        response = self.client.put(
            '/api/vendedores/1/',
            updated_vendedor_data,
            format='json'
        )
        updated_vendedor = Vendedor.objects.get(id=1)
        serializer = VendedorSerializer(updated_vendedor)
        self.assertEqual(response.data, serializer.data)

    def test_delete_vendedor(self):
        response = self.client.delete('/api/vendedores/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


# class VendaTestCase(TestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.cliente_data = {'nome': 'Teste', 'email': 'teste@teste.com', 'telefone': '(11) 99999-9999'}
#         self.cliente_response = self.client.post(
#             '/api/clientes/',
#              self.cliente_data,
#              format='json'
#         )
#         self.produto_data = {'codigo': '123', 'descricao': 'Teste', 'valor': 10.0, 'comissao': 8}
#         self.produto_response = self.client.post(
#             '/api/produtos/',
#             self.produto_data,
#             format='json'
#         )
#         self.vendedor_data = {'nome': 'Teste', 'email': 'teste@teste.com', 'telefone': '(11) 99999-9999'}
#         self.vendedor_response = self.client.post(
#             '/api/vendedores/',
#             self.vendedor_data,
#             format='json'
#         )
#         cliente_id = self.cliente_response.data['id']
#         produto_id = self.produto_response.data['id']
#         vendedor_id = self.vendedor_response.data['id']
#         venda_data = {
#             'nota_fiscal': '123',
#             'data': '2023-05-11T19:32:48Z',
#             'cliente': cliente_id, 'vendedor': vendedor_id,
#             'produtos_vendidos' : [{ 'produto': produto_id, 'quantidade_vendida': 2}],
#             'total_comissao': '8.35'
#         }
#         self.response = self.client.post(
#             '/api/vendas/',
#             venda_data,
#             format='json'
#         )

#     def test_create_venda(self):
#         self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

#     def test_get_venda(self):
#         venda = Venda.objects.get(id=1)
#         serializer = VendaSerializer(venda)
#         response = self.client.get('/api/vendas/1/')
#         self.assertEqual(response.data, serializer.data)

#     def test_update_venda(self):
#         venda = Venda.objects.get(id=1)
#         updated_venda_data = {
#             'nota_fiscal': '123',
#             'data': '2023-05-11T19:32:48Z',
#             'cliente': venda.cliente.id,
#             'vendedor': venda.vendedor.id,
#             'produtos_vendidos': [{'produto': venda.produtos_vendidos.first().produto.id, 'quantidade_vendida': 3}],
#             'total_comissao': '10.4'
#         }
#         response = self.client.put(
#             '/api/vendas/1/',
#             updated_venda_data,
#             format='json'
#         )
#         updated_venda = Venda.objects.get(id=1)
#         serializer = VendaSerializer(updated_venda)

#     def test_delete_vendedor(self):
#         response = self.client.delete('/api/vendas/1/')
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)