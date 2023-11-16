using Azure;
using Azure.AI.OpenAI;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.Run();

public record APIQuery(string Query);
