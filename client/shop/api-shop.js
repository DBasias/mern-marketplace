const create = async (params, credentials, shop) => {
  try {
    let response = await fetch("/api/shops/by/" + params.userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: shop,
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const list = async signal => {
  try {
    let response = await fetch("/api/shops", {
      method: "GET",
      signal: signal,
    });

    return await response.json;
  } catch (err) {
    console.log(err);
  }
};

const listByOwner = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/shops/by/" + params.userId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, list, listByOwner };
