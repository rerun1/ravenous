removed api


const Yelp = {
  search(term,location,sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response =>{
      if(response.ok) {
        return response.json();
      }
      throw new Error("Request failed!");
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        if (jsonResponse.businesses) {
          console.log(jsonResponse.businesses);
          const businesses =  jsonResponse.businesses.map(business=>{
              return {id: business.id, name: business.name, address: business.location.address1, city: business.location.city, state: business.location.state, zipCode: business.location.zip_code, category: business.categories[0].title, rating: business.rating, reviewCount: business.review_count, imageSrc: business.image_url  };
          });
          return businesses;
        }
    });
  }
};

export default Yelp;
