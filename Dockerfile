# ベースイメージを指定
FROM ubuntu:20.04

# 環境変数の設定とパッケージの更新、必要なパッケージのインストール
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    nodejs \
    curl \
    wget \
    npm \
    git \
    tzdata \
    && apt-get clean

# open port 5173
EXPOSE 5173
