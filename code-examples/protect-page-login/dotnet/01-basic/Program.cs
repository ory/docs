// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

using Ory.Client.Api;
using Ory.Client.Client;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

var oryBasePath = builder.Configuration.GetValue<string>("ORY_BASEPATH") ?? "http://localhost:4000";

var ory = new FrontendApi(new Configuration
{
  BasePath = oryBasePath
});

var app = builder.Build();

app.Use(async (ctx, next) =>
{
  async Task Login()
  {
    var flow = await ory.CreateBrowserLoginFlowAsync() ?? throw new InvalidOperationException("Could not create browser login flow");
    ctx.Response.Redirect(flow.RequestUrl);
  }

  var cookies = ctx.Request.Headers.Cookie;

  try
  {
    var session = await ory.ToSessionAsync(cookie: cookies, cancellationToken: ctx.RequestAborted);
    if (session?.Active is not true)
    {
      await Login();
      return;
    }

    ctx.Items["req.session"] = session;
  }
  catch (ApiException)
  {
    await Login();
    return;
  }

  await next(ctx);
});

app.MapRazorPages();

app.Run();
