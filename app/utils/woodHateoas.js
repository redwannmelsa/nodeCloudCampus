const woodHateoas = (wood) => {
  return [
    {
      "rel": "self",
      "method": "GET",
      "href": `/api/wood/${wood.id}`
    },
    {
      "rel": "edit",
      "method": "PUT",
      "href": `/api/wood/${wood.id}`
    },
    {
      "rel": "delete",
      "method": "DELETE",
      "href": `/api/wood/${wood.id}`
    },
    {
      "rel": "sameHardness",
      "method": "GET",
      "href": `/api/wood/hardness/${wood.hardness}`
    }
  ]
}

exports.mapWoodsWithHateoasLinks = (woods) => {
  return woods.map(wood => (
    {
      ...wood.dataValues,
      links: woodHateoas(wood)
    }
  ))
}

exports.globalWoodHateoas = (res) => {
  const links = [
    {
      "rel": "all",
      "method": "GET",
      "href": "/api/wood/"
    },
    {
      "rel": "by hardness",
      "method": "GET",
      "href": "/api/wood/:hardness"
    },
    {
      "rel": "create",
      "method": "POST",
      "href": "/api/wood/"
    }
  ]

  return {
    res,
    links
  }
}