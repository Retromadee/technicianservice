#!/bin/bash
# ============================================================
# HomeFix Pro — Docker Management Script
# Usage:
#   ./docker.sh build     — build the image
#   ./docker.sh up        — start all services (detached)
#   ./docker.sh down      — stop all services
#   ./docker.sh logs      — tail the API logs
#   ./docker.sh restart   — restart the API only
#   ./docker.sh clean     — stop and remove all volumes (full reset)
# ============================================================

set -e

ACTION=${1:-help}

case "$ACTION" in
  build)
    echo "🔨 Building HomeFix Pro Docker image..."
    docker compose build --no-cache
    echo "✅ Build complete."
    ;;

  up)
    echo "🚀 Starting HomeFix Pro stack (DB + API)..."
    docker compose up -d
    echo ""
    echo "✅ Services running:"
    docker compose ps
    echo ""
    echo "📡 API available at: http://localhost:8081"
    echo "📡 DB  available at: localhost:5432"
    ;;

  down)
    echo "🛑 Stopping HomeFix Pro stack..."
    docker compose down
    echo "✅ Done."
    ;;

  logs)
    echo "📋 Tailing API logs (Ctrl+C to exit)..."
    docker compose logs -f api
    ;;

  restart)
    echo "🔄 Restarting API service..."
    docker compose restart api
    echo "✅ Restarted."
    ;;

  clean)
    echo "⚠️  This will remove all containers AND volumes (database data will be lost)."
    read -p "Are you sure? [y/N] " confirm
    if [[ "$confirm" =~ ^[Yy]$ ]]; then
      docker compose down -v
      echo "✅ Full clean done."
    else
      echo "Aborted."
    fi
    ;;

  *)
    echo "HomeFix Pro Docker Script"
    echo ""
    echo "Usage: ./docker.sh [command]"
    echo ""
    echo "Commands:"
    echo "  build    Build the Docker image"
    echo "  up       Start all services"
    echo "  down     Stop all services"
    echo "  logs     Tail API logs"
    echo "  restart  Restart API only"
    echo "  clean    Full reset (removes DB data)"
    ;;
esac
