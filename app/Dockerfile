FROM ruby:2.7.1

# Add node repo
RUN curl -sL https://deb.nodesource.com/setup_current.x | bash -

# Add yarn repo
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update -qq && apt-get install -y \
    nodejs \
    yarn \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /app
WORKDIR /app

COPY Gemfile .
COPY Gemfile.lock .
COPY package.json .
COPY yarn.lock .

RUN bundle install
RUN yarn install

# COPY . /app

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
