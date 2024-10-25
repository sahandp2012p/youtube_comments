start:
    vite build src && mv src/dist . && vite preview

test:
    echo \"Error: no test specified\" && exit 1

dev:
    vite --host

build:
    vite build

preview:
    vite preview

lint:
    prettier --check .

format:
    prettier --write . && black .
