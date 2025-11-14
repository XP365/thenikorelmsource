import webbrowser
import http.server
import socketserver
import os
#import cgi # For parsing form data

PORT = 8000
WEB_DIR = os.path.dirname(os.path.abspath(__file__))
print("Current dir is",WEB_DIR)

os.chdir(WEB_DIR)

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        # Parse the form data
        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={'REQUEST_METHOD': 'POST',
                     'CONTENT_TYPE': self.headers['Content-Type'],
                     })

        # Assuming you're sending a field named 'data_to_save'
        if 'data_to_save' in form:
            data = form['data_to_save'].value
            filename = "saved_data.txt" # Or derive from client input
            filepath = os.path.join(WEB_DIR, filename)

            try:
                with open(filepath, 'w') as f:
                    f.write(data)
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(b"Data saved successfully!")
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(f"Error saving data: {e}".encode())
        else:
            self.send_response(400)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b"No data_to_save field found in POST request.")

# Create the server with the custom handler
with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving files from '{WEB_DIR}' at port {PORT}")
    print(f"Access your file at http://localhost:{PORT}")
    webbrowser.open_new(f"http://localhost:{PORT}")
    httpd.serve_forever()
    print(f"Created server for http://localhost:{PORT}")
