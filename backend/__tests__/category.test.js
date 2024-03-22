const app = require("../app.js");
const request = require("supertest");

const newCategory = {
  name: "Sunny",
};

describe("Category API Endpoints without Authentication", () => {
  let categoryId;

  test("POST /categories should create a new category", async () => {
    const newCategory = {
      name: "Sunny",
    };

    const postResponse = await request(app)
      .post("/categories")
      .send(newCategory);
    expect(postResponse.status).toBe(201);
    expect(postResponse.body).toHaveProperty("id");
    expect(postResponse.body).toHaveProperty("name", newCategory.name);

    categoryId = postResponse.body.id;
  });

  test("PUT /categories/:id should update the category", async () => {
    const updatedCategory = {
      name: "Rainy",
    };

    const putResponse = await request(app)
      .put(`/categories/${categoryId}`)
      .send(updatedCategory);
    expect(putResponse.status).toBe(200);

    expect(putResponse.body).toHaveProperty("message", expect.any(String));
  });

  test("DELETE /categories/:id should delete the category", async () => {
    const deleteResponse = await request(app).delete(
      `/categories/${categoryId}`
    );
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty("message", expect.any(String));
  });
});
