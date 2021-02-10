import { renderHook } from '@testing-library/react-hooks';
import useShoppingCartContext from '../../lib/hooks/useShoppingCartContext';
import mdl from 'magento-data-layer-sdk';
import { useQuery } from '@apollo/client';

jest.mock('@magento/peregrine/lib/context/cart', () => ({
  useCartContext: jest.fn().mockReturnValue([{ cartId: 1234 }]),
}));

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
}));

test('logs errors', () => {
  const oldError = console.error;
  console.error = jest.fn();
  useQuery.mockReturnValueOnce({
    data: undefined,
    error: 'foo',
    loading: false,
  });
  renderHook(() => useShoppingCartContext());
  expect(console.error).toHaveBeenCalledTimes(1);
  console.error = oldError;
});

test('populates mdl context', () => {
  expect(mdl.context.getShoppingCart()).toBeUndefined();
  const subtotalExcludingTax = 1.23;
  const subtotalIncludingTax = 1.24;
  const itemQty = 10;
  const productName = 'test product';
  const itemId = '12354';
  const itemSku = '12345';
  const imageUrl = 'https://test.com/cool.jpg';
  useQuery.mockReturnValueOnce({
    data: {
      cart: {
        prices: {
          subtotal_excluding_tax: {
            value: subtotalExcludingTax,
          },
          subtotal_including_tax: {
            value: subtotalIncludingTax,
          },
        },
        total_quantity: itemQty,
        items: [
          {
            id: itemId,
            product: {
              name: productName,
              sku: itemSku,
              image: {
                url: imageUrl,
              },
            },
            prices: {
              price: {
                value: subtotalExcludingTax,
              },
            },
            quantity: itemQty,
          },
        ],
      },
    },
  });
  renderHook(() => useShoppingCartContext());
  const cartContext = mdl.context.getShoppingCart();
  expect(cartContext).toBeDefined();
  expect(cartContext.subtotalExcludingTax).toEqual(subtotalExcludingTax);
  expect(cartContext.subtotalIncludingTax).toEqual(subtotalIncludingTax);
  expect(cartContext.itemsCount).toEqual(itemQty);
  expect(cartContext.items).toHaveLength(1);
  const item = cartContext.items[0];
  expect(item.cartItemId).toEqual(Number(itemId));
  expect(item.productName).toEqual(productName);
  expect(item.qty).toEqual(itemQty);
  expect(item.productSku).toEqual(itemSku);
  expect(item.offerPrice).toEqual(subtotalExcludingTax);
  expect(item.mainImageUrl).toEqual(imageUrl);
});
