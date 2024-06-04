import { request, gql } from "../node_modules/graphql-request/package.json";

const MASTER_URL = 'https://api-ap-south-1.hygraph.com/v2/clx0k7ja0002107v10vnbc20l/master'

const getSlider = async () => {
  const query = gql`
    query GetSlider {
        sliders {
          id
          name
          image {
            url
          }
        }
      }  
`
  const result = await request(MASTER_URL, query);
  return result;
}

export default {getSlider};