FROM node:14-alpine As dependencies

WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node

ENV NODE_ENV=production

FROM node:14-alpine As builder
WORKDIR /app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=dependencies /app/node_modules ./node_modules

COPY --chown=node:node . .
RUN npm run build
RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:14-alpine As production
COPY --chown=node:node --from=builder /app /app

WORKDIR /app

EXPOSE 3000
CMD ["npm", "run", "start"]