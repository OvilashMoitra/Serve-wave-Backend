FROM node:18

LABEL maintainer="Ovilash Moitra"

WORKDIR /app

COPY prisma .
COPY .eslintignore .

COPY .eslintrc .

COPY package* .

COPY tsconfig.json .

RUN npm i

COPY . .

EXPOSE 1022

CMD ["npm","run","start"]

