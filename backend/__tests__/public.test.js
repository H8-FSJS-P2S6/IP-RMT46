const app = require("../app");
const request = require("supertest");

describe("API Endpoints", () => {
  test("GET /artikel should return list of all artikel", async () => {
    const response = await request(app).get("/artikel");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("GET /artikel/:id should return specific artikel by id", async () => {
    const artikelId = 7;
    const response = await request(app).get(`/artikel/${artikelId}`);
    expect(response.status).toBe(200);

    if (response.body) {
      expect(response.body).toHaveProperty("id", artikelId);
    } else {
      console.log(`No artikel found with ID ${artikelId}`);
    }
  });

  test("GET /categories should return list of all categories", async () => {
    const response = await request(app).get("/categories");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("GET /categories/:id should return specific category", async () => {
    const categoryId = 1;
    const response = await request(app).get(`/categories/${categoryId}`);
    expect(response.status).toBe(200);

    if (response.body) {
      expect(response.body).toHaveProperty("id", categoryId);
    } else {
      console.log(`No category found with ID ${categoryId}`);
    }
  });

  test("GET /weathers/location-detail/:city should return location detail based on city", async () => {
    const city = "Bogor";
    const response = await request(app).get(
      `/weathers/location-detail/${city}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", city);
  });
});
