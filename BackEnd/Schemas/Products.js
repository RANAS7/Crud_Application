// schema.js
const createProductsTable = `
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Product_Name VARCHAR(255) NOT NULL,
  Product_Image TEXT,
  Price DECIMAL(10, 2) NOT NULL,
  Description TEXT,
  Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

module.exports = { createProductsTable };
