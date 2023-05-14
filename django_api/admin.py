from django.contrib import admin
from .models import Cliente, Produto, Vendedor, Comissao


class Clientes(admin.ModelAdmin):
    list_display = ('id', 'nome', 'email', 'telefone')
    list_display_links= ('id', 'nome')
    search_fields = ('nome',)
    list_per_page = 10

admin.site.register(Cliente, Clientes)


class Produtos(admin.ModelAdmin):
    list_display = ('id', 'codigo', 'descricao', 'valor', 'comissao')
    list_display_links= ('id', 'codigo', 'descricao')
    search_fields = ('codigo',)
    list_per_page = 10

admin.site.register(Produto, Produtos)


class Vendedores(admin.ModelAdmin):
    list_display = ('id', 'nome', 'email', 'telefone')
    list_display_links= ('id', 'nome')
    search_fields = ('nome',)
    list_per_page = 10

admin.site.register(Vendedor, Vendedores)


class Comissoes(admin.ModelAdmin):
    list_display = ('dia_semana', 'minimo', 'maximo')
    list_display_links= ('dia_semana',)
    search_fields = ('dia_semana',)
    list_per_page = 10

admin.site.register(Comissao, Comissoes)
