import { useMemo } from 'react';

const storefrontProductData = props => {
    return {
        productId: props.id,
        sku: props.sku,
        name: props.name,
        categories: props.categories.map(category => category.id),
        topLevelSku: props.sku
    };
};

const useStorefrontProduct = props => {
    return useMemo(() => {
        return {
            schema:
                'http://iglucentral.com/schemas/com.snowplowanalytics.self-desc/schema/jsonschema/1-0-0#',
            data: storefrontProductData(props)
        };
    }, [props]);
};

export default useStorefrontProduct;
