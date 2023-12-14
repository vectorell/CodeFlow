using System.Configuration;
using CodeFlow.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => {
    options.AddPolicy("AllowSpecificOrigin",
        options =>
        {
            options.WithOrigins("http://localhost:44411")
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    );
});

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<EntrieContext>(options =>
    options.UseMySql("server=localhost;user=admin;password=KvastSkaft99;database=codeflow;", ServerVersion.AutoDetect("server=localhost;user=admin;password=KvastSkaft99;database=codeflow;"))
);




var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowSpecificOrigin");
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();
