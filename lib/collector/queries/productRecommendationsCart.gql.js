import { gql } from '@apollo/client';

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
    id
    items {
      id
      can_apply_msrp
      formatted_price
      product_configuration_options {
        product {
          sku
        }
      }
      product {
        id
        name
        url_key
        url_suffix
        is_visible_in_site_visibility
        sku
        product_has_url
        image {
          url
        }
        thumbnail {
          url
          label
        }
      }
      prices {
        price {
          currency
          value
        }
      }
      quantity
      ... on ConfigurableCartItem {
        configurable_options {
          id
          option_label
          value_id
          value_label
        }
      }
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
