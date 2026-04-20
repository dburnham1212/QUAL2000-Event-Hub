const { createPasswordHash } = require("../../appHelpers");
const fs = require("fs");
require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../../models/User");

module.exports = async () => {
    await mongoose.connect(process.env.DB_URI);

    await seedEvents(mongoose.connection.db);
    await seedUsers(mongoose.connection.db);

    await mongoose.disconnect();
};

const seedEvents = async (db) => {
    // Clear existing events
    await db.collection("events").deleteMany({});

    // Load JSON
    const raw = fs.readFileSync("./data/starter-events.json", "utf-8");
    const events = JSON.parse(raw);

    // Convert date strings to date objects
    const formatted = events.map((e) => ({
        ...e,
        date: new Date(e.date),
    }));

    // Insert fresh data
    await db.collection("events").insertMany(formatted);
};

const seedUsers = async (db) => {
    await db.collection("users").deleteMany({});

    await User.create({
        name: "dylan",
        email: "dburnham@example.com",
        password: createPasswordHash("123"),
    });

    await User.create({
        name: "tania",
        email: "tania@example.com",
        password: createPasswordHash("123"),
    });
};
