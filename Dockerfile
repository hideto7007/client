# ベースイメージを指定
FROM ubuntu:20.04

# パッケージの更新と必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    nodejs \
    curl \
    wget \
    npm \
    git \
    && apt-get clean
