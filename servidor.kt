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

fun Application.module() {
    routing {
        static("/") {
            staticRootFolder = File("files")
            file("index.html")
            file("css/style.css")
            file("js/script.js")
            default("index.html")
        }
    }
}

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        module()
    }.start(wait = true)
}
