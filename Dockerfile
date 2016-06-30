FROM mhart/alpine-node:latest
MAINTAINER Andrew Wolfe <awolfe76@gmail.com>

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY . /usr/src/app

# npm install
RUN npm cache clean
#RUN npm install
#RUN npm rebuild node-sass

# npm build
#RUN npm run clean
#RUN npm run dev:build

EXPOSE 3000

CMD ["npm", "start"]
