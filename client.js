RegisterNetEvent('tptoway')
AddEventHandler('tptoway', function () {
    let ped = PlayerPedId()
    let veh = GetVehiclePedIsUsing(ped)
    if (IsPedInAnyVehicle(ped)) {
        ped = veh
    }

    let waypointBlip = GetFirstBlipInfoId(8)
    let x, y, z = table.unpack(Citizen.InvokeNative(0xFA7C7F0AADF25D09, waypointBlip, Citizen.ResultAsVector()))

    let groundFound = false
    ground, z = GetGroundZFor_3dCoord(x, y, height)
    if (ground) {
        z = z + 1.0
        groundFound = true

    }

    SetEntityCoordsNoOffset(ped, x, y, z, 0, 0, 1)
})