import gql from 'graphql-tag';

const ProductRecommendationsFragment = gql`
  fragment ProductRecommendationsFragment on Cart {
    total_quantity
    prices {
      subtotal_excluding_tax {
        value
      }
      subtotal_including_tax {
        value
      }
    }
    items {
      id
      product {
        id
        name
        sku
        image {
          url
        }
      }
      prices {
        price {
          value
        }
      }
      quantity
    }
  }
`;

export const PRODUCT_RECOMMENDATIONS_CART_QUERY = gql`
  query ProductRecommendationsCart($cartId: String!) {
    cart(cart_id: $cartId) @connection(key: "Cart") {
      id
      ...ProductRecommendationsFragment
    }
  }
  ${ProductRecommendationsFragment}
`;

export default PRODUCT_RECOMMENDATIONS_CART_QUERY;
