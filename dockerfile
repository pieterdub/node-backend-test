FROM postgres:17

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=procurifieddb

# Create a volume for persistent storage
VOLUME ["/var/lib/postgresql/data"]

# Copy initialization scripts (if needed)
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
