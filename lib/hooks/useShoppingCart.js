import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PRODUCT_RECOMMENDATIONS_CART_QUERY from '../queries/productRecommendationsCart.gql';

const shoppingCartContextSchema =
    'http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0';
const useShoppingCart = () => {
    const [{ cartId }] = useCartContext();
    const { data, error, loading } = useQuery(
        PRODUCT_RECOMMENDATIONS_CART_QUERY,
        {
            variables: { cartId },
            skip: !cartId
        }
    );

    let items = [];
    const prepareItems = useCallback(() => {
        return items.map(item => {
            return {
                items: {
                    properties: {
                        cartItemId: item.id,
                        productName: item.product.name,
                        qty: item.quantity,
                        productSku: item.product.sku,
                        offerPrice: item.prices.price.value,
                        mainImageUrl: item.product.image.url
                    }
                }
            };
        });
    }, [items]);

    if (error && process.env.NODE_ENV === 'development') {
        console.error('Magento ShoppingCart context query failed!', error);
    }

    if (error || loading || !data) {
        return null;
    }

    const { cart } = data;
    items = cart.items || [];
    const numItems = cart.total_quantity || 0;
    return {
        schema: shoppingCartContextSchema,
        data: {
            cartId: cartId,
            subtotalExcludingTax: cart.prices.subtotal_excluding_tax.value,
            subtotalIncludingTax: cart.prices.subtotal_including_tax.value,
            itemsCount: numItems,
            items: prepareItems()
        }
    };
};

export default useShoppingCart;
