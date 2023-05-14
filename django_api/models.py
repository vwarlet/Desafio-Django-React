from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Cliente(models.Model):
    nome = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)
    telefone = models.CharField(max_length=20, unique=True)


class Produto(models.Model):
    codigo = models.CharField(max_length=10, unique=True)
    descricao = models.CharField(max_length=50, null=True)
    valor = models.FloatField(validators=[MinValueValidator(0)])
    comissao = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])


class Vendedor(models.Model):
    nome = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)
    telefone = models.CharField(max_length=20, unique=True)


class Venda(models.Model):
    nota_fiscal = models.CharField(max_length=10, unique=True)
    data = models.DateTimeField()
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    vendedor = models.ForeignKey(Vendedor, on_delete=models.CASCADE)
    produtos = models.ManyToManyField(Produto, through='ProdutoVendido')


class ProdutoVendido(models.Model):
    venda = models.ForeignKey(Venda, on_delete=models.CASCADE)
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.IntegerField(validators=[MinValueValidator(0)], default=1)


class Comissao(models.Model):
    DIA_SEMANA = (
        ('seg', 'segunda-feira'),
        ('ter', 'terca-feira'),
        ('qua', 'quarta-feira'),
        ('qui', 'quinta-feira'),
        ('sex', 'sexta-feira')
    )
    dia_semana = models.CharField(max_length=13, choices=DIA_SEMANA, unique=True)
    minimo = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    maximo = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])

    class Meta:
        verbose_name = "Comissao"
        verbose_name_plural = "Comissoes"
