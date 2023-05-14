from rest_framework import serializers
from .models import Cliente, Produto, Vendedor, Venda, ProdutoVendido, Comissao


class ClienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cliente
        fields = '__all__'


class ProdutoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Produto
        fields = '__all__'


# Classe auxiliar criada para exibir os dados dos produtos no endpoint de Venda
class ProdutoAuxSerializer(serializers.ModelSerializer):
    def serialize_produto_vendido(self, produto_instance):
        vendido_instance = produto_instance \
            .produtovendido_set \
            .filter(venda=self.context["venda_instance"]) \
            .first()

        if vendido_instance:
            return ProdutoVendidoSerializer(vendido_instance).data
        return {}

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        return {**rep, **self.serialize_produto_vendido(instance)}

    class Meta:
        model = Produto
        fields = '__all__'


class VendedorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vendedor
        fields = '__all__'


class ProdutoVendidoSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProdutoVendido
        fields = ['quantidade']


class ComissaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comissao
        fields = '__all__'


class VendaSerializer(serializers.ModelSerializer):
    cliente = serializers.SerializerMethodField()
    vendedor = serializers.SerializerMethodField()
    data = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S")
    produtos_vendidos = serializers.SerializerMethodField()
    total_comissao = serializers.SerializerMethodField()

    def get_cliente(self, obj):
        return obj.cliente.nome

    def get_vendedor(self, obj):
        return obj.vendedor.nome

    def get_produtos_vendidos(self, venda):
        return ProdutoAuxSerializer(
            venda.produtos.all(),
            many=True,
            context={"venda_instance": venda}
        ).data

    def get_comissao_dia(self, comissao_dia, produto):
        # Faz o tratamento da comissao do produto com os valores
        # máximo e mínimo estipulados para cada dia da semana
        comissao = produto['comissao']
        if produto['comissao'] < comissao_dia.minimo:
            comissao = comissao_dia.minimo
        if produto['comissao'] > comissao_dia.maximo:
            comissao = comissao_dia.maximo
        return comissao

    def get_total_comissao(self, obj):
        # Calcula e exibe o total de comissao que o vendedor dessa venda deve receber
        produtos = self.get_produtos_vendidos(obj)
        comissao_dia = Comissao.objects.filter(id=obj.data.isoweekday()).first() # segunda: id = 1 ... sexta: id = 5
        total = sum([produto['valor'] * produto['quantidade'] *
                     self.get_comissao_dia(comissao_dia, produto)/100 for produto in produtos])
        return round(total, 2)

    class Meta:
        model = Venda
        fields = ['nota_fiscal', 'data', 'cliente', 'vendedor', 'produtos_vendidos', 'total_comissao']
