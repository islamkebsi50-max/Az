#!/usr/bin/env python3
import os
import sys
import http.server
import socketserver

class EnvInjectionHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.endswith('.html') or self.path == '/' or self.path == '/index.html' or self.path.endswith('firebase-config.js'):
            file_path = self.path.lstrip('/')
            if not file_path or file_path == 'index.html':
                file_path = 'index.html'
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Inject environment variables
                content = content.replace('%FIREBASE_API_KEY%', os.environ.get('FIREBASE_API_KEY', ''))
                content = content.replace('%FIREBASE_AUTH_DOMAIN%', os.environ.get('FIREBASE_AUTH_DOMAIN', ''))
                content = content.replace('%FIREBASE_PROJECT_ID%', os.environ.get('FIREBASE_PROJECT_ID', ''))
                content = content.replace('%FIREBASE_STORAGE_BUCKET%', os.environ.get('FIREBASE_STORAGE_BUCKET', ''))
                content = content.replace('%FIREBASE_MESSAGING_SENDER_ID%', os.environ.get('FIREBASE_MESSAGING_SENDER_ID', ''))
                content = content.replace('%FIREBASE_APP_ID%', os.environ.get('FIREBASE_APP_ID', ''))
                content = content.replace('%IMGBB_API_KEY%', os.environ.get('IMGBB_API_KEY', ''))
                
                if file_path.endswith('.js'):
                    content_type = 'application/javascript; charset=utf-8'
                else:
                    content_type = 'text/html; charset=utf-8'
                
                self.send_response(200)
                self.send_header('Content-type', content_type)
                self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
                self.send_header('Pragma', 'no-cache')
                self.send_header('Expires', '0')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(content.encode('utf-8'))
            except FileNotFoundError:
                self.send_error(404)
        else:
            super().do_GET()

if __name__ == '__main__':
    PORT = 5000
    Handler = EnvInjectionHandler
    socketserver.TCPServer.allow_reuse_address = True
    
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
            print(f"Server running on http://0.0.0.0:{PORT}", flush=True)
            httpd.serve_forever()
    except OSError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
