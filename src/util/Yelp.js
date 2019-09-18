const apiKey =
  "m_1PCszZ78BBGSMLmSpPB9RtuKvQFhQqUdGS3d6xiRyR1o8M4Aid8tO1J7PjxCnKFIzi72X4_oTxmIfGtlrrtwfXsZ8rwAH3y5YI6Kz5JS9DcgqB0SogFRM18VvzV3Yx";
const corsAnyWhereUrl = 'https://cors-anywhere.herokuapp.com/';

let Yelp = {
    search(term, location, sortBy) {
        return fetch(corsAnyWhereUrl + `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count
                    }
                });
            }
        });
    }
}

export default Yelp;