FROM node
MAINTAINER Andrew Wolfe <awolfe76@gmail.com>
#USER root

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY . /usr/src/app

#RUN useradd notroot && chown -R notroot /usr/src/app && chmod u+rwx /usr/src/app

RUN npm cache clean
RUN npm install
RUN npm rebuild node-sass

#USER notroot

RUN npm run clean
RUN npm run dev:build

EXPOSE 80

CMD ["npm", "start"]
