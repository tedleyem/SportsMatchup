FROM node:18

WORKDIR /app

# Copy only package.json and package-lock.json from headup-web to install dependencies first
COPY headup-web/package*.json ./

RUN npm install

# Now copy the rest of the application source code from headup-web
COPY headup-web/ ./

EXPOSE 

3000



CMD ["npm", "start"]
