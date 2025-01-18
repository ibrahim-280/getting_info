from http.server import SimpleHTTPRequestHandler, HTTPServer
import os

class MyRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '/index.html':
            self.path = 'index.html'
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()

            # Add the client's IP address to the HTML
            client_ip = self.client_address[0]
            with open(self.path, 'r') as file:
                content = file.read().replace(
                    "<p>Your IP Address will be displayed here.</p>",
                    f"<p>Your IP Address: {client_ip}</p>"
                )
            self.wfile.write(content.encode())
        else:
            super().do_GET()

# Set the directory containing the HTML file
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Start the server
PORT = 8080
server_address = ('', PORT)
httpd = HTTPServer(server_address, MyRequestHandler)

print(f"Server running at http://0.0.0.0:{PORT}")
httpd.serve_forever()
