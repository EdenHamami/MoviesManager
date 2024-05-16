﻿using Microsoft.Extensions.Options;
using MongoDB.Driver;
using movies_manager_server.Configurations;
using movies_manager_server.Models;

namespace movies_manager_server.Data
{
    public class ApplicationContext
    {
        private readonly IMongoDatabase _database;
        public ApplicationContext(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }
        public IMongoCollection<Movie> Movies => _database.GetCollection<Movie>("Movies");

    }
}
