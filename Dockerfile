# ベースイメージを指定
FROM ubuntu:22.04

# 環境変数の設定とパッケージの更新、必要なパッケージのインストール
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    nodejs \
    curl \
    wget \
    npm \
    git \
    tzdata \
    && apt-get clean

# NodeSource Node.js 16.x リポジトリの追加
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

# Node.js と npm のインストール
RUN apt-get install -y nodejs

# open port 5173
EXPOSE 5173
