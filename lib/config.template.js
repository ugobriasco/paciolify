const env = {};

env.production = {
  httpPort: 3000,
  envName: "staging",
  mongo_db: {
    local: "mongodb://localhost:27017/paciolify",
    remote: ""
  },
  secret: "I-love-paciolify",
  api: {
    n26: {
      api_key: "YOUR-API-KEY"
    }
  }
};

env.staging = {
  httpPort: 3000,
  envName: "staging",
  mongo_db: {
    local: "mongodb://localhost:27017/paciolify",
    remote: ""
  },
  secret: "I-love-paciolify",
  api: {
    n26: {
      api_key: "YOUR-API-KEY"
    }
  }
};

env.test = {
  httpPort: 3001,
  envName: "test",
  mongo_db: {
    local: "mongodb://localhost:27017/paciolify",
    remote: ""
  },
  secret: "I-love-paciolify",
  api: {
    n26: {
      api_key: "YOUR-API-KEY"
    }
  }
};

module.exports = env;
