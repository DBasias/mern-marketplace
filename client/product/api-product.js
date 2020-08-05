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

export { create };
