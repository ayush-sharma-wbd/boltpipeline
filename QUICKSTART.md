# Boltpipeline - Quick Start Guide

## 🚀 Quick Start (5 minutes)

### Option 1: Node.js

```bash
# Clone and setup
git clone https://github.com/ayush-sharma-wbd/boltpipeline.git
cd boltpipeline
npm install

# Configure
cp .env.example .env
cp config.example.yaml config.yaml

# Run
npm start
```

Visit: http://localhost:3000/health

### Option 2: Python

```bash
# Clone and setup
git clone https://github.com/ayush-sharma-wbd/boltpipeline.git
cd boltpipeline
pip install -r requirements.txt

# Configure
cp .env.example .env

# Run
python main.py
```

Visit: http://localhost:3000/health

### Option 3: Docker

```bash
# Clone
git clone https://github.com/ayush-sharma-wbd/boltpipeline.git
cd boltpipeline

# Run with Docker Compose
docker-compose up -d
```

Visit: http://localhost:3000/health

## 🛠️ Development

### Node.js Development

```bash
npm run dev      # Start with hot reload
npm test         # Run tests
npm run lint     # Check code style
```

### Python Development

```bash
pip install -r requirements.txt
export FLASK_ENV=development
python main.py   # Start with debug mode
pytest           # Run tests
flake8 .         # Check code style
```

## 📚 Key Endpoints

- `GET /health` - Health check
- `GET /metrics` - Service metrics
- `GET /api/v1/status` - Service status

## 📁 Project Structure

```
boltpipeline/
├── src/                  # Node.js source code
├── main.py               # Python entry point
├── tests/                # Test files
├── k8s/                  # Kubernetes configs
├── scripts/              # Utility scripts
├── docs/                 # Documentation
├── .github/workflows/    # CI/CD pipelines
├── docker-compose.yml    # Docker setup
└── Dockerfile            # Container image
```

## 🐳 Docker Commands

```bash
make docker-build    # Build image
make docker-run      # Start containers
make docker-stop     # Stop containers
make docker-logs     # View logs
```

## ☸️ Kubernetes Deployment

```bash
make k8s-deploy      # Deploy to cluster
make k8s-status      # Check status
make k8s-delete      # Remove deployment
```

## 📝 Configuration

### Environment Variables (.env)

```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

### Config File (config.yaml)

See `config.example.yaml` for all options.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test` or `pytest`
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 🔒 Security

- Never commit `.env` files
- Use strong secrets in production
- Keep dependencies updated
- Review [SECURITY.md](SECURITY.md)

## 💬 Support

- 🐛 Issues: [GitHub Issues](https://github.com/ayush-sharma-wbd/boltpipeline/issues)
- 📚 Docs: [Documentation](docs/)
- 📧 Email: support@example.com

## 📜 License

MIT License - see [LICENSE](LICENSE)

---

Made with ❤️ by Ayush Sharma
