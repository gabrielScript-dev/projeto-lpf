import kotlinx.browser.*
import org.w3c.dom.*
import kotlin.random.Random

val partida: Partida = Partida(3)
val area = document.getElementById("palavras") 

class Palavra() {
    private var palavraSecreta: String

    fun palavras() : String {

        val palavras : Array<String> = arrayOf("mouse", "sagaz", "mexer", "termo","senso","nobre","algoz","afeto", "ponto",
        "plena","sutil","vigor","fazer","audaz","sanar","assim","inato","cerne","ideia","fosse", "round", "abrir", "hiato",
        "desde","poder","moral","torpe","muito","honra","justo","gozar", "anexo","etnia", "sobre", "sonho", "tange", "lapso", 
        "expor", "haver", "amigo", "carma", "velho", "sonsa", "ideal", "claro", "doido", "horda", "inata", "capaz", "xeque",
        "seiva","banto","ferpa","punha","matar","troço","sabor","nesta","porca","etapa","ceita","barro","calça","trago",
        "rente","sigla","coroa","axial","louro","salva","final","firma","redor","arroz","limpo","bolso","torna","tumba",
        "coevo","solta","enjoo","queda","lutar","lousa","baixa","farol","ousar","fugiu","folha","mimar","neste","dança",
        "corar","zumbi","sinta","veloz","burra","longo","reler","cacto","macho","salmo","penca","forro","vazia","justa",
        "calor","farto","quite","bedel","mania","todas","sugar","lucro","gueto","chave","repor","staff","calvo","ultra",
        "logia","sexto","merda","subir","custo","refil","passe","urgir","viger","sadio","mimos","versa","valer","lento",
        "usual","cardo","mouro")
        val random = Random.nextInt(until = palavras.size)
        console.log(palavras[random])
        return palavras[random]

    }  

    fun trocarPalavra() {
        this.palavraSecreta = palavras()
    } 

    fun temLetrasEmComum(s: String): String {

        val palavraComMarcacao = s.mapIndexed {i, x -> 
            if(x == palavraSecreta[i]) {
                //na ordem certa
                "<span class=\"green\">" + x + "</span>"
            } else if(palavraSecreta.contains(x)) {
                //fora de ordem
                "<span class=\"yellow\">" + x + "</span>"
            } else { 
                "<span>" + x + "</span>"
            }}.toString().replace(",", " ").replace("[", "").replace("]","")

        return "<div class=\"jogadas\"><h1> " + palavraComMarcacao.uppercase() + "</h1></div>"
    }

    fun ehIgual(palavraEscolhida: String): Boolean {
	    return palavraEscolhida.equals(this.palavraSecreta)
    }   

    init {
        this.palavraSecreta = palavras()
    }
}

class Partida constructor(qtdRodadas: Int) {
    var rodadas: Int
    var chances: Int
    var pontuacaoTotal: Int
    private val palavraSecreta: Palavra
    
    fun proximaRodada(pontuacaoDaRodada: Int) {
        this.pontuacaoTotal += pontuacaoDaRodada
        if(this.rodadas > 0) {
	        this.palavraSecreta.trocarPalavra()
	        this.chances = 5
	    	this.rodadas--
        }

        console.log(pontuacaoDaRodada)
    }

    fun acertou(acertou: Boolean): String {
        val conteudo = if(acertou) "<h1>Você acertou!</h1>" else "<h1>Você errou!</h1>" 
        return conteudo
    }

    fun palavraModificada(palavra: String): String {
        return palavraSecreta.temLetrasEmComum(palavra)
    }

    fun verificarPalavra(s: String): Boolean {

        val resultado = palavraSecreta.ehIgual(s)
        return resultado
    }

    fun fimDeJogo(): String {
        return """
            <h1> Game Over! </h1>
            <h2> SCORE: ${this.pontuacaoTotal}</h2>
            <form method="POST" action="salvar_pontuacao">
                Nome: <input name="nome_usuario" type="text">
                <input name ="pontos" type="hidden" value="${this.pontuacaoTotal}"> 
                <input type="submit" value="Enviar">
            </form>
        """
    }

    init {
        this.chances = 5
        this.pontuacaoTotal = 0
        this.rodadas = qtdRodadas
        this.palavraSecreta = Palavra()
    }
}

fun verificarEntrada(entrada: String): Boolean {
    val s = entrada.replace(" ", "")
    val regex = "[@!#$%^&*()/0-9]".toRegex()

	if(s == "") {
		window.alert("INFORME UMA PALAVRA, POR FAVOR!")
		return false
	} else if(s.length > 5 || s.length < 5) {
		window.alert("A PALAVRA PRECISA TER SOMENTE 5 LETRAS!")
		return false
	} else if(regex.containsMatchIn(s)) {
        window.alert("A PALAVRA PRECISA TER SOMENTE 5 LETRAS!")
		return false
    } else {
		return true
	}	
}

fun imprimirResultado(resultado: String, tempo: Int) {
    window.setTimeout(handler = { 
        area!!.innerHTML +=  resultado
    }, timeout = tempo)
    
    window.setTimeout(handler = { 
        area!!.innerHTML =  " " 
    }, timeout = tempo + 2000)     
}

fun imprimirFimDeJogo(s: String, tempo: Int) {
    window.setTimeout(handler = { 
        area!!.innerHTML +=  s
    }, timeout = tempo)
}

@JsName("jogar")
fun jogar() {

	val entrada = document.getElementById("entrada") as HTMLInputElement
	val palavraAtual: String = entrada.value
	entrada.value = ""
	
	if(verificarEntrada(palavraAtual)) {

        area!!.innerHTML += partida.palavraModificada(palavraAtual)

        val palavraCerta: Boolean = partida.verificarPalavra(palavraAtual.lowercase())
        val msgResultado: String =  partida.acertou(palavraCerta)

		if(palavraCerta) {
            imprimirResultado(msgResultado, 1000)
			partida.proximaRodada(partida.chances*100)
		} else if(partida.chances == 1) {
            imprimirResultado(msgResultado, 1000)
			partida.proximaRodada(partida.chances*0)
		} else {
            partida.chances--
        }

        if(partida.rodadas == 0) {
            console.log("pontuacao total: " + partida.pontuacaoTotal)
            imprimirFimDeJogo(partida.fimDeJogo(), 4000)
		}
	}	
}	
