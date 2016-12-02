function dadesmapa() {
    var datamap = {};
    var dadesmapa = {
        "mapwidth": "1710",
        "mapheight": "984",
        "categories": [
          {
            "id": "lliure",
            "title": "Pilona Lliure",
            "color": "#44ee44",
            "show" : "false"
          },
          {
            "id": "ocupat",
            "title": "Pilona Ocupada",
            "color": "#2424ee",
            "show": "false"
          },
          {
            "id": "anomalia",
            "title": "Pilona Averiada",
            "color": "#ee2424",
            "show": "true"
          }
        ],
        "levels": [
          {
            "id": "camping",
            "title": "Camping",
            "map": "images/prova2.4.svg",
            "show": "true",
            "locations": [
              {
                "id": "lliure1",
                "title": "Pilona Lliure 1222",
                "about": "about pilona lliure locations 1",
                "description": "description lliure 1",
                "category": "lliure",
                "link": "http://pilones/usuaris",
                "x": "0.4555",
                "y": "0.3700",
                "zoom": "3",
                "pin": "fa fa-plug lliure"
              },
              {
                "id": "lliure2",
                "title": "Pilona Lliure 2",
                "about": "about pilona lliure locations 2",
                "description": "description lliure 2",
                "category": "lliure",
                "link": "http://pilones",
                "x": "0.5269",
                "y": "0.3323",
                "zoom": "3",
                "pin": "fa fa-plug lliure"
              },
              {
                "id": "ocupat1",
                "title": "Pilona Ocupada 1",
                "about": "about pilona ocupada locations 1",
                "description": "description location ocupada 1",
                "category": "ocupat",
                "link": "http://pilones",
                "x": "0.5797",
                "y": "0.2882",
                "zoom": "3",
                "pin": "fa fa-plug ocupat"
              },
              {
                "id": "lliure3",
                "title": "Pilona Lliure 3",
                "about": "about pilona lliure locations 3",
                "description": "description location lliure 3",
                "category": "lliure",
                "link": "http://pilones",
                "x": "0.6273",
                "y": "0.2589",
                "zoom": "3",
                "pin": "fa fa-plug lliure"
              },
              {
                "id": "ocupat2",
                "title": "Pilona Ocupada 2",
                "about": "about pilona ocupada locations 2",
                "description": "description location ocupat 2",
                "category": "ocupat",
                "link": "http://pilones/usuaris",
                "x": "0.6863",
                "y": "0.2353",
                "zoom": "4",
                "pin": "fa fa-plug ocupat"
              },
              {
                "id": "averiat2",
                "title": "Pilona amb anomalia 2",
                "about": "about pilona averiada locations 2",
                "description": "description location averiada 2 cbcarm",
                "category": "anomalia",
                "link": "http://www.cbcram.net/",
                "x": "0.5532",
                "y": "0.4881",
                "zoom": "3",
                "pin": "fa fa-plug anomalia"
              },
              {
                "id": "averiat3",
                "title": "Pilona amb anomalia 3",
                "about": "about pilona averiada locations 3",
                "description": "description location averiada 3 cbcarm",
                "category": "anomalia",
                "link": "http://www.cbcram.net/",
                "x": "0.7162",
                "y": "0.2932",
                "zoom": "3",
                "pin": "fa fa-plug anomalia"
              }
            ]
          }
        ]
    };

    $.ajax({
        url: "sensors/h2o",
        async: false,
        success: function(result) {
            /* var total = 0;
            var nestat = 0;
            $.map(result, function(elm) {
                total += +elm.total;
                nestat = (elm.estat === estat) ? elm.total : nestat;
                nanomalia = (elm.estat === "anomalia") ? (nanomalia + elm.total) : nanomalia;
                return elm;
            });
            tph2o = +(100 * +nestat / total);
            nsensors += total;
            */
            var locations = []
            $.each(result,function(index,valor){
                var location = {};
                location["id"] = valor["id"];
                location["title"] = valor["titol"];
                location["about"] = valor["resum"];
                location["description"] = valor["descripcio"];
                location["category"] = valor["estat"];
                location["x"] = valor["posx"] / 10000;
                location["y"] = valor["posy"] / 10000;
                location["zoom"] = "3";
                location["pin"] = "fa fa-plug " + valor["estat"];
                //console.log(location);
                locations.push(location);
            });
            var levels = [];
            var level ={};
            level["id"] = "camping";
            level["title"] = "Camping";
            level["map"] = "images/prova2.4.svg";
            level["show"] = "true";
            level["locations"] = locations;
            levels.push(level);

            var categories = [
                {
                  "id": "lliure",
                  "title": "Pilona Lliure",
                  "color": "#44ee44",
                  "show" : "false"
                },
                {
                  "id": "ocupat",
                  "title": "Pilona Ocupada",
                  "color": "#2424ee",
                  "show": "false"
                },
                {
                  "id": "anomalia",
                  "title": "Pilona Averiada",
                  "color": "#ee2424",
                  "show": "true"
                }
            ];

            datamap["mapwidth"] = "1710";
            datamap["mapheight"] = "984";
            datamap["categories"] = categories;
            datamap["levels"] = levels;

            console.log(datamap);
        }
    });
    console.log("dadesmapa: ");
    console.log(dadesmapa);

    return datamap;
}
