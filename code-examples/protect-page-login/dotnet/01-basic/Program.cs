// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

using Ory.Client.Api;
using Ory.Client.Client;

var builder = WebApplication.CreateBuilder(args);

// configure http port explicitly to override generated settings from launchSettings.json
builder.WebHost.ConfigureKestrel(opt => {
	var port = builder.Configuration.GetValue<int>("APP_PORT", 5000);
	opt.ListenAnyIP(port);
});

// add support for RazorPages
builder.Services.AddRazorPages();

var app = builder.Build();

// create a new Ory Client with the BasePath set to the Ory Tunnel enpoint
var oryBasePath = builder.Configuration.GetValue<string>("ORY_BASEPATH") ?? "http://localhost:4000";
var ory = new FrontendApi(new Configuration
{
	BasePath = oryBasePath
});

// add session middleware
app.Use(async (ctx, next) =>
{
	async Task Login()
	{
		// this will redirect the user to the managed Ory Login UI
		var flow = await ory.CreateBrowserLoginFlowAsync() ?? throw new InvalidOperationException("Could not create browser login flow");
		ctx.Response.Redirect(flow.RequestUrl);
	}

	try
	{
		// check if we have a session
		var session = await ory.ToSessionAsync(cookie: ctx.Request.Headers.Cookie, cancellationToken: ctx.RequestAborted);
		if (session?.Active is not true)
		{
			await Login();
			return;
		}

		// add session to HttpContext
		ctx.Items["req.session"] = session;
	}
	catch (ApiException)
	{
		await Login();
		return;
	}

	await next(ctx);
});

// configure pipeline to use RazorPages
app.MapRazorPages();

app.Run();
