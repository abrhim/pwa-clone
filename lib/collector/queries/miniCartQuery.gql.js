import { gql } from '@apollo/client';
import { ProductRecommendationsFragment } from './getCart.gql';
import { MiniCartFragment } from '@magento/venia-ui/lib/components/MiniCart/miniCart.gql';

const DataServicesFragment = gql`
  fragment DataServicesFragment on Cart {
    prices {
      subtotal_including_tax {
        value
      }
    }
    items {
      can_apply_msrp
      formatted_price
      product_configuration_options {
        product {
          sku
        }
      }
      product {
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
    }
  }
`;

const MINI_CART_QUERY = gql`
  query MiniCartQuery($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      ...MiniCartFragment
      ...ProductRecommendationsFragment
    }
  }
  ${MiniCartFragment}
  ${ProductRecommendationsFragment}
`;
export default MINI_CART_QUERY;
