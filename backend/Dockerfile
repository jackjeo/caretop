FROM golang:1.23-alpine AS builder

WORKDIR /app

# 使用国内 Go 模块镜像
ENV GOPROXY=https://goproxy.cn,direct
ENV GOSUMDB=off

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o caretop-backend .

FROM alpine:latest

RUN apk --no-cache add ca-certificates tzdata

WORKDIR /root/

COPY --from=builder /app/caretop-backend .
COPY --from=builder /app/.env.example .env

EXPOSE 8080

CMD ["./caretop-backend"]
