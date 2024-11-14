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
    return [];
  }

  // Geçerli fiyatları filtrele
  const prices = products
    .map((p) => p.price)
    .filter((price) => !isNaN(price) && price >= 0);

  if (prices.length === 0) {
    return [];
  }

  // Önceden tanımlanmış fiyat aralıkları
  const predefinedRanges = [
    { min: 0, max: 10 }, // $0-$10 arası ürünler
    { min: 10, max: 30 }, // $10-$30 arası ürünler
    { min: 30, max: 70 }, // $30-$70 arası ürünler
    { min: 70, max: 150 }, // $70-$150 arası ürünler
    { min: 150, max: 300 }, // $150-$300 arası ürünler
    { min: 300, max: 500 }, // $300-$500 arası ürünler
    { min: 500, max: 1000 }, // $500-$1000 arası ürünler
    { min: 1000, max: Number.MAX_SAFE_INTEGER }, // $1000 üzeri ürünler
  ];

  // Her aralıktaki ürün sayısını hesapla
  const rangesWithCounts = predefinedRanges.map((range) => {
    const count = prices.filter(
      (price) => price >= range.min && price < range.max
    ).length;

    return {
      ...range,
      count,
      label:
        range.max === Number.MAX_SAFE_INTEGER
          ? `$${range.min}+`
          : `$${range.min} - $${range.max}`,
      products: products.filter(
        (product) => product.price >= range.min && product.price < range.max
      ),
    };
  });

  // Boş aralıkları filtrele
  return rangesWithCounts.filter((range) => range.count > 0);
};
