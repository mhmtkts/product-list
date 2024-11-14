export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const calculateDiscountedPrice = (price, discountPercentage) => {
  return price - (price * discountPercentage) / 100;
};

export const generateMetaTags = (product) => {
  if (!product) return {};

  return {
    title: `${product.title} | ProductStore`,
    description: truncateText(product.description, 160),
    keywords: `${product.category}, ${product.brand}, online alışveriş`,
    ogImage: product.thumbnail,
  };
};

export const getImagePlaceholder = () => {
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OSI+UmVzaW0gWcO8a2xlbml5b3IuLi48L3RleHQ+PC9zdmc+";
};

// Kategorileri gruplamak için yardımcı fonksiyon
export const groupCategories = (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    return [];
  }

  const categories = {};
  for (const product of products) {
    if (!categories[product.category]) {
      categories[product.category] = [];
    }
    categories[product.category].push(product);
  }

  return Object.entries(categories).map(([name, products]) => ({
    name,
    count: products.length,
  }));
};

// Fiyat aralıklarını oluşturmak için yardımcı fonksiyon
export const generatePriceRanges = (products) => {
  if (!products || products.length === 0) {
    return []; // Ürün yoksa boş dizi döndür
  }

  const prices = products.map((p) => p.price).filter((price) => !isNaN(price));

  if (prices.length === 0) {
    return []; // Geçerli fiyat yoksa boş dizi döndür
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  // Eğer min ve max aynıysa veya çok yakınsa
  if (max - min < 1) {
    return [
      {
        min: Math.floor(min),
        max: Math.ceil(max),
      },
    ];
  }

  const step = (max - min) / 10; // 4 aralık oluştur

  return Array.from({ length: 10 }, (_, i) => ({
    min: Math.round(min + step * i),
    max: Math.round(min + step * (i + 1)),
  }));
};
