# AppGaleriaEFotos
7. Postagens de Fotos
O que é: Um aplicativo onde o usuário tira uma foto, adiciona um texto e a "posta".
 Simplificação: A autenticação será totalmente descartada. O aplicativo terá apenas uma tela para tirar a
foto (usando a câmera) e uma tela de "feed" que mostra todas as fotos salvas localmente. O backend
(feito com Node.js) receberá a imagem e o texto e os salvará. O aplicativo então buscará essa lista de
posts para exibir.
 Foco Principal: Consumo de API RESTful (para enviar e receber dados), uso da câmera e criação
de leiaute de tela.
 Recursos Usados: React Native, Expo, Node.js (backend simples para receber as postagens).


Pessoa 1 – Front-end: Tela de câmera e postagem

Responsabilidades:

Criar a tela para tirar foto usando a câmera do Expo (expo-camera).

Implementar captura de imagem e envio do texto digitado pelo usuário.

Criar o formulário de postagem (foto + texto).

Consumir a API para enviar os dados da postagem para o backend.

Validar que a foto e o texto não fiquem vazios antes de postar.

Entrega esperada:
Uma tela funcional onde o usuário consegue tirar uma foto, escrever um texto e postar, chamando a API.

Pessoa 2 – Front-end: Tela de feed

Responsabilidades:

Criar a tela de feed, que mostra todas as postagens salvas.

Consumir a API para buscar a lista de posts do backend.

Exibir cada post com imagem e texto, de forma organizada.

Implementar scroll vertical para navegar pelas postagens.

Garantir que novas postagens apareçam sem precisar reiniciar o app (refresh ou atualização automática).

Entrega esperada:
Uma tela funcional que lista todas as postagens feitas, exibindo a foto e o texto de cada uma.

Pessoa 3 – Backend em Node.js

Responsabilidades:

Criar o backend simples em Node.js + Express.

Criar o endpoint POST /posts para receber foto + texto e salvar localmente (pode ser em pasta /uploads e um JSON para armazenar dados).

Criar o endpoint GET /posts para enviar todas as postagens para o app.

Garantir que as imagens possam ser acessadas via URL.

Tratar erros básicos (ex: arquivo não enviado, texto vazio).

Entrega esperada:
API funcional que permite ao app postar fotos e textos e buscar todas as postagens já salvas.
