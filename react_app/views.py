from django.shortcuts import render


def index(request):
    return render(request, 'index.html')

def cliente(request):
    return render(request, 'cliente.html')

def vendedor(request):
    return render(request, 'vendedor.html')

def comissao(request):
    return render(request, 'comissao.html')

def venda(request):
    return render(request, 'venda.html')
