# syntax=docker/dockerfile:1
# Create a stage for building the application.
# Start from the latest golang base image
ARG GO_VERSION=1.21.6
FROM golang:${GO_VERSION} AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
# This is the architecture you’re building for, which is passed in by the builder.
# Placing it here allows the previous steps to be cached across architectures.
ARG TARGETARCH=amd64
# Build the application.
RUN CGO_ENABLED=0 GOARCH=$TARGETARCH go build -o /bin/server .

FROM alpine:latest AS final

# Install any runtime dependencies that are needed to run your application.
# Leverage a cache mount to /var/cache/apk/ to speed up subsequent builds.
RUN apk --update add \
        ca-certificates \
        tzdata \
        mailcap \
        && \
        update-ca-certificates

# Create a non-privileged user that the app will run under.
# See https://docs.docker.com/go/dockerfile-user-best-practices/
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser


# Copy the executable from the "build" stage.
COPY --from=build /bin/server /tmp/
# Copia la base de datos SQLite3 al contenedor Docker
# COPY ./database/mydatabase.db /mydatabase.db
ADD ./public /public
ADD ./assets /assets
# change public folder permissions to appuser
RUN chown -R appuser /public
RUN chmod -R 755 /public

RUN chown -R appuser /assets
RUN chmod -R 755 /assets
# change server permissions to appuser
RUN chown appuser /tmp/server
USER appuser
# Expose the port that the application listens on.
EXPOSE 3002

# What the container should run when it is started.
ENTRYPOINT [ "/tmp/server" ]
