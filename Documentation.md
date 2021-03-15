# :page_facing_up: Documentação - API de autenticação

Esta API é responsável por fazer autenticação, registro de usuário e recuperação de senha via e-mail.


## GET /user

Este **endpoint** é responsável por devolver as informações de um usuário específico.

> **Importante:** Este endpoint necessita de autenticação para ser acessado.

### Request
Nenhum parâmetro.

### Response

**Status:** 200 - Sucesso

Caso essa respostas aconteça, irá receber as informações do usuário autenticado.

**Exemplo:**

```JSON
{
"id":  "[USER_ID]",
"name":  "User",
"email":  "user@mail.com"
}
```
## POST /login

Este **endpoint** é responsável por autenticar o usuário. 

### Request

**Tipo:** request.body

```JSON
{
"email": "user@mail.com",
"password": "user_password"
}
```
### Response

**Status:** 200 - Sucesso

Caso essa respostas aconteça, irá receber uma mensagem de sucesso e o token JWT, que pode ser utilizado para acessar rotas protegidas.

**Exemplo:**

```JSON
{
"message":  "Successful authentication!",
"token":  "[JWT_TOKEN]"
}
```
  
**Status:** 406 - Não Aceitável
  
Caso essa respostas aconteça, irá receber uma mensagem de erro, podem ser de 2 tipos: 

 1. Senha incorreta;
 2. Usuário não cadastrado, caso o e-mail não seja encontrado no banco.

**Exemplo:**

```JSON
{
"message":  "Incorrect password"
}
```
```JSON
{
"message":  "User doesn't exist"
}
```

## POST /user

Este **endpoint** é responsável por registrar um novo usuário, se o e-mail já não estiver em uso.

### Request

**Tipo:** request.body

```JSON
{
"name": "user",
"email": "user@mail.com",
"password": "user_password"
}
```
### Response

**Status:** 201 - Criado

Caso essa respostas aconteça, irá receber uma mensagem de sucesso.

**Exemplo:**

```JSON
{
"message":  "Successfully user has been created"
}
```
  
**Status:** 406 - Não Aceitável
  
Caso essa respostas aconteça, irá receber uma mensagem de erro.

**Exemplo:**

```JSON
{
"message":  "User already exists!"
}
```

## POST /user/forgotpassword

Este **endpoint** é responsável pegar o e-mail de recuperação, validar e enviar uma mensagem, para o e-mail do usuário, com um link para redefinir a senha.

### Request

**Tipo:** request.body

```JSON
{
"email": "user@mail.com",
}
```
### Response

**Status:** 200 - Sucesso

Caso essa respostas aconteça, irá receber uma mensagem de sucesso e um link para acessar um e-mail teste.

**Exemplo:**

```JSON
{
"message":  "Successfully email has been sent",
"url":  "https://ethereal.email/message/YE-fmm-3nSO.8gNXYE-in.vKCX9p.b7yAAAAAQX8SbbW0repXF0Pe0AB7Pg"
}
```
  
**Status:** 406 - Não Aceitável
  
Caso essa respostas aconteça, irá receber uma mensagem de erro, pois o e-mail mencionado não está registrado no banco, ou seja, usuário não existe.

**Exemplo:**

```JSON
{
"message": "User doesn't exist!"
}
```
## PUT /user/forgotpassword

Este **endpoint** é responsável por redefinir a senha do usuário.

### Request

**Tipos:**

 - request.body

```JSON
{
"email": "user@mail.com",
}
```

 - request.query

```url
http://localhost:3000/user/forgotpassword?t=[USER_TOKEN]
```


### Response

**Status:** 200 - Sucesso

Caso essa respostas aconteça, irá receber uma mensagem de sucesso.

**Exemplo:**

```JSON
{
"message":  "Update password!"
}
```
  
**Status:** 406 - Não Aceitável
  
Caso essa respostas aconteça, irá receber uma mensagem de erro.

**Exemplo:**

```JSON
{
"message":  "Token invalid!"
}
```
