# ベースイメージとして node を使用
FROM node:18-alpine

# 作業ディレクトリを作成
WORKDIR /frontend

# パッケージファイルをコピーして依存関係をインストール
COPY package.json ./

# yarn を使って依存関係をインストール
RUN yarn install

# アプリケーションのソースコードをコピー
COPY . /frontend/

# ビルド
RUN yarn build

# アプリケーションを起動
CMD ["yarn", "start"]

# コンテナが外部からアクセスできるようポート 3000 を開放
EXPOSE 3000