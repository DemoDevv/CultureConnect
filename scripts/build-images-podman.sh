podman build -f ../services/artworks/Dockerfile -t artworks-image
podman build -f ../services/museums/Dockerfile -t museums-image
podman build -f ../services/transports/Dockerfile -t transports-image
