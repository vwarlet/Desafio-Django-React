# Django-React Papelaria
O nosso cliente é uma papelaria hipotética que gostaria de registrar suas vendas e calcular a comissão de seus vendedores com base nas vendas feitas em dado período e nos percentuais de comissão cadastrados nos produtos vendidos.
- Um produto deve ter as seguintes informações: código, descrição, valor unitário e percentual de comissão, que pode variar entre 0 e 10%.
- Uma venda tem número da nota fiscal, data/hora, cliente, vendedor e uma lista de um ou mais produtos e suas quantidades vendidas.
- Clientes e vendedores têm nome, e-mail e telefone.
- O cálculo da comissão é feito aplicando-se o percentual cadastrado no produto ao valor total da venda do produto (qtd * valor unitário).
- Em alguns dias da semana, o percentual de comissão tem limites mínimos e máximos. Isso pode mudar com alguma frequência, por isso esses parâmetros devem ser configuráveis.
 Exemplo: Segundas-Feiras Min: 3% Max: 5%. Nesse caso uma venda nesse dia, de um produto de comissão 10% pagaria uma comissão de 5%. Já a venda de um produto de comissão 2% pagaria 3%.
- O total de comissão da venda é o total das somas das comissões dos itens da venda.

## Requisitos

### Django REST Framework
```
pip install djangorestframework
```

#### React e Typescript
```
npm install typescript --save-dev
npm install @types/node @types/react @types/react-dom @types/jest --save-dev
npm install ts-loader --save-dev
```


## Execução
Para executar, basta estar na pasta raiz do projeto e rodar o comando:
```
python manage.py runserver
```

- A aplicação roda na página inicial http://127.0.0.1:8000
- Os Endpoints da API são acessados através de http://127.0.0.1:8000/api
- O acesso de http://127.0.0.1:8000/admin é dado por:
  ```
  login: admin
  senha: admin
  ```

#### OBS Backend
Ficou praticamente pronto (maior parte da lógica pedida está em django_api/serializers).
O total de comissão da venda é calculado e apresentado no Endpoint de Vendas. Assim, é exibida a comissão a ser recebida pelo vendedor referente àquela venda.

#### OBS Frontend
Faltou create e update de Vendas, a parte de inserir os produtos da venda não está funcionando, nem o link 'Ver itens'.
E a busca por vendas em um determinado período, na tela de Comissão, não funciona, está trazendo todas as vendas da api.
