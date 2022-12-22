# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine3.16
WORKDIR /source

ARG APP_DIR

# install Ory CLI
RUN wget -q -O - https://raw.githubusercontent.com/ory/meta/master/install.sh | sh -s -- -s -b /usr/local/bin/ ory v0.1.48

# copy csproj and restore as distinct layers
COPY "${APP_DIR}/*.csproj" ./
RUN dotnet restore ./

# copy everything else and build app
COPY "${APP_DIR}/" ./
RUN dotnet build ./ -c Release -f net7.0 --no-restore

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV \
    APP_PORT=5001 \
    ORY_TUNNEL_PORT=4000 \
    ORY_PROJECT_SLUG=playground \
    COMPlus_EnableDiagnostics=0

EXPOSE ${APP_PORT}
EXPOSE ${ORY_TUNNEL_PORT}

ENTRYPOINT ["/entrypoint.sh"]

CMD ["dotnet", "run", "./", "-c", "Release", "-f", "net7.0", "--no-build"]
