const { VrpProxy, VrpTunnel } = require('@vrpjs/server');

const vRP = VrpProxy.getInterface('vRP');
const vRPClient = VrpTunnel.getInterface('vRP');
const fs = require("fs")
const imgbbUploader = require("imgbb-uploader");

RegisterCommand("screen", function (source, args, rawCommand) {
    let user_source_id = vRP.getUserId(source)
    if (vRP.hasPermission(user_source_id, "owner.permissao")) {
        let src = vRP.getUserSource(parseInt(args[0]))
        exports['screenshot-basic'].requestClientScreenshot(src, {}, (err, data) => {
            //Encode the base64 data
            const base = data.split("base64,")
            const base64 = base[1]

            // user id
            let user_id = vRP.getUserId(src)

            const options = {
                apiKey: "YOUR_IMGBB_APIKEY",
                name: user_id.toString(),
                base64string:
                    base64,
            };

            imgbbUploader(options)
                .then((response) => {
                    fs.writeFile(`C:\\screenshots\\screenshot-${user_id}.txt`, response.url, (err) => {
                        emitNet("Notify", source, "sucesso", "[Miami-AC] Screenshot feita com sucesso! Acesse miamirp.com.br/miamiac-screenshot.txt")
                    })
                })
                .catch((error) => console.error(error));
        })
    }
})
