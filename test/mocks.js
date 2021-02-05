export const generateShopperContext = overrides => ({
  shopperId: 'test123',
  ...overrides,
});

export const generateStorefrontInstanceContext = overrides => ({
  environtmentId: '1234',
  instanceId: 'instance1',
  environment: 'test',
  storeUrl: 'http://test.com',
  websiteId: 'main website',
  websiteCode: 'main website',
  storeId: 1234,
  storeCode: 'main store',
  storeViewId: 12345,
  storeViewCode: 'main store view code',
  websiteName: 'my website',
  storeName: 'my store name',
  storeViewName: 'my store view name',
  baseCurrencyCode: 'usd',
  storeViewCurrencyCode: 'usd',
  catalogExtensionVersion: '1.2.3',
  ...overrides,
});

export const generateMagentoExtensionContext = overrides => ({
  magentoExtensionVersion: '1.2.3',
  ...overrides,
});

export const generateProductContext = overrides => ({
  productId: 1234,
  name: 'my product',
  sku: '1234',
  topLevelSku: '123456',
  specialToDate: '1-2-2021',
  specialFromDate: '1-2-2021',
  newToDate: '1-2-2021',
  newFromDate: '1-2-2021',
  createdAt: '1-2-2021',
  updatedAt: '1-2-2021',
  manufacturer: 'magento industries',
  countryOfManufacture: 'USA',
  categories: ['test'],
  productType: 'cool',
  pricing: {
    regularPrice: 1.23,
    minimalPrice: 1.23,
    maximalPrice: 1.23,
    specialPrice: 1.24,
    tierPricing: [
      {
        customerGroupId: 12345,
        qty: 100,
        value: 1.23,
      },
    ],
    currencyCode: 'USD',
  },
  canonicalUrl: 'https://test.com',
  mainImageUrl: 'https://test.com/cool.jpg',
  ...overrides,
});

export const generateShoppingCart = overrides => ({
  cartId: 1234,
  giftMessageSelected: true,
  giftWrappingSelected: true,
  items: [
    {
      basePrice: 1.23,
      cartItemId: 1234,
      mainImageUrl: 'https://test.com/cool.jpg',
      offerPrice: 1.23,
      productName: 'my product',
      productSku: '1234',
      qty: 100,
    },
  ],
  itemsCount: 100,
  possibleOnepageCheckout: false,
  subtotalAmount: 123,
  subtotalExcludingTax: 123,
  subtotalIncludingTax: 124,
  ...overrides,
});
