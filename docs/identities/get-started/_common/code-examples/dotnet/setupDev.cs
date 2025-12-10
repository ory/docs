using System;
using Ory.Client.Api;
using Ory.Client.Client;

public class OryClientFactory
{
    public static FrontendApi CreateOryClient()
    {
        var baseUrl = Environment.GetEnvironmentVariable("ORY_SDK_URL") ?? "http://localhost:4000";

        var config = new Configuration
        {
            BasePath = baseUrl,
        };

        return new FrontendApi(config);
    }
}


