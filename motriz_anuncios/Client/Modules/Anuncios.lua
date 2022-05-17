RegisterNetEvent('origen_notificaciones:client:Notify')
AddEventHandler('origen_notificaciones:client:Notify', function(args, type)
	Notify(type, args)
end)

---- Badulaque Abierto

function Notify(type, text)
	SendNUIMessage({
        type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("baduabierto", function()
	Notify("baduabierto","El Badulaque se encuentra abierto")
end, false)

----- Badulaque cerrado

function Notify(type, text)
	SendNUIMessage({
        type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("baducerrado", function()
	Notify("baducerrado","El Badulaque cierra sus puertas")
end, false)

---- Policia Disponible

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("polidispo", function()
	Notify("polidispo","Policia Disponible para acudir a avisos")
end, false)

----- Policia No Disponible

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("polinodispo", function()
	Notify("polinodispo","Policia No Disponible para acudir a avisos")
end, false)

---- Policia en camino

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("poliencamino", function()
	Notify("poliencamino","Policia en camino")
end, false)

---- Cruz Roja Disponible

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("crdispo", function()
	Notify("crdispo","Cruz Roja Disponible")
end, false)

---- Cruz Roja No Disponible 

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("crnodispo", function()
	Notify("crnodispo","Cruz Roja No Disponible")
end, false)

----- Bennys Abierto

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("bennysabierto", function()
	Notify("bennysabierto","El Mecanico Bennys abre sus puertas")
end, false)

------- Bennys Cerrado

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("bennyscerrado", function()
	Notify("bennyscerrado","El Mecanico Bennys cierra sus puertas")
end, false)

---------- Los Santos Abiertos

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("lscabiertos", function()
	Notify("lscabiertos","El Mecanico LSC cierra sus puertas")
end, false)

----- Los Santos Cerrados

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("lsccerrados", function()
	Notify("lsccerrados","El Mecanico LSC cierra sus puertas")
end, false)

------ Agencia Inmobilaria Abierta

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("aiabierto", function()
	Notify("aiabierto","La Agencia Inmobilaria abre sus puertas")
end, false)

----- Agencia Inmobilaria Cierra

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("aicerrado", function()
	Notify("aicerrado","La Agencia Inmobilaria cierra sus puertas")
end, false)

-------- Vanilla Unicor Abierto

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("vanillaabierto", function()
	Notify("vanillaabierto","Vanilla Unicorn abre sus puertas")
end, false)

----- Vanilla Unicorn Cerrado

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("vanillacerrado", function()
	Notify("vanillacerrado","Vanilla Unicorn abre sus puertas")
end, false)

------- CinePolis Abierto

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("cpabierto", function()
	Notify("cpabierto","El Cine abre sus puertas")
end, false)

-------- CinePolis Cerrado

function Notify(type, text)
	SendNUIMessage({
       	type2 = 'anuncios',
		type = type,
		text = text
	})
end

RegisterCommand("cpcerrado", function()
	Notify("cpcerrado","El Cine abre sus puertas")
end, false)