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

export const sampleGraphQLCart = {
  __typename: 'Cart',
  id: '4yG9W7GyEUB5z1Sovd9Htf2IlmdoArVn',
  total_quantity: 4,
  prices: {
    __typename: 'CartPrices',
    subtotal_excluding_tax: { __typename: 'Money', value: 432 },
    subtotal_including_tax: { __typename: 'Money', value: 432 },
  },
  items: [
    {
      __typename: 'ConfigurableCartItem',
      id: '477',
      can_apply_msrp: false,
      formatted_price: '<span class="price">$108.00</span>',
      product_configuration_options: [
        { __typename: 'ProductOptions', product: null },
        { __typename: 'ProductOptions', product: null },
      ],
      product: {
        __typename: 'ConfigurableProduct',
        id: 1144,
        name: 'Selena Pants',
        url_key: 'selena-pants',
        url_suffix: '.html',
        is_visible_in_site_visibility: true,
        sku: 'VP01',
        product_has_url: true,
        image: {
          __typename: 'ProductImage',
          url:
            'https://master-7rqtwti-5k2ulbou6q5ti.us-4.magentosite.cloud/media/catalog/product/cache/18e351d3d205c0264ac03dce60b9880e/v/p/vp01-ll_main_4.jpg',
        },
        thumbnail: {
          __typename: 'ProductImage',
          url:
            'https://master-7rqtwti-5k2ulbou6q5ti.us-4.magentosite.cloud/media/catalog/product/cache/18e351d3d205c0264ac03dce60b9880e/v/p/vp01-ll_main_4.jpg',
          label: 'Main',
        },
      },
      prices: {
        __typename: 'CartItemPrices',
        price: { __typename: 'Money', currency: 'USD', value: 108 },
      },
      quantity: 1,
      configurable_options: [
        {
          __typename: 'SelectedConfigurableOption',
          id: 180,
          option_label: 'Fashion Color',
          value_id: 23,
          value_label: 'Lilac',
        },
        {
          __typename: 'SelectedConfigurableOption',
          id: 183,
          option_label: 'Fashion Size',
          value_id: 30,
          value_label: 'M',
        },
      ],
    },
    {
      __typename: 'ConfigurableCartItem',
      id: '479',
      can_apply_msrp: false,
      formatted_price: '<span class="price">$108.00</span>',
      product_configuration_options: [
        { __typename: 'ProductOptions', product: null },
        { __typename: 'ProductOptions', product: null },
      ],
      product: {
        __typename: 'ConfigurableProduct',
        id: 1144,
        name: 'Selena Pants',
        url_key: 'selena-pants',
        url_suffix: '.html',
        is_visible_in_site_visibility: true,
        sku: 'VP01',
        product_has_url: true,
        image: {
          __typename: 'ProductImage',
          url:
            'https://master-7rqtwti-5k2ulbou6q5ti.us-4.magentosite.cloud/media/catalog/product/cache/18e351d3d205c0264ac03dce60b9880e/v/p/vp01-ll_main_4.jpg',
        },
        thumbnail: {
          __typename: 'ProductImage',
          url:
            'https://master-7rqtwti-5k2ulbou6q5ti.us-4.magentosite.cloud/media/catalog/product/cache/18e351d3d205c0264ac03dce60b9880e/v/p/vp01-ll_main_4.jpg',
          label: 'Main',
        },
      },
      prices: {
        __typename: 'CartItemPrices',
        price: { __typename: 'Money', currency: 'USD', value: 108 },
      },
      quantity: 2,
      configurable_options: [
        {
          __typename: 'SelectedConfigurableOption',
          id: 180,
          option_label: 'Fashion Color',
          value_id: 23,
          value_label: 'Lilac',
        },
        {
          __typename: 'SelectedConfigurableOption',
          id: 183,
          option_label: 'Fashion Size',
          value_id: 29,
          value_label: 'L',
        },
      ],
    },
    {
      __typename: 'ConfigurableCartItem',
      id: '481',
      can_apply_msrp: false,
      formatted_price: '<span class="price">$108.00</span>',
      product_configuration_options: [
        { __typename: 'ProductOptions', product: null },
        { __typename: 'ProductOptions', product: null },
      ],
      product: {
        __typename: 'ConfigurableProduct',
        id: 1144,
        name: 'Selena Pants',
        url_key: 'selena-pants',
        url_suffix: '.html',
        is_visible_in_site_visibility: true,
        sku: 'VP01',
        product_has_url: true,
        image: {
          __typename: 'ProductImage',
          url:
            'https://master-7rqtwti-5k2ulbou6q5ti.us-4.magentosite.cloud/media/catalog/product/cache/18e351d3d205c0264ac03dce60b9880e/v/p/vp01-ll_main_4.jpg',
        },
        thumbnail: {
          __typename: 'ProductImage',
          url:
            'https://master-7rqtwti-5k2ulbou6q5ti.us-4.magentosite.cloud/media/catalog/product/cache/18e351d3d205c0264ac03dce60b9880e/v/p/vp01-ll_main_4.jpg',
          label: 'Main',
        },
      },
      prices: {
        __typename: 'CartItemPrices',
        price: { __typename: 'Money', currency: 'USD', value: 108 },
      },
      quantity: 1,
      configurable_options: [
        {
          __typename: 'SelectedConfigurableOption',
          id: 180,
          option_label: 'Fashion Color',
          value_id: 25,
          value_label: 'Mint',
        },
        {
          __typename: 'SelectedConfigurableOption',
          id: 183,
          option_label: 'Fashion Size',
          value_id: 30,
          value_label: 'M',
        },
      ],
    },
  ],
};
