# API de autenticação

  

Esta API é responsável por fazer autenticação, registro de usuário e recuperação de senha via e-mail.

  

### :dvd: Rote localmente

  

1. Faça um clone desse repositório na sua máquina;

	```bash
		git clone https://github.com/SamukaWenceslau/api-authetication.git
	```

2. Após clonar o repositório, navegue até a pasta `/api-authentication` e instale as dependências do projeto;

	```bash
		yarn add
	```

3. Após instalar todas as dependências do projeto, vá até o diretório raiz do projeto e crie o arquivo `.env` e defina o valor das variáveis de ambiente, sendo elas:

	```env
		URL_MAIL=http://localhost:[PORT]
		JWT_SECRET=
		ALT=
	```
	> **Importante:** Só add na `URL_MAIL` a porta de sua escolha, para enviar erros.

4. Agora, vamos criar as tabelas do nosso banco. Vá no seu terminal, navegue até o diretório raiz e execute o comando abaixo:
	```bash
		yarn typeorm migration:run
	```

5. Agora com tudo configurado. Novamente no seu terminal, execute o comando abaixo:
	```bash
		yarn dev
	```

6. Pronto! Agora é só ir no postman, insomnia, ou qualquer outra ferramenta que você preferir, e se divirta :fire:

  

#### ⏳ Sem tempo para testar?! veja todos os retornos da API [na documentação do projeto.](./Documentation.md)