# Development

Steps to start the development environment:

1. Start database:

```bash
docker-compose up -d
```

2. Rename `.env.template` to `.env` and set the environment variables.

3. Run SEED to create [local database](localhost:3000/api/seed)

# Prisma commands

```bash
bunx prisma init
bunx prisma migrate dev
bunx prisma generate
```

# Production

# Stage
