import kotlinx.browser.*
import org.w3c.dom.*
import kotlin.random.Random

var rodada = 0
var chances = 5
var pontucaoTotal = 0
var palavraSecreta: String = palavras()

val area = document.getElementById("palavras") 

fun palavras() : String {

    val palavras : Array<String> = arrayOf("mouse", "sagaz", "mexer", "termo","senso","nobre","algoz","afeto", "ponto",
    "plena","sutil","vigor","fazer","audaz","sanar","assim","inato","cerne","ideia","fosse", "round", "abrir", "hiato",
    "desde","poder","moral","torpe","muito","honra","justo","gozar", "anexo","etnia", "sobre", "sonho", "tange", "lapso", 
    "expor", "haver", "amigo", "carma", "velho", "sonsa", "ideal", "claro", "doido", "horda", "inata", "capaz", "xeque")
    val random = Random.nextInt(until = palavras.size)
	console.log(palavras[random])
    return palavras[random]

}

fun proximaRodada(pontuacaoDaRodada: Int) {
	palavraSecreta = palavras()
	pontucaoTotal += pontuacaoDaRodada
	chances = 5
	rodada++
}

fun ehIgual(s: String): Boolean {
	return s.equals(palavraSecreta)
}

fun temLetrasEmComum(s: String): List<String> {

	return s.mapIndexed {i, x -> 
		if(x == palavraSecreta[i]) {
			//na ordem certa
			"<span class=\"green\">" + x + "</span>"
		} else if(palavraSecreta.contains(x)) {
			//fora de ordem
			"<span class=\"yellow\">" + x + "</span>"
		} else { 
			"<span>" + x + "</span>"
		}
	}
}

fun verificarEntrada(s: String): Boolean {
	if(s == "") {
		window.alert("INFORME UMA PALAVRA, POR FAVOR!")
		return false
	} else if(s.length > 5 || s.length < 5) {
		window.alert("A PALAVRA PRECISA TER SOMENTE 5 LETRAS!")
		return false
	} else {
		return true
	}	
}

fun imprimirPalavra(palavra: String): String {

	val letrasEmComum = temLetrasEmComum(palavra)
	val novaPalavra = letrasEmComum.toString().replace(",", " ")
	return "<div class=\"jogadas\"><h1> " + novaPalavra.uppercase() + "</h1></div>"
}

fun imprimirResultado(acertou: Boolean) {
	if(acertou) {
		window.setTimeout(handler = { 
			area!!.innerHTML +=  "<h1>Você acertou!</h1>"
		}, timeout = 1000)
		window.setTimeout(handler = { 
			area!!.innerHTML =  " " 
		}, timeout = 3000)
	} else {
		window.setTimeout(handler = { 
			area!!.innerHTML +=  "<h1>Você errou!</h1>"
		}, timeout = 1000)
		window.setTimeout(handler = { 
			area!!.innerHTML =  " " 
		}, timeout = 3000)
	}
}

fun verificarPalavra(s: String): Boolean {

	val result = ehIgual(s)
	area!!.innerHTML += imprimirPalavra(s)
	return result
}

fun fimDeJogo(pontuacao: Int): String {
	return """
		<section class="vencendor">
			<h1> Você ganhou! </h1>
			<form method="POST" action="salvar_pontuacao">
				Nome: <input name="nome_usuario" type="text">
				<input name ="pontos" type="hidden" value="${pontuacao}"> 
				<input type="submit" value="Enviar">
			</form>
		</section>
	"""
}

@JsName("jogar")
fun jogar() {

	val entrada = document.getElementById("entrada") as HTMLInputElement
	val palavra = entrada.value
	entrada.value = ""
	
	if(verificarEntrada(palavra)) {
		if(verificarPalavra(palavra.lowercase())) {
			imprimirResultado(true)
			proximaRodada(chances*100)
	
		} else {
			chances--
		}

		if(chances == 0) {
			imprimirResultado(false)
			proximaRodada(chances)
		}

		console.log("rodada atual: " + rodada)
		if(rodada == 2) {
			console.log("fim de jogo! " + pontucaoTotal)

			window.setTimeout(handler = { 
				area!!.innerHTML += fimDeJogo(pontucaoTotal)
			}, timeout = 4000)	
		}
	}	
}	