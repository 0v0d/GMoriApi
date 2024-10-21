FROM ruby:3.2.5

# ロケールとタイムゾーンの設定
ENV LANG C.UTF-8
ENV TZ Asia/Tokyo
ENV RAILS_ENV=development

# 必要なパッケージのインストールと Node.js のセットアップ
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev curl && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn && \
    rm -rf /var/lib/apt/lists/*

# 作業ディレクトリを /app に設定
WORKDIR /app

# Gemfile と Gemfile.lock をコピーして、依存関係をインストール
COPY Gemfile Gemfile.lock ./
RUN bundle install

# アプリケーションのコード全体をコピー
COPY . .

# エントリポイントスクリプトをコピー
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# ポート 3000 をエクスポート
EXPOSE 3000

# Rails サーバーを起動
CMD ["rails", "server", "-b", "0.0.0.0"]
