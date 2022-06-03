import org.w3c.dom.*
import kotlinx.browser.*
import org.w3c.xhr.XMLHttpRequest

fun main() {
    var xhttp :dynamic = XMLHttpRequest();
 	xhttp.open("GET", "http://0.0.0.0:8080/dados.txt", true)
 	xhttp.onreadystatechange = {
        val areaDePontos = document.getElementById("scores")
        areaDePontos!!.innerHTML = "<h1>Scores</h1>" + xhttp.responseText.replaceAll(";", "")
    }

 	xhttp.send()
}