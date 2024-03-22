const app = require("../app.js");
const request = require("supertest");
const { sequelize } = require("../models");
const queryInterface = sequelize.getQueryInterface();

const artikel1 = {
  title: "Test Artikel 1",
  description:
    "Deskripsi untuk Test Artikel 1 adalah ketika kita memiliki sesuatu yang tidak dapat kita gunakan dan tidak dapat kita sengsarakan",
  imgUrl: "http://example.com/artikel1.png",
  CategoryId: 1,
  UserId: 1,
};

const artikel2 = {
  title: "Test Artikel 2",
  description: "Deskripsi untuk Test Artikel 2",
  imgUrl: "http://example.com/artikel2.png",
  CategoryId: 2,
  UserId: 2,
};

describe("Artikel API Tests", () => {
  let newArtikelId;

  beforeAll(async () => {
  });

  afterAll(async () => {
    await queryInterface.bulkDelete("Artikels", null, {});
  });

  describe("POST /artikel", () => {
    test("Should return status 201 and object of new artikel", async () => {
      const response = await request(app).post("/artikel").send(artikel1);
      newArtikelId = response.body.id;
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("title", artikel1.title);
      expect(response.body).toHaveProperty("description", artikel1.description);
    });
  });

  describe("PUT /artikel/:id", () => {
    test("Should return status 200 and object of updated artikel", async () => {
      console.log(newArtikelId);
      const response = await request(app).put(`/artikel/${newArtikelId}`).send({
        title: "Test Artikel 1 Updated",
        description:
          "Deskripsi untuk Test Artikel 1 adalah ketika kita memiliki sesuatu yang tidak dapat kita gunakan dan tidak dapat kita sengsarakan",
        imgUrl: "http://example.com/artikel1.png",
        CategoryId: 1,
        UserId: 1,
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", `Artikel id ${newArtikelId} has been updated!`);
    });
  });

  describe("DELETE /artikel/:id", () => {
    test("Should return status 200 and success message", async () => {
      const response = await request(app).delete(`/artikel/${newArtikelId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
