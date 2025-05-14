FROM python:3.10-alpine
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /stockcontrol_api

COPY uv.lock pyproject.toml /stockcontrol_api/
RUN uv sync --locked --no-dev
COPY . /stockcontrol_api

EXPOSE 8080

CMD uv run alembic upgrade head ; uv run uvicorn api.main:app --host 0.0.0.0 --port 8080
