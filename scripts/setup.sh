if command -v docker >/dev/null; then
    source ./build-images-docker.sh
    source ./run-images-docker.sh
elif command -v podman >/dev/null; then
    source ./build-images-podman.sh
    source ./run-images-podman.sh
else
  echo "Ni Docker ni Podman ne sont installés. Veuillez installer l'un d'entre eux pour continuer."
  exit 1
fi
