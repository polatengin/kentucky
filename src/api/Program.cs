using Azure;
using Azure.AI.OpenAI;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/", async (HttpContext context) =>
{
  var openAIUri = Environment.GetEnvironmentVariable("OPENAI_URI") ?? "";
  var openAIToken = Environment.GetEnvironmentVariable("OPENAI_TOKEN") ?? "";

  var client = new OpenAIClient(new Uri(openAIUri), new AzureKeyCredential(openAIToken));

  var body = await context.Request.ReadFromJsonAsync<APIQuery>();
  var jsonContent = File.ReadAllText("./page-all.jsonl");

  var responseWithoutStream = await client.GetChatCompletionsAsync("gpt-35-turbo-16k", new ChatCompletionsOptions()
  {
    Messages =
    {
      new ChatMessage(ChatRole.System, "You are a system to find the nearest medical centers to the user based on the given location and required treatments. Always answer using the provided information in the context. If there is not enough information, please answer 'Not enough information'."),
      new ChatMessage(ChatRole.User, $"Context: {jsonContent}\n\n----\n\n{body?.Query}"),
    },
    Temperature = 0,
  });

  var response = responseWithoutStream.Value;

  return response.Choices[0].Message.Content;
});

app.Run();

public record APIQuery(string Query);
