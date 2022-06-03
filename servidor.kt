import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.features.*
import io.ktor.html.*
import io.ktor.request.*
import java.io.*
import kotlin.io.*


val listaDePontuacoes = mutableListOf<Jogador>()
class Jogador(val nome: String, val pontuacao: Int)

fun salvarDados(lista: List<Jogador>) {
    val novaLista = lista.sortedBy {x -> x.pontuacao}.reversed()
    val conteudo = novaLista.joinToString(separator="\n") { jogador ->
        "<div class=\"score-player\"><span class=\"nome\">${jogador.nome}</span><span class=\"pontuacao\">${jogador.pontuacao}</span></div>"
    }

    File("files/dados.txt").writeText(conteudo)
}

fun abrirArquivo() {
    val file = File("files/dados.txt") 

    if(!file.exists()) {
        file.writeText("")
    } else if(!file.readText().equals("")) {
        val conteudo = file.readText().replace("<div class=\"score-player\"><span class=\"nome\">", "").replace("</span><span class=\"pontuacao\">", ";").replace("</span></div>", "")
        val dados = conteudo.split("\n").
                map { linha -> linha.split(";") } . 
                map { linha -> Jogador(linha[0], linha[1].toInt()) }
        listaDePontuacoes.clear()
        listaDePontuacoes.addAll(dados)
    }
}

fun Application.module() {
    routing {
        static("/") {
            staticRootFolder = File("files")
            file("index.html")
            file("jogo.html")
            file("dados.txt")
            file("pontuacao.html")
            file("css/style.css")
            file("js/script.js")
            file("js/pontuacao.js")
            default("index.html")
        }

        post("/salvar_pontuacao") {
            val parameters = call.receiveParameters()
            val nome = parameters["nome_usuario"] as String
            val pontos = (parameters["pontos"] as String).toInt()

            val jogador = Jogador(nome, pontos)
            listaDePontuacoes.add(jogador)
            salvarDados(listaDePontuacoes)

            val file = File("files/index.html")
            call.respondFile(file)
        }
    }
}

fun main() {
    abrirArquivo()
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        module()
    }.start(wait = true)
}