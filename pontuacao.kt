import kotlinx.browser.*
import org.w3c.dom.*
import org.w3c.xhr.XMLHttpRequest


fun main() {
    var xhttp :dynamic = XMLHttpRequest();
 	xhttp.open("GET", "http://0.0.0.0:8080/dados.txt", true);
 	xhttp.onreadystatechange = fun(){
    
        //console.log(xhttp.responseText)
        val areaDePontos = document.getElementById("listaDePontos")
        areaDePontos!!.innerHTML = """
            <h1> Score: </h1>
            <h2>${xhttp.responseText}</h2>
        """
    }

 	xhttp.send();
}