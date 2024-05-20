# Node.jsの公式イメージをベースとする
FROM node:16

# パッケージの更新と必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    nodejs \
    curl \
    wget \
    npm \
    git \
    && apt-get clean
