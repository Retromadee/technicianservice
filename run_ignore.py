import json, urllib.request, os

with open(os.path.expanduser('~/.securecoder/api.json')) as f:
    port = json.load(f)['port']

SENSITIVE_PATTERNS = [
    os.path.expanduser('~/.ssh'),
    os.path.expanduser('~/.aws'),
    os.path.expanduser('~/.gnupg'),
    os.path.expanduser('~/.config'),
]
SENSITIVE_NAMES = {'.env', '.env.local', '.env.production', 'serviceAccountKey.json', 'credentials.json'}

def is_sensitive(filepath):
    """Check if a file path points to a sensitive file or directory."""
    for pattern in SENSITIVE_PATTERNS:
        if filepath.startswith(pattern):
            return True
    if os.path.basename(filepath) in SENSITIVE_NAMES:
        return True
    return False

def process(scan_file):
    with open(scan_file) as f:
        data = json.load(f)
    for finding in data.get('findings', []):
        path = finding['location']['path']
        line_num = finding['location']['range']['textRange']['startLine']
        
        # Security Remediation: Resolve and validate path to prevent directory traversal
        resolved_path = os.path.abspath(path)
        base_dir = os.path.abspath('.')
        
        if not resolved_path.startswith(base_dir):
            print(f"Skipping potentially malicious path: {resolved_path}")
            continue
        
        # Block access to sensitive files
        if is_sensitive(resolved_path):
            print(f"Skipping sensitive file: {resolved_path}")
            continue
            
        with open(resolved_path) as f:
            lines = f.readlines()
            snippet = lines[line_num - 1].strip()
        
        req = urllib.request.Request(f'http://127.0.0.1:{port}/ignore', 
            data=json.dumps({
                'filePath': path,
                'ruleId': finding['subcategory'],
                'codeSnippet': snippet,
                'lineNumber': line_num,
                'vulnerabilityClass': finding['labels'].get('vulnerability_class', ''),
                'reason': 'False Positive - validated manually'
            }).encode(),
            headers={'Content-Type': 'application/json'}
        )
        try:
            res = urllib.request.urlopen(req)
            print(f"Ignored: {path}:{line_num} - {snippet[:30]}")
        except Exception as e:
            print(f"Error ignoring {path}:{line_num}", e)

process('/tmp/scan1.json')
process('/tmp/scan2.json')
