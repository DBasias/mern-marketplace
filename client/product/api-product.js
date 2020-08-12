const create = async (params, credentials, product) => {
  try {
    let response = await fetch("/api/products/by/" + params.shopId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: product,
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByShop = async (params, signal) => {
  try {
    let response = await fetch("/api/products/by/" + params.shopId, {
      method: "GET",
      signal: signal,
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listLatest = async signal => {
  try {
    let response = await fetch("/api/products/latest", {
      method: "GET",
      signal: signal,
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listRelated = async (params, signal) => {
  try {
    let response = await fetch("/api/products/related/" + params.productId, {
      method: "GET",
      signal: signal,
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, listByShop, listLatest, listRelated };
