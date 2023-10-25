//req  --> requisition: requisicao feita
//res  --> response: resposta a requisicao, responder a API
//next --> para continuar a requisicao
// os middleware são funções para serem reutilizadas e realizarem tarefas
// Middleware servem para checar regras de negocio entre a api e o front end

async function authDocProducao(req,  res, next) {
    const {senhaDigitada} = req.body;// corpo da requisicao// front-end enviando informacoes para a API
    

    //verifica se o sevidor está no localhost, se ele estiver não é necessário senha
    // e também te envia para a página de carregamento da documentação em caso da senha correta
    if (req.headers.host.includes('localhost') || req.originalUrl !== "/doc/") {
         return next();
    } 

    // se o usuário não está no localhost ele deve digitar uma senha, aqui ele verifica se a senha está correta
    if (senhaDigitada === process.env.SWAGGER_SENHA_DOC) {
        return next();
    }

    if (senhaDigitada) {
        res.status(401).set('Content-Type', 'text/html') // envia para o front-end um código de status, informando que não foi autorizado o acesso
        // enviando uma tela de erro para o usuário  digitar novamente a senha
        res.send(Buffer.from(`
        <form method='post'>
            <p style="color: red"> Senha Incorreta!</p>
            <label for="senhaDigitada">Senha da Documentacao:</label>
            <input type="password" name="senhaDigitada" id= "senhaDigitada" />
            <button type="submit">Entrar</button>
        </form>`
        ))
    } else{
        // essa tela aparece primeiro.
        // O usuário ainda não digitou a senha e está em modo produção
        res.status(200).set('Content-Type', 'text/html') // envia para o front-end um código de status, informando que não foi autorizado o acesso
        // enviando uma tela para o usuário  digitar a senha
        res.send(Buffer.from(`
        <form method='post'>
            <label for="senhaDigitada">Senha da Documentacao:</label>
            <input type="password" name="senhaDigitada" id= "senhaDigitada" />
            <button type="submit">Entrar</button>
        </form>`
        ))
    }

}

module.exports = authDocProducao;