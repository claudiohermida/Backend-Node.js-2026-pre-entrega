const FakeStore_API_URL = "https://fakestoreapi.com/products";

async function fetchProducts() {
  try {
    const response = await fetch(FakeStore_API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchProduct(productId) {
  try {
    const response = await fetch(`${FakeStore_API_URL}/${productId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function createProduct(title, price, category) {
  try {
    const newProduct = {
      title,
      price,
      category,
    };
    const response = await fetch(FakeStore_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const product = await response.json();
    // return product;
    return product.id;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(`${FakeStore_API_URL}/${productId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error:", error);
  }
}

// console.log(await createProduct("Producto de prueba", 19.99, "electrónica"));
// console.log(await deleteProduct(1));

console.log("Iniciando servidor...");

const [, , method, ...path] = process.argv;
// Ignoramos los dos primeros elementos con slice
if (!method) {
  console.log(
    'Por favor, proporciona un comando: "GET", "POST", "PUT" o "DELETE".',
  );
  process.exit(1); // exit with an error message if no valid command was provided
}

const [productsRequest, productId, ...rest] =
  path && path[0] ? path[0].split("/") : [];
// we split the path by "/" to get the request type and product ID
switch (method.toUpperCase()) {
  case "GET":
    if (!path) {
      console.log(
        'se espera "productos" o "productos/:id" para obtener información.',
      );
      break;
    }
    if (
      productsRequest !== "products" || // verify we have the right keyword
      rest.length > 0 || // verify we have no extra arguments
      (productId && isNaN(productId))
    ) {
      console.log(
        'Se espera solamente "GET products" or "GET productos/:id" para obtener información de productos. \'id\' debe ser un número.',
      );
      break;
    } else {
      if (!productId) {
        console.log(await fetchProducts());
      } else {
        console.log(await fetchProduct(productId));
      }
    }
    break;

  case "POST":
    if (path.length === 0) {
      console.log("Se espera un producto para crear.");
    } else {
      const [, title, price, category, ...rest] = path; // we extract the title, price and category from the path
      if (
        productsRequest !== "products" || // verify we have the right keyword
        !title ||
        !price ||
        !category ||
        rest.length > 0 // verify we have only the required 3 parameters
      ) {
        console.log(
          'Se espera solamente "POST products" seguido de "title", "price" y "category" para crear un producto.',
        );
      } else {
        console.log(await createProduct(title, price, category));
      }
    }
    break;

  case "DELETE":
    if (productsRequest !== "products" || rest.length > 0 || isNaN(productId)) {
      // verify proper requst, no extra arguments and id is a number
      console.log(
        "Se espera solamente \"DELETE productos/:id\" para eliminar un producto. 'id' debe ser un número.",
      );
      break;
    } else {
      console.log(await deleteProduct(productId));
    }

    break;

  default:
    console.log('Comando no reconocido. Usa "GET", "POST" o "DELETE".');
}
