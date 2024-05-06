export const settings = {
    MONGO_URI: process.env.mongoURI || "mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority",
    PORT: process.env.PORT || 5000,
}
