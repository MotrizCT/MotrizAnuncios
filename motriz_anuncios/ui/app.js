document.addEventListener("DOMContentLoaded", () => {
    $(".marco").hide();
    var click = document.getElementById("click");
    var over_button = document.getElementById("over_button");
    var tablet_start = document.getElementById("tablet_start");
    var tablet_app = document.getElementById("tablet_app");
    var anuncio = document.getElementById("anuncio");
    over_button.volume = 0.3;
    click.volume = 0.3;
    tablet_start.volume = 0.2;
    tablet_app.volume = 0.3;
});
let showCadSystem = function() {
    $("#sidebar").hide();
    $("html").fadeIn(300);
    $(".wrapper, .marco").fadeIn(300);
    $(".loader").css("display", "block");
    tablet_start.play();
    setTimeout(function() {
        $("#sidebar").css("display", "block");
        $('.civilian-details').hide();

        $(".loader").fadeOut(300, function() {

            if ($("#content").css("display") == "block") {
                cargarMiPJ();
                tablet_app.play();
                $('#progress-bar-logros').animate({ width: 10 + '%' }, 1500);

            }

            $(".container").fadeIn(300);


            cargarSonidos();
        });
    }, 1200);


    $('#content').focus();

    isOnTab = true;


}

let hideCadSystem = function() {
    $('.wrapper').fadeOut(300, function() {
        $(".marco").fadeOut(300);

    });

    isOnTab = false;
}

//SONIDO



$(document).on('click', '#civ-back', function(ev) {
    $('.civilian-details .inputfield').empty();
    $('#notes tbody').html('');
    $('#billing tbody').html('');
    $('#licenses tbody').html('');
    $('#vehicles tbody').html('');
    $('#criminal-records tbody').html('');
    $('.civilian-details').fadeOut(300, function() {
        $('.resultinner').fadeIn(300);

    });

    $.post('https://origen_masterJob/search-players', search);
    $.post('https://origen_masterJob/get-license', search);
    $.post('https://origen_masterJob/get-cr', search);
    $.post('https://origen_masterJob/get-vehicles', search);
    $.post('https://origen_masterJob/get-billing', search);
    $.post('https://origen_masterJob/get-note', search);
    $('#Vehiculos').removeClass('nav-link active').addClass('nav-link');
    $('#Licencias').removeClass('nav-link active').addClass('nav-link');
    $('#Notas').removeClass('nav-link active').addClass('nav-link');
    $('#FacturasImpagadas').removeClass('nav-link active').addClass('nav-link');
    $('#HistorialDelictivo').removeClass('nav-link').addClass('nav-link active');
});

var gangNearPlys = {}

$(document).ready(function() {

    // $(".loader").show(function() {
    //     setTimeout(function() {
    //         $(".loader").fadeOut(300, function() {

    //             $("#sidebar").fadeIn(300);
    //             $(".container").fadeIn(300);
    //         });
    //     }, 1200);
    // });

    cargarSonidos();
    cargarGraficas();
    $('.civilian-details').hide();
    $('#sidebarCollapse').on('click', function() {
        $('#sidebar').toggleClass('active');
    });
    $('#goHome').on('click', cargarMiPJ);
    $('#search-for-civilian').on('click', function() {
        searchPlayer();
    });
    $('#createNotes').on('click', function() {
        $('#dialogNotes').fadeIn(300);
    });
    $('#createCustomBill').on('click', function() {
        $('#dialogCustomBills').fadeIn(300);
    });
    $('#closeCustomBills').on('click', function() {
        $('#dialogCustomBills').fadeOut(300);
    });
    $('#saveCustomBills').on('click', function() {
        if ($('#titleCustomBills').val().length > 1 && $('#contentCustomBills').val().length >= 1 && $('#timeCustomBills').val().length >= 1) {
            document.getElementById("texto").innerHTML += $('#titleCustomBills').val() + ' ' + '\n';
            dinero = $('#contentCustomBills').val();
            tiempo = $('#timeCustomBills').val();
            dinerof = parseInt(dinerof) + parseInt(dinero);
            tiempof = parseInt(tiempof) + parseInt(tiempo);
            document.getElementById("prueba").innerHTML = "Total: $" + dinerof + " / Meses: " + tiempof;
            $('#dialogCustomBills').hide(300);
        } else {
            console.log('rellena los campos');
        }
    });
    $('#sendBillings').on('click', function() {
        $('#search-ciudadanos').hide();
        $('#container').show();
        $('#dialogCustomBills').hide();
    });
    $('#billing-back').on('click', function() {
        $('#container').hide();
        $('.resultinner').fadeOut(300, function() {
            $('#search-ciudadanos').fadeIn(300);
            $('.civilian-details').fadeIn(300);

        });
    });
    $('#saveNotes').on('click', function() {
        if ($('#titleNote').val().length > 1 && $('#contentNote').val().length > 1) {
            addNote();
            $('#dialogNotes').fadeOut(300);
        } else {
            console.log('rellena los campos');
        }
    });
    $('#closeDialogNotes').on('click', function() {
        $('#dialogNotes').fadeOut(300);
    });
    $('#closeDialogEditInfo').on('click', function() {
        $('#editJobInfoDialog').hide(300);
    });
    $("#saveNewInfoJob").on('click', function() {
        job = JSON.stringify({ x: $('#xBlipJob').val(), y: $('#yBlipJob').val(), z: $('#zBlipJob').val(), job: $('#nameJobInfo').val(), typeCoordsBlip: $("input[type='radio'][name='typeCoordsBlip']:checked").val(), Sprite: $('#spriteJobBlip').val(), labelBlip: $('#labelBlipJob').val(), colorBlip: $('#colorBlipJob').val(), typeLocal: $('#typeLocal').val() });
        $('#editJobInfoDialog').hide(300);
        table = JSON.parse(job);
        $('#nameLabel').val(table['label']);
        $('.jobLabel').text(table['label']);
        $.post('https://origen_masterJob/edit-infoJob', job)
        setTimeout(() => { $.post('https://origen_masterJob/get-jobs'); }, 100);
    });
    $('#updateJobInfo').on('click', function() {
        job = JSON.stringify({ name: $('#nameJob').val(), label: $('#nameLabel').val() });
        table = JSON.parse(job);
        $('#nameJobInfo').val(table['name'])
        $('#labelJobInfo').val(table['label'])
        $('#editJobInfoDialog').show(300);
    });
    $('#closeDialogItem').on('click', function() {
        $('#dialogItems').hide(300);
    });
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myJobs").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#allJobs tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#myItems").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#allItems tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    $("#Ciudadanos").on('click', function() {
        ocultarTodo();
        setTimeout(function() {
            $('#search-ciudadanos').show();
        }, 301);
        click.play();


    });

    $("#CiudadanosEMS").on('click', function() {
        ocultarTodo();

        setTimeout(function() {
            $('#Pacientes').show();
        }, 301);
        click.play();
        $("#searchPaciente").off("click").on("click", function() {
            searchPlayerEMS();

        });

    });


    $("#GestionMiNegocio").on('click', cargarMiNegocio);


    $("#GestionOrganizacion").on('click', cargarMiOrganizacion);


    $("#BusquedaCaptura").on('click', function() {
        ocultarTodo();
        setTimeout(function() {
            $('#containerByC').show();
            click.play();
        }, 301);



        $("#fichasSujetos").html("");
        $.post('https://origen_masterJob/get-civiliansByC');
    });

    $("#CodigoPenal").on('click', function() {
        $(".contenedor-tabla-cp").html("").hide();
        $(".cargando-cp").show();

        ocultarTodo();
        setTimeout(function() {
            $.get('codigo-penal.html', function(data){
                $(".cargando-cp").fadeOut(300, function(){
                    $(".contenedor-tabla-cp").html(data).fadeIn(300);
                    $("#buscar-articulo").off("keyup").on("keyup", function() {
                        let termino = $("#buscar-articulo").val().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                        $("#articulos tr").show();
                        
                    
                        if (termino.length > 0) {
                    
                            $("#articulos tr").each(function() {
                                let articuloBruto = $(this).find('td:first').text().toLowerCase();
                                let articulo = articuloBruto.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                                
                                if (articulo.indexOf(termino) == -1) {
                                  
                                    $(this).hide();
                                }
                            });
                        } else {
                           $("#articulos tr").show();
                        }
                    });
                });
            })
            $('#containerCPenal').show();
            click.play();
        }, 301);




        $("#fichasSujetos").html("");
        $.post('https://origen_masterJob/get-civiliansByC');
    });


    $("#GestionAdmin").on('click', function() {
        ocultarTodo();
        setTimeout(function() {
            cargarGestionAdmin();

            $('#gestion-admin').show();
        }, 301);
        click.play();



    });



    $("#deleteJobInfo").on('click', function() {
        job = JSON.stringify({ job: $('#nameJobInfo').val() });
        $('#editJobInfoDialog').hide(300);
        $.post('https://origen_masterJob/delete-infoJob', job)
    });
    $("#searchPlate").on('click', function() {
        searchPlate();
    });
    $("#Matricula").on('click', function() {
        ocultarTodo();
        setTimeout(function() {

            $('#search-plate').show();
        }, 301);
        click.play();



    });
    $("#Notas").on('click', function() {
        $("#notes .sin-datos").hide();
        $('#HistorialDelictivo').removeClass('nav-link active').addClass('nav-link');
        $('#Vehiculos').removeClass('nav-link active').addClass('nav-link');
        $('#Licencias').removeClass('nav-link active').addClass('nav-link');
        $('#FacturasImpagadas').removeClass('nav-link active').addClass('nav-link');
        $('#Notas').removeClass('nav-link').addClass('nav-link active');
        $('#criminal-records').hide()
        $('#createNotes').show();
        $('#licenses').hide()
        $('#vehicles').hide()
        $('#billing').hide()
        $('#sendBillings').hide()
        $('#notes tbody').html('');
        $("#cargando-notas").show();
        $("#lista-notas").hide();
        $('#notes').fadeIn(300);
        setTimeout(function() {
            if ($("#notes tbody tr").length == 0) {

                $("#cargando-notas").fadeOut(300, function() {
                    $("#notes .sin-datos").fadeIn(300);
                });
            }

        }, 1500);
        $.post('https://origen_masterJob/get-note', playerid);
    });
    $("#jobs").on('click', function() {
        $('#jobs').removeClass('nav-link').addClass('nav-link active');
        $('#gestionJob').show();
        click.play();

    });
    $("#FacturasImpagadas").on('click', function() {
        click.play();

        $('#HistorialDelictivo').removeClass('nav-link active').addClass('nav-link');
        $('#Vehiculos').removeClass('nav-link active').addClass('nav-link');
        $('#Licencias').removeClass('nav-link active').addClass('nav-link');
        $('#Notas').removeClass('nav-link active').addClass('nav-link');
        $('#FacturasImpagadas').removeClass('nav-link').addClass('nav-link active');
        $('#criminal-records').hide()
        $('#licenses').hide()
        $('#createNotes').hide();
        $('#sendBillings').hide()
        $('#vehicles').hide()
        $('#notes').hide()
        $('#billing tbody').html('');
        $('#billing').show()
        $.post('https://origen_masterJob/get-billing', playerid);
    });
    $("#Licencias").on('click', function() {
        click.play();
        $('#HistorialDelictivo').removeClass('nav-link active').addClass('nav-link');
        $('#Vehiculos').removeClass('nav-link active').addClass('nav-link');
        $('#Notas').removeClass('nav-link active').addClass('nav-link');
        $('#Licencias').removeClass('nav-link').addClass('nav-link active');
        $('#FacturasImpagadas').removeClass('nav-link active').addClass('nav-link');
        $('#criminal-records').hide()
        $('#licenses').show()
        $('#createNotes').hide();
        $('#sendBillings').hide()
        $('#licenses tbody').html('');
        $.post('https://origen_masterJob/get-license', playerid);
        $('#vehicles').hide()
        $('#notes').hide()
        $('#billing').hide()
    });
    $("#Vehiculos").on('click', function() {
        $("#vehicles .sin-datos").hide();
        click.play();
        $('#HistorialDelictivo').removeClass('nav-link active').addClass('nav-link');
        $('#Licencias').removeClass('nav-link active').addClass('nav-link');
        $('#Notas').removeClass('nav-link active').addClass('nav-link');
        $('#Vehiculos').removeClass('nav-link').addClass('nav-link active');
        $('#FacturasImpagadas').removeClass('nav-link active').addClass('nav-link');
        $('#criminal-records').hide()
        $('#licenses').hide()
        $('#vehicles table tbody').html('');
        $('#sendBillings').hide()
        $("#cargando-vehiculos").show();
        $("#lista-vehiculos").hide();
        $('#vehicles').fadeIn(300)
        $('#billing').hide()
        $('#createNotes').hide();
        $('#notes').hide()
        setTimeout(function() {
            if ($("#vehicles tbody tr").length == 0) {

                $("#cargando-vehiculos").fadeOut(300, function() {
                    $("#vehicles .sin-datos").fadeIn(300);
                });
            }

        }, 1500);

        $.post('https://origen_masterJob/get-vehicles', playerid);
    });
    $("#HistorialDelictivo").on('click', function() {
        click.play();
        $('#Vehiculos').removeClass('nav-link active').addClass('nav-link');
        $('#Licencias').removeClass('nav-link active').addClass('nav-link');
        $('#Notas').removeClass('nav-link active').addClass('nav-link');
        $('#FacturasImpagadas').removeClass('nav-link active').addClass('nav-link');
        $('#HistorialDelictivo').removeClass('nav-link').addClass('nav-link active');
        $('#criminal-records tbody').html('');
        $("#multas").hide();
        $("#cargando-multas").show();
        $('#criminal-records').fadeIn(300);
        $('#createNotes').hide();
        $('#billing').hide()
        playerid = JSON.stringify({ playerid: $('#cr-playerid').val() });
        $.post('https://origen_masterJob/get-cr', playerid);
        $('#licenses').hide()
        $('#vehicles').hide()
        $('#notes').hide()
        $('#sendBillings').show();
        $("#criminal-records .sin-datos").hide();

        setTimeout(function() {
            if ($("#criminal-records tbody tr").length == 0) {

                $("#cargando-multas").fadeOut(300, function() {
                    $("#criminal-records .sin-datos").fadeIn(300);
                });
            }

        }, 2000);
    });

    $(document).on('click', '.delete_note', function() {
        click.play();
        note = JSON.stringify({ id: $(this).data('id') });
        playerid = JSON.stringify({ playerid: $('#cr-playerid').val() });
        $.post('https://origen_masterJob/delete_note', note);
        $('#notes tbody').html('');
        setTimeout(() => { $.post('https://origen_masterJob/get-note', playerid); }, 100);
    });

    $(document).on('click', '#gestionarItem', function() {
        click.play();
        item = JSON.stringify({ name: $(this).data('id'), label: $(this).data('label'), weight: $(this).data('weight') });
        table = JSON.parse(item)
        $('#dialogItems').show(300);
        $('#nameItem').val(table['name'])
        $('#labelItem').val(table['label'])
        $('#weightItem').val(table['weight'])
    });

    $(document).on('click', '#confiscate-vehicle', function() {
        click.play();
        plate = JSON.stringify({ plate: $(this).data('plate') });
        playerid = JSON.stringify({ playerid: $('#cr-playerid').val() });
        $('#vehicles table tbody').html('');
        $.post('https://origen_masterJob/confiscate_vehicle', plate)
        setTimeout(() => { $.post('https://origen_masterJob/get-vehicles', playerid); }, 100);
    });

    $(document).on('click', '#saveChangesItem', function() {
        click.play();
        item = JSON.stringify({ name: $('#nameItem').val(), label: $('#labelItem').val(), weight: $('#weightItem').val() });
        $('#dialogItems').hide(300);
        $.post('https://origen_masterJob/change-item', item)
        setTimeout(() => { $.post('https://origen_masterJob/get-items'); }, 100);
    });

    $(document).on('click', '#saveChangesNewItem', function() {
        click.play();
        item = JSON.stringify({ name: $('#nameNewItem').val(), label: $('#labelNewItem').val(), weight: $('#weightNewItem').val() });
        $('#dialogNewItems').hide(300);
        $.post('https://origen_masterJob/new-item', item)
        setTimeout(() => { $.post('https://origen_masterJob/get-items'); }, 100);
    });

    $(document).on('click', '#deleteItem', function() {
        click.play();
        item = JSON.stringify({ name: $('#nameItem').val(), label: $('#labelItem').val(), weight: $('#weightItem').val() });
        $('#dialogItems').hide(300);
        $.post('https://origen_masterJob/delete-item', item)
        setTimeout(() => { $.post('https://origen_masterJob/get-items'); }, 100);
    });

    $(document).on('click', '#editLonjaItem', function() {
        click.play();
        $('#lonjaDialog').show(300);
        item = JSON.stringify({ price: $(this).data('price'), name: $(this).data('name'), label: $(this).data('label'), type: $(this).data('type') });
        table = JSON.parse(item)
        $('#nameInternalLonja').val(table['name'])
        $('#nameLabelLonja').val(table['label'])
        $('#priceLonja').val(table['price'])
        $('#typeItem').val(table['type'])
    });

    $(document).on('click', '#tpJobMarker', function() {
        click.play();
        coords = JSON.stringify({ x: $(this).data('coordx'), y: $(this).data('coordy'), z: $(this).data('coordz') });
        $.post('https://origen_masterJob/tp-marker', coords);
    });

    $(document).on('click', '#setOwnCoords', function() {
        click.play();
        $.post('https://origen_masterJob/get-coordsEdit');
    });

    $(document).on('click', '#editJobMarker', function() {
        click.play();
        coords = JSON.stringify({ x: $(this).data('coordx'), y: $(this).data('coordy'), z: $(this).data('coordz'), heading: $(this).data('coordheading'), type: $(this).data('type'), id: $(this).data('id') });
        table = JSON.parse(coords)
        $('#xMarker').val(table['x'])
        $('#yMarker').val(table['y'])
        $('#zMarker').val(table['z'])
        $('#idMarker').val(table['id'])
        $('#headingMarker').val(table['heading'])
        $('#typeMarker').val(table['type'])
        $('#MarkerDialog').show(300);
    });

    $(document).on('click', '#closeMarkerDialog', function() {
        click.play();
        $('#MarkerDialog').hide(300);
    });

    $(document).on('click', '#closeLonjaDialog', function() {
        click.play();
        $('#lonjaDialog').hide(300);
    });

    $(document).on('click', '#saveObjectLonja', function() {
        click.play();
        item = JSON.stringify({ name_value: $('#nameInternalLonja').val(), job: $('#nameJob').val(), name: $('#nameLabelLonja').val(), price: $('#priceLonja').val(), type: $('#typeItem').val() });
        $('#lonjaDialog').hide(300);
        $.post('https://origen_masterJob/change-objectLonja', item);
        job = JSON.stringify({ name: $('#nameJob').val() });
        setTimeout(() => { $.post('https://origen_masterJob/get-lonja', job); }, 200);
    });

    $(document).on('click', '#deleteObjectLonja', function() {
        click.play();
        item = JSON.stringify({ name_value: $('#nameInternalLonja').val(), job: $('#nameJob').val() });
        $('#lonjaDialog').hide(300);
        $.post('https://origen_masterJob/delete-objectLonja', item);
        job = JSON.stringify({ name: $('#nameJob').val() });
        setTimeout(() => { $.post('https://origen_masterJob/get-lonja', job); }, 100);
    });

    $(document).on('click', '#newItem', function() {
        click.play();
        $('#dialogNewItems').show(300);
    });

    $(document).on('click', '#closeDialogNewItem', function() {
        $('#dialogNewItems').hide(300);
    });

    $(document).on('click', '#gestionarJob', function() {
        click.play();
        job = JSON.stringify({ name: $(this).data('name'), label: $(this).data('label'), offJob: $(this).data('offjob') });
        table = JSON.parse(job)
        $('#criminal-records tbody').html('');
        $('#rangosAll tbody').html('');
        $('#lonjaTable tbody').html('');
        $('#markersTable tbody').html('');
        $('#nameJob').val(table['name']);
        $('#nameLabel').val(table['label']);
        $('.jobName-label').text('Nombre Interno:');
        $('.jobName').text(table['name']);
        $('.jobLabel-label').text('Nombre Visible:');
        $('.jobLabel').text(table['label']);
        $('.count-label').text('Numero de Integrantes:');
        $('#job-details').show();
        $('#newlonjaDialog').hide();
        $('#lonjaDialog').hide();
        $('#MarkerDialog').hide();
        $('#newMarkerDialog').hide();
        $('#newRangosDialog').hide();
        $('#editJobInfoDialog').hide();
        $('#integrantesTable').show();
        $('#lonjaTable').hide();
        $('#markersTable').hide();
        $('#inventoryTable').hide();
        $('#gestion-admin').hide();
        $('#rangosAll').hide();
        $('#newObjectLonja').hide();
        $('#newMarker').hide();
        $('#newRango').hide();
        $('#editRangosDialog').hide();
        $('#Rangos').removeClass('nav-link active').addClass('nav-link');
        $('#Licencias').removeClass('nav-link active').addClass('nav-link');
        $('#Lonja').removeClass('nav-link active').addClass('nav-link');
        $('#Inventory').removeClass('nav-link active').addClass('nav-link');
        $('#Markers').removeClass('nav-link active').addClass('nav-link');
        $('#Integrantes').removeClass('nav-link').addClass('nav-link active');
        $.post('https://origen_masterJob/get-employeesJob', job);
        $.post('https://origen_masterJob/get-infoJob', job);
    });

    $(document).on('click', '#closeeditJobs', function() {
        click.play();
        $('#editDialogJobs').hide(300);
    });

    $(document).on('click', '#job-back', function() {
        click.play();
        $('#job-details').hide();
        $('#gestion-admin').show();
    });

    $(document).on('click', '.delete_cr', function() {
        click.play();
        cr = JSON.stringify({ identification: $(this).attr('data-id'), playerid: $('#cr-playerid').val() });
        playerid = JSON.stringify({ playerid: $('#cr-playerid').val() });
        $.post('https://origen_masterJob/delete_cr', cr);
        $('#criminal-records tbody').html('');
        $("#multas").hide();
        $("#cargando-multas").show();
        $('#criminal-records').fadeIn(300);
       
        setTimeout(() => { $.post('https://origen_masterJob/get-cr', playerid); }, 3000);
    });

    $(document).on('click', '.delete_license', function() {
        click.play();
        bolo = JSON.stringify({ id: $(this).data('id') });
        playerid = JSON.stringify({ playerid: $('#cr-playerid').val() });
        $.post('https://origen_masterJob/delete-license', bolo);
        $('#licenses tbody').html('');
        setTimeout(() => { $.post('https://origen_masterJob/get-license', playerid); }, 100);
    });

    $(document).on('click', '.delete_billing', function() {
        click.play();
        bolo = JSON.stringify({ id: $(this).data('id') });
        playerid = JSON.stringify({ playerid: $('#cr-playerid').val() });
        $.post('https://origen_masterJob/delete-billing', bolo);
        $('#billing tbody').html('');
        setTimeout(() => { $.post('https://origen_masterJob/get-billing', playerid); }, 100);
    });

    function addNote() {
        note = JSON.stringify({ content: $('#contentNote').val(), title: $('#titleNote').val(), playerid: $('#cr-playerid').val() });
        playerid = JSON.stringify({ playerid: $('#cr-playerid').val() });
        $.post('https://origen_masterJob/add-note', note);
        $('#notes tbody').html('');
        setTimeout(() => { $.post('https://origen_masterJob/get-note', playerid); }, 100);
    }


    $(document).on('click', '.add-peligroso', function(ev) {
        click.play();
        $(".add-peligroso").removeClass("active");
        if ($(this).attr("id") == "si-peligroso") {
            $("#no-peligroso").addClass("active");
        } else {
            $("#si-peligroso").addClass("active");

        }
        addPeligroso();
        playerid = JSON.stringify({ playerid: $('#cr-playerid').val() });
    });

    $(document).on('click', '.add-buscado', function(ev) {
        click.play();
        $(".add-buscado").removeClass("active");
        if ($(this).attr("id") == "si-buscado") {
            $("#no-buscado").addClass("active");
        } else {
            $("#si-buscado").addClass("active");

        }
        addBusqueda();
        playerid = JSON.stringify({ playerid: $('#cr-playerid').val() });
    });

    $(document).on('click', '#add-federal', function(ev) {
        click.play();
        addFederal();
        playerid = JSON.stringify({ playerid: $('#cr-playerid').val() });
    });

    $(document).on('click', '#civ-back', function(ev) {
        click.play();
        $('.resultinner').fadeIn(300);
    });

    $(document).on('click', '#updateImage', function(ev) {
        click.play();
        if ($("#PlaceHolderImage").css("display") != "flex") {
            $('#PlaceHolderImage').fadeIn(300);

        } else {

            $('#PlaceHolderImage').fadeOut(300);
        }
    });

    $(document).on('click', '#setRangoJob', function(ev) {
        click.play();
        job = JSON.stringify({ name: $(this).data('jobname'), grade: $(this).data('grade') });
        $.post('https://origen_masterJob/set-rango', job);
    });

    $(document).on('click', '#firePlayer', function(ev) {
        click.play();
        job = JSON.stringify({ identifier: $(this).data('identifier'), citizenid: $(this).data('citizenid'), name: $('#nameJob').val() });
        $.post('https://origen_masterJob/fire-player', job);
        setTimeout(() => { $.post('https://origen_masterJob/get-employeesJob', job); }, 100);
    });

    $(document).on('click', '#showAppAdmin', function(ev) {
        click.play();
        if (openAppAdmin) {
            $("#miembrosGang").addClass("hide");

            if (isPolice) {
                $('#appPolice').fadeIn(300);
            } else {
                $('#appPolice').fadeOut(300);
            }
            if (isLocal) {
                $('#appNegocio').fadeIn(300);
            } else {
                $('#appNegocio').fadeOut(300);
            }
            if (isEMS) {
                $('#appEMS').fadeIn(300);
            } else {
                $('#appEMS').fadeOut(300);
            }
            if (isGang) {
                $('#appOrganizacion').fadeIn(300);
            } else {
                $('#appOrganizacion').fadeOut(300);
            }
            $('#appAdmin').fadeOut(300);
            $('#content').show();
            $('#search-plate').hide();
            $('#container').hide();
            $('#gestion-admin').hide();
            $('#search-ciudadanos').hide();
            $('#containerByC').hide();
            $('#containerCPenal').hide();
            $('#MiNegocio').hide();
            $('#MiOrganizacion').hide();
            $('#search-civilian').hide();
            $('#job-details').hide();
            openAppAdmin = false;
        } else {
            $("#miembrosGang").removeClass("hide");

            $('#appPolice').fadeIn(300);
            $('#appNegocio').fadeIn(300);
            $('#appAdmin').fadeIn(300);
            $('#appEMS').fadeIn(300);
            $('#appNegocio').fadeIn(300);
            $('#appOrganizacion').fadeIn(300);
            openAppAdmin = true;
            $.post('https://origen_masterJob/get-jobs')
        }
    });

    $(document).on('click', '#saveImagen', function(ev) {
        click.play();
        if ($('#imageUrl').val().length > 1) {
            addPhoto();
            $('#PlaceHolderImage').hide(300);
            playerid = JSON.stringify({ playerid: $('#cr-playerid').val() });
            $('#image').html(`<img src='${$('#imageUrl').val()}' class="card-img-top">`);
        } else {
            console.log('Rellena los campos');
        }
    });

    $("#Inventory").on('click', function() {
        click.play();
        $('#Rangos').removeClass('nav-link active').addClass('nav-link');
        $('#Licencias').removeClass('nav-link active').addClass('nav-link');
        $('#Lonja').removeClass('nav-link active').addClass('nav-link');
        $('#Integrantes').removeClass('nav-link active').addClass('nav-link');
        $('#Markers').removeClass('nav-link active').addClass('nav-link');
        $('#Inventory').removeClass('nav-link').addClass('nav-link active');
        $('#integrantesTable').hide();
        $('#inventoryTable').show();
        $('#newRango').hide();
        $('#rangosAll').hide();
        $('#newRangosDialog').hide();
        $('#newObjectLonja').hide();
        $('#newMarker').hide();
        $('#lonjaTable').hide();
        $('#markersTable').hide();
        $('#inventoryTable tbody').html('');
        job = JSON.stringify({ name: $('#nameJob').val() });
        $.post('https://origen_masterJob/get-inventory', job);
    });
    $("#Lonja").on('click', function() {
        click.play();
        $('#Rangos').removeClass('nav-link active').addClass('nav-link');
        $('#Licencias').removeClass('nav-link active').addClass('nav-link');
        $('#Integrantes').removeClass('nav-link active').addClass('nav-link');
        $('#Inventory').removeClass('nav-link active').addClass('nav-link');
        $('#Markers').removeClass('nav-link active').addClass('nav-link');
        $('#Lonja').removeClass('nav-link').addClass('nav-link active');
        $('#integrantesTable').hide();
        $('#inventoryTable').hide();
        $('#newRango').hide();
        $('#markersTable').hide();
        $('#lonjaTable').show();
        $('#newRangosDialog').hide();
        $('#newObjectLonja').show();
        $('#newMarker').hide();
        $('#rangosAll').hide();
        job = JSON.stringify({ name: $('#nameJob').val() });
        $.post('https://origen_masterJob/get-lonja', job);
    });
    $(document).on('click', '#editarRango', function(ev) {
        click.play();
        job = JSON.stringify({ name: $(this).data('name'), grade: $(this).data('grade'), label: $(this).data('label'), salary: $(this).data('salary') });
        table = JSON.parse(job)
        $('#nameGrade').val(table['name']);
        $('#nameGradeNumber').val(table['grade']);
        $('#nameGradeLabel').val(table['label']);
        $('#salaryGrade').val(table['salary']);
        $('#editRangosDialog').show(300);
    });

    $(document).on('click', '#deleteRango', function(ev) {
        click.play();
        rango = JSON.stringify({ grade: $('#nameGrade').val(), name: $('#nameJob').val() });
        $('#editRangosDialog').hide(300);
        $.post('https://origen_masterJob/delete-rango', rango)
        job = JSON.stringify({ name: $('#nameJob').val(), offJob: $('#offJob').val() });
        setTimeout(() => { $.post('https://origen_masterJob/get-rangosJob', job); }, 100);
    });

    $(document).on('click', '#newRango', function(ev) {
        click.play();
        $('#newRangosDialog').show(300);
    });

    $(document).on('click', '#closenewRangosDialog', function(ev) {
        click.play();
        $('#newRangosDialog').hide(300);
    });

    $(document).on('click', '#newMarker', function(ev) {
        click.play();
        $('#newMarkerDialog').show(300);
    });

    $(document).on('click', '#closenewMarkerDialog', function(ev) {
        click.play();
        $('#newMarkerDialog').hide(300);
    });

    $(document).on('click', '#savenewRango', function(ev) {
        click.play();
        rango = JSON.stringify({ name_grade: $('#newnameGrade').val(), number_grade: $('#newnameGradeNumber').val(), label: $('#newnameGradeLabel').val(), salary: $('#newsalaryGrade').val(), salaryOff: $('#salaryOffGrade').val(), job: $('#nameJob').val() });
        $('#newRangosDialog').hide(300);
        $.post('https://origen_masterJob/new-rango', rango)
        job = JSON.stringify({ name: $('#nameJob').val(), offJob: $('#offJob').val() });
        setTimeout(() => { $.post('https://origen_masterJob/get-rangosJob', job); }, 300);
    });

    $(document).on('click', '#saveEditRango', function(ev) {
        rango = JSON.stringify({ grade: $('#nameGrade').val(), name: $('#nameJob').val(), label: $('#nameGradeLabel').val(), salary: $('#salaryGrade').val() });
        $('#editRangosDialog').hide(300);
        $.post('https://origen_masterJob/edit-rango', rango)
        job = JSON.stringify({ name: $('#nameJob').val(), offJob: $('#offJob').val() });
        setTimeout(() => { $.post('https://origen_masterJob/get-rangosJob', job); }, 100);
    });

    $(document).on('click', '#saveEditMarker', function(ev) {
        marker = JSON.stringify({ id: $('#idMarker').val(), name: $('#nameJob').val(), x: $('#xMarker').val(), y: $('#yMarker').val(), z: $('#zMarker').val(), heading: $('#headingMarker').val(), type: $('#typeMarker').val() });
        $('#MarkerDialog').hide(300);
        $.post('https://origen_masterJob/edit-marker', marker)
        job = JSON.stringify({ name: $('#nameJob').val(), offJob: $('#offJob').val() });
        setTimeout(() => { $.post('https://origen_masterJob/get-markersJob', job); }, 200);
    });

    $(document).on('click', '#savenewMarker', function(ev) {
        marker = JSON.stringify({ job: $('#nameJob').val(), x: $('#newxMarker').val(), y: $('#newyMarker').val(), z: $('#newzMarker').val(), heading: $('#newheadingMarker').val(), type: $('#newtypeMarker').val() });
        $('#newMarkerDialog').hide(300);
        $.post('https://origen_masterJob/new-marker', marker)
        job = JSON.stringify({ name: $('#nameJob').val(), offJob: $('#offJob').val() });
        setTimeout(() => { $.post('https://origen_masterJob/get-markersJob', job); }, 200);
    });

    $("#closeeditRangosDialog").on('click', function() {
        $('#editRangosDialog').hide(300);
    });

    $(document).on('click', '#newObjectLonja', function(ev) {
        $('#newlonjaDialog').show(300);
    });

    $(document).on('click', '#deleteMarker', function(ev) {
        marker = JSON.stringify({ id: $('#idMarker').val(), name: $('#nameJob').val() });
        $('#MarkerDialog').hide(300);
        $.post('https://origen_masterJob/delete-marker', marker)
        job = JSON.stringify({ name: $('#nameJob').val(), offJob: $('#offJob').val() });
        setTimeout(() => { $.post('https://origen_masterJob/get-markersJob', job); }, 200);
    });

    $(document).on('click', '#closenewLonjaDialog', function(ev) {
        $('#newlonjaDialog').hide(300);
    });

    $(document).on('click', '#savenewObjectLonja', function() {
        item = JSON.stringify({ name_value: $('#newnameInternalLonja').val(), job: $('#nameJob').val(), name: $('#newnameLabelLonja').val(), price: $('#newpriceLonja').val(), type: $('#newtypeItem').val() });
        $('#newlonjaDialog').hide(300);
        $.post('https://origen_masterJob/new-objectLonja', item);
        job = JSON.stringify({ name: $('#nameJob').val() });
        setTimeout(() => { $.post('https://origen_masterJob/get-lonja', job); }, 200);
    });

    $("#Rangos").on('click', function() {
        $('#Integrantes').removeClass('nav-link active').addClass('nav-link');
        $('#Licencias').removeClass('nav-link active').addClass('nav-link');
        $('#Lonja').removeClass('nav-link active').addClass('nav-link');
        $('#Inventory').removeClass('nav-link active').addClass('nav-link');
        $('#Markers').removeClass('nav-link active').addClass('nav-link');
        $('#Rangos').removeClass('nav-link').addClass('nav-link active');
        $('#integrantesTable').hide();
        $('#newRangosDialog').hide();
        $('#inventoryTable').hide();
        $('#lonjaTable').hide();
        $('#markersTable').hide();
        $('#criminal-records tbody').html('');
        $('#rangosAll').show()
        $('#newRango').show();
        $('#newObjectLonja').hide();
        $('#newMarker').hide();
        job = JSON.stringify({ name: $('#nameJob').val(), offJob: $('#offJob').val() });
        $.post('https://origen_masterJob/get-rangosJob', job);
    });
    $("#Integrantes").on('click', function() {
        $('#Rangos').removeClass('nav-link active').addClass('nav-link');
        $('#Licencias').removeClass('nav-link active').addClass('nav-link');
        $('#Lonja').removeClass('nav-link active').addClass('nav-link');
        $('#Inventory').removeClass('nav-link active').addClass('nav-link');
        $('#Markers').removeClass('nav-link active').addClass('nav-link');
        $('#Integrantes').removeClass('nav-link').addClass('nav-link active');
        $('#integrantesTable').show();
        $('#newRangosDialog').hide();
        $('#inventoryTable').hide();
        $('#lonjaTable').hide();
        $('#markersTable').hide();
        $('#rangosAll').hide();
        $('#newRango').hide();
        $('#newObjectLonja').hide();
        $('#newMarker').hide();
        job = JSON.stringify({ name: $('#nameJob').val(), offJob: $('#offJob').val() });
        $.post('https://origen_masterJob/get-employeesJob', job);
    });
    $("#Markers").on('click', function() {
        $('#Rangos').removeClass('nav-link active').addClass('nav-link');
        $('#Licencias').removeClass('nav-link active').addClass('nav-link');
        $('#Lonja').removeClass('nav-link active').addClass('nav-link');
        $('#Inventory').removeClass('nav-link active').addClass('nav-link');
        $('#Integrantes').removeClass('nav-link active').addClass('nav-link');
        $('#Markers').removeClass('nav-link').addClass('nav-link active');
        $('#integrantesTable').hide();
        $('#inventoryTable').hide();
        $('#lonjaTable').hide();
        $('#markersTable').show();
        $('#newRangosDialog').hide();
        $('#rangosAll').hide();
        $('#newRango').hide();
        $('#newObjectLonja').hide();
        $('#newMarker').show();
        job = JSON.stringify({ name: $('#nameJob').val(), offJob: $('#offJob').val() });
        $.post('https://origen_masterJob/get-markersJob', job);
    });

    $(document.body).on('click', '.card[data-clickable=true]', (e) => {
        card = JSON.stringify({ id: $(e.currentTarget).data('id'), name: $(e.currentTarget).data('name'), lastname: $(e.currentTarget).data('lastname') });
        table = JSON.parse(card)
        $('#search').val(table['name'] + ' ' + table['lastname'])
        $('#search-ciudadanos').show();
        $('#containerByC').hide();
        setTimeout(() => {
            searchPlayer();
            $.post('https://origen_masterJob/open-FichaSujeto', card)
        }, 100);
    });

    function addPeligroso() {
        note = JSON.stringify({ playerid: $('#cr-playerid').val() });
        $.post('https://origen_masterJob/add-peligroso', note);
    }

    function addBusqueda() {
        note = JSON.stringify({ playerid: $('#cr-playerid').val() });
        $.post('https://origen_masterJob/add-busqueda', note);
    }

    function addFederal() {
        note = JSON.stringify({ playerid: $('#cr-playerid').val() });
        $.post('https://origen_masterJob/add-federal', note);
    }

    function addPhoto() {
        note = JSON.stringify({ url: $('#imageUrl').val(), playerid: $('#cr-playerid').val() });
        $.post('https://origen_masterJob/add-photo', note);
    }

    function searchPlate() {
        plate = JSON.stringify({ plate: $('#searchPlateInput').val() });
        $.post('https://origen_masterJob/search-plate', plate);
    }

});

var isOnTab = false
var openAppAdmin = false
var isPolice = false
var isEMS = false
var isLocal = false
var isGang = false
var gangLevel = 0
var gangRespect = 0

document.onkeydown = function(data) {
    if ((data.which == 13 || data.which == 27) && isOnTab) { // || data.which == 8
        $.post('https://origen_masterJob/exit');
        hideCadSystem();
    }
};

$(function() {
    function ShowNotif(data) {
        let imagen = "";

        if (data.type === 'baduabierto') {
            imagen = "https://cdn.discordapp.com/attachments/748274405620056111/835296187145257010/comestibles.png";
        } else if (data.type === 'polidispo') {
            imagen = "https://media.discordapp.net/attachments/964949852775677984/965606796158963712/Policia_Nacional_Apex_Roleplay.png?width=676&height=676";
        } else if (data.type === 'polinodispo') {
            imagen = "https://media.discordapp.net/attachments/964949852775677984/965606796158963712/Policia_Nacional_Apex_Roleplay.png?width=676&height=676";
        } else if (data.type === 'poliencamino') {
            imagen = "https://media.discordapp.net/attachments/964949852775677984/965606796158963712/Policia_Nacional_Apex_Roleplay.png?width=676&height=676";
        } else if (data.type === 'baducerrado') {
            imagen = "https://cdn.discordapp.com/attachments/748274405620056111/835296187145257010/comestibles.png";
        } else if (data.type === 'crdispo') {
            imagen = "https://media.discordapp.net/attachments/964949852775677984/975806922877988898/ambulance.png";
        } else if (data.type === 'crnodispo') {
            imagen = "https://media.discordapp.net/attachments/964949852775677984/975806922877988898/ambulance.png";
        } else if (data.type === 'bennysabierto') {
            imagen = "https://media.discordapp.net/attachments/964949852775677984/975828340298612766/unknown.png";
        } else if (data.type === 'bennyscerrado') {
            imagen = "https://media.discordapp.net/attachments/964949852775677984/975828340298612766/unknown.png";
        } else if (data.type === 'lscabiertos') {
            imagen = "https://media.discordapp.net/attachments/964949852775677984/975828340298612766/unknown.png";
        } else if (data.type === 'lsccerrados') {
            imagen = "https://media.discordapp.net/attachments/964949852775677984/975828340298612766/unknown.png";
        } else if (data.type === 'aiabierto') {
            imagen = "https://media.discordapp.net/attachments/964949852775677984/975830976037007400/unknown.png";
        } else if (data.type === 'aicerrado') {
            imagen = "https://media.discordapp.net/attachments/964949852775677984/975830976037007400/unknown.png";
        }
        
        if ($("#toast").css("display") != "block") {
            anuncio.play();
            $("#image2").attr("src", imagen);
            $("#toast #desc").text(data.text);
            $("#toast").addClass("animacion-toast").show();
            setTimeout(function() {
                $("#toast").animate({ width: "35vh" }, 500);

            }, 700);
            setTimeout(function() {

                $("#toast").removeClass("animacion-toast").animate({ width: "60px" }, 500, function() {
                    $("#toast").fadeOut(300);

                });

            }, 4000);
        }


    }
    var myChart2 = null
    window.addEventListener('message', function(event) {

        if (event.data.type == "gang") {
            $(".weapon").remove()
            $(".item").remove()
            if (myChart2 != null) {
                myChart2.destroy();
            }

            $(".mission").remove()
            $(".veh").remove()
            $(".gangmember").remove()
            $("#ganghours").html(event.data.hours + "h")
            for (var i = 0; i < event.data.vehicles.length; i++) {
                $("#gangvehs").append(`
                    <li class="list-group-item list-group-item-action veh" id="veh"><i class="fas fa-car"></i> ${event.data.vehicles[i]['vehicle']}</li>
                `)
            }
            $("#gangName").html(event.data.gangName)
            for (var i = 0; i < event.data.zones.length; i++) {
                $("#" + event.data.zones[i]).css("opacity", 1);
            }

            var weekdrugs = Math.round((event.data.weekdrugs / 1000 + Number.EPSILON) * 100) / 100
            var monthdrugs = Math.round((event.data.monthdrugs / 1500 + Number.EPSILON) * 100) / 100

            $('#circulo-1').circleProgress({
                value: weekdrugs,
                size: 150,
                fill: '#000000',
                thickness: 30

            });
            $('#circulo-2').circleProgress({
                value: monthdrugs,
                size: 150,
                fill: '#000000',
                thickness: 30
            });
            var drugs = event.data.daydrugs
            setTimeout(() => {
                $("#gangMoney").html(event.data.gangmoney + "$")
                var ctx2 = document.getElementById('grafico-organizacion');
                myChart2 = new Chart(ctx2, {
                    type: 'line',
                    data: {
                        labels: event.data.dates,
                        datasets: [{
                            label: 'Venta de droga',
                            data: drugs,
                            backgroundColor: [
                                'rgba(0, 0, 0)',
                                'rgba(0, 0, 0)',
                                'rgba(0, 0, 0)',
                                'rgba(0, 0, 0)',
                                'rgba(0, 0, 0)',
                                'rgba(0, 0, 0)'
                            ],
                            borderColor: [
                                'rgba(0, 0, 0)',
                                'rgba(0, 0, 0)',
                                'rgba(0, 0, 0)',
                                'rgba(0, 0, 0)',
                                'rgba(0, 0, 0)',
                                'rgba(0, 0, 0)'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
                for (var i = 0; i < event.data.inventory.length; i++) {
                    if (event.data.inventory[i]['type'] == "item") {
                        $("#almacen").append(`
                        
                        <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action item" id="item">
                        <span><i class="fas fa-angle-double-right"></i> ${event.data.inventory[i]['label']}</span>
                        <span class="badge badge-secondary badge-pill">${event.data.inventory[i]['amount']}</span>
                        </li>
    
                        `)
                    }
                    if (event.data.inventory[i]['type'] == "weapon") {
                        $("#armas").append(`
                        
                        <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action weapon" id="weapon">
                        <span><i class="fas fa-angle-double-right"></i> ${event.data.inventory[i]['label']}</span>
                        <span class="badge badge-secondary badge-pill">${event.data.inventory[i]['amount']}</span>
                        </li>
    
                        `)
                    }

                }
                for (var i = 0; i < event.data.members.length; i++) {
                    $("#gangmembers").append(`
                    
                    <li id="gangmember" class="list-group-item d-flex justify-content-between align-items-center gangmember list-group-item-action"><span><i class="fas fa-user"></i> ${event.data.members[i]['name']}</span> <span><span class="badge badge-secondary zona-rango">Rango ${event.data.members[i]['rank']}</span><button class="btn btn-secondary btn-sm ml-2 gestionar" data-id="2" data-rango="${event.data.members[i]['rank']}"><i class="fas fa-user-cog"></i></button>
                        <div class="zona-gestion">
                            <div class="text-center"> RANGO</div>
                            <div><input type="text" class="rank-banda" value="${event.data.members[i]['rank']}"><button id="upgangrank" license="${event.data.members[i]['license']}" class="btn btn-secondary btn-sm upgangrank"><i class="fas fa-check"></i></button></div> <button class="btn btn-secondary btn-sm despedirbanda" id="buttondespedirbanda" license="${event.data.members[i]['license']}">Despedir</button></div>
                        </span>
                        </span>
                    </li>
                    
                    `)
       
                    if (i == event.data.members.length - 1) {
                        $(".gestionar-trabajadores .gestionar").off("click").on("click", function() {

                            var contenedor = $(this).parent().find(".zona-gestion");
                            if (contenedor.css("display") == "none") {
                                $(".zona-gestion").hide();
                                contenedor.find("input").val($(this).attr('data-rango'));
                                contenedor.fadeIn(300);
                            } else {
                                contenedor.addClass("scale-out").fadeOut(300, function() {
                                    $(this).removeClass("scale-out");
                                });
                            }



                        });
                    }
                }
                //console.log(event.data.missions)
                $("#misiones-organizacion").html('');
                $("#MisionesBloqueadas").html('');

                if (event.data.missions.length != 0) {
                    event.data.missions.forEach(function(mission, i) {
                        if (!mission.complete) {


                            if (mission.level == parseInt($("#ganglevel").text())) {
                                $("#misiones-organizacion").append(`
                                <a href="#" class="list-group-item list-group-item-action">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1"><i class="fas fa-exclamation-circle"></i> ${mission.title}</h5>
                                        </div>
                                        <p class="mb-1 text-muted">${mission.description}</p>

                                    </a>
                            `);
                            } else if (mission.level > parseInt($("#ganglevel").text())) {

                                $("#MisionesBloqueadas").append(`
                                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary">
                                    <span><i class="fas fa-angle-double-right"></i> ${mission.title}</span>
                                    <span class="text-muted">Nivel ${mission.level}</span>
                                </li>
                                `);
                            }
                        } else {
                            $("#misiones-organizacion").append(`
                            <a href="#" class="list-group-item list-group-item-action tachar disabled">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1"><i class="fas fa-exclamation-circle"></i> ${mission.title}</h5>
                                    </div>
                                    <p class="mb-1 text-muted">${mission.description}</p>

                                </a>
                        `);
                        }
                    });
                } else {
                    $("#misiones-organizacion").append(`
                    <a href="#" class="list-group-item list-group-item-action">
                        
                        <p class="mb-1 text-muted">No hay misiones disponibles</p>

                    </a>
                    `);
                }

                gangNearPlys = event.data.nearPeople
                $(".upgangrank").off("click").on("click", function() {
                    $(this).parent().parent().addClass("scale-out");
                    $(this).parent().parent().parent().find(".zona-rango").text("Rango "+$(this).parent().find(".rank-banda").val());
                    $(this).parent().parent().parent().find(".gestionar").attr( "data-rango", $(this).parent().find(".rank-banda").val());
                    $.post("https://origen_masterJob/updateGrade", JSON.stringify({
                        license: $(this).attr('license'),
                        rank: $(this).parent().find(".rank-banda").val()
                    }))
                    
                })
                $(".despedirbanda").off("click").on('click', function() {
                    $.post("https://origen_masterJob/despedirbanda", JSON.stringify({
                        license: $(this).attr('license')
                    }))
                    $(this).parent().parent().parent().remove()
                })

                $("#gangBlackMoney").html(event.data.blackmoney + "$");

            }, 3000);

            if (event.data.pWars.length != 0) {
                $("#ZonaSolicitudGuerra").append(`
                <div class="shadow-sm rounded bg-white m-2 p-3 text-center">

                <h5><i class="fas fa-exclamation-circle"></i> <span id="NOrganizacionGuerraSolicitada">La banda ${event.data.pWars[0]}</span> han solicitado iniciar una guerra contra tu organización</h5>
                    </br>
                <button gang="${event.data.pWars}" class="btn btn-secondary aceptar-guerra">Aceptar</button><button class="btn btn-secondary rechazar-guerra">Rechazar</button>  

                </div>
                
                `)
                $(".aceptar-guerra").on("click", function() {
                    $.post("https://origen_masterJob/acpG", JSON.stringify({
                        gang: $(".aceptar-guerra").attr('gang')
                    }))

                })
            }

            gangRespect = event.data.respect
            const nextLevel = event.data.level + 1
            $("#progress-bar-respeto").html(event.data.respect + "%")
            $("#ganglevel").html(event.data.level)
            $("#gangActualLevel").html("Nivel " + Math.round(event.data.level - 0.5))
            $("#actualNextLevel").html("Nivel " + Math.round(event.data.level + 0.5))
            gangLevel = (event.data.level % 1).toFixed(2)
        }

        if (event.data.civilianresults) {
            $(".all-found-users").hide();
            $(".resultinner .no-results").fadeOut();
            $('.tbody-result-users').remove();
            $('.all-found-users').append($('<tbody class="tbody-result-users">'));
            event.data.civilianresults.forEach(function(user) {
                $('.tbody-result-users').append($('<tr>').on('click', function() {
                        showExtraUserData(user);
                    })
                    .append($('<td>').text(user['firstname']))
                    .append($('<td>').text(user['lastname']))
                    .append($('<td>').text(user['birthdate']))
                    .append($('<td>').text(user['phone'])));
            })
            $(".all-found-users").fadeIn(300);
        } else {
            $(".all-found-users").hide();
            $(".resultinner .no-results").fadeIn(300);

        }

        if (event.data.civilianresultsEMS) {
            $(".all-found-users-ems").hide();
            $(".no-results-pacientes").hide();
            $('.tbody-result-users').remove();
            $('.all-found-users-ems').append($('<tbody class="tbody-result-users">'));
            event.data.civilianresultsEMS.forEach(function(user) {
                $('.tbody-result-users').append($('<tr>').on('click', function() {
                        showExtraUserDataEMS(user);
                    })
                    .append($('<td>').text(user['firstname']))
                    .append($('<td>').text(user['lastname']))
                    .append($('<td>').text(user['birthdate']))
                    .append($('<td>').text(user['phone'])));
            })
            $(".all-found-users-ems").fadeIn(300);
        } else {
            $(".all-found-users-ems").hide();
            $(".no-results-pacientes").fadeIn(300);

        }

        if (event.data.type2 == "anuncios") {
            ShowNotif(event.data);
        };

        if (event.data.bycresults) {
            event.data.bycresults.forEach(function(user) {
                $("#fichasSujetos").append(`<div class="card sujeto shadow-sm bg-white" data-clickable="true" data-id="${user.identifier}" data-name="${user.firstname}" data-lastname="${user.lastname}" style="width: 18rem; margin-left: 20px; margin-top: 20px;">
                <img style="min-height: 300px; min-widht: 300px; max-height: 300px; max-widht: 300px;" class="card-img-top" src=${user.image}>
                <div class="card-body">
                    <h5 style="text-align:center" class="card-title">${user.firstname + '  ' + user.lastname}</h5>
                    <p style="text-align:center">${'Deuda total: $' + user.deudaTotal}</p>
                </div>
                </div>`);
            })
        }

        if (event.data.openTablet === true) {
            showCadSystem();
        }

        if (event.data.bycOpenFicha) {
            $('.tbody-result-users').remove();
            $('.all-found-users').append($('<tbody class="tbody-result-users">'));
            event.data.bycOpenFicha.forEach(function(user) {
                showExtraUserData(user);
            })
        }

        if (event.data.showPoliceApp === true) {
            $('#appPolice').show();
            $('#appAdmin').hide();
            $('#showButtonAdmin').hide();
            isPolice = true;
        }

        if (event.data.showLocalApp === true) {
            $('#appNegocio').show();
            $('#appAdmin').hide();
            $('#showButtonAdmin').hide();
            isLocal = true;
        }

        if (event.data.showEMSApp === true) {
            $('#appEMS').show();
            $('#appAdmin').hide();
            $('#showButtonAdmin').hide();
            isEMS = true;
        }
        if (event.data.showGangApp === true) {
            $('#appOrganizacion').show();
            $('#appAdmin').hide();
            $('#showButtonAdmin').hide();
            isGang = true;
        }

        if (event.data.showEMSApp === false) {

            $('#appEMS').hide();
            $('#appAdmin').hide();
            $('#showButtonAdmin').hide();
            isEMS = true;
        }
        if (event.data.showGangApp === false) {

            $('#appOrganizacion').hide();
            $('#appAdmin').hide();
            $('#showButtonAdmin').hide();
            isGang = false;
        }

        if (event.data.showPoliceApp === false) {
            $('#appPolice').hide();
            $('#appAdmin').hide();
            $('#showButtonAdmin').hide();
            isPolice = false;


        }

        if (event.data.showLocalApp === false) {
            $('#appAdmin').hide();
            $('#showButtonAdmin').hide();
            $('#appNegocio').hide();
            isLocal = false;


        }
        setTimeout(() => {
            if (event.data.isGang) {

                if (event.data.isGang === true) {
                    $('.mi-org').fadeIn(500);
                    isGang = true;
                }
            }
            if (event.data.gangBoss != undefined) {


                if (event.data.gangBoss === true) {

                    $("#miembrosGang").removeClass("hide");
                } else {

                    $("#miembrosGang").addClass("hide");
                }

            }


        }, 2500);


        if (event.data.isAdmin === 'adminpolice') {
            if (openAppAdmin) {
                $('#appPolice').fadeIn(300);
                $('#appAdmin').fadeIn(300);
                $('#appNegocio').fadeIn(300);
                $('#appOrganizacion').fadeIn(300);
                $('#showButtonAdmin').fadeIn(300);
                isPolice = true;
                isLocal = false;
                isEMS = false;
                isGang = false;
            } else {
                $('#appPolice').fadeIn(300);
                $('#appAdmin').hide();
                $('#appNegocio').hide();
                $('#appOrganizacion').hide();
                $('#appEMS').hide();
                $('#showButtonAdmin').fadeIn(300);
                isPolice = true;
                isLocal = false;
                isEMS = false;
                isGang = false;
            }
        }

        if (event.data.isAdmin === 'adminlocal') {
            if (openAppAdmin) {
                $('#appPolice').fadeIn(300);
                $('#appAdmin').fadeIn(300);
                $('#appNegocio').fadeIn(300);
                $('#appOrganizacion').fadeIn(300);
                $('#showButtonAdmin').fadeIn(300);
                isLocal = true;
                isEMS = false;
                isGang = false;
                isPolice = false;
            } else {
                $('#appPolice').hide();
                $('#appOrganizacion').hide();
                $('#appNegocio').fadeIn(300);
                $('#appAdmin').hide();
                $('#appEMS').hide();
                $('#showButtonAdmin').fadeIn(300);
                isLocal = true;
                isEMS = false;
                isGang = false;
                isPolice = false;
            }
        }

        if (event.data.isAdmin === 'adminbanda') {
            if (openAppAdmin) {
                $('#appPolice').fadeIn(300);
                $('#appAdmin').fadeIn(300);
                $('#appNegocio').fadeIn(300);
                $('#appOrganizacion').fadeIn(300);
                $('#showButtonAdmin').fadeIn(300);
                isLocal = false;
                isEMS = false;
                isGang = true;
                isPolice = false;
            } else {
                $('#appPolice').hide();
                $('#appNegocio').hide();
                $('#appOrganizacion').fadeIn(300);
                $('#appAdmin').hide();
                $('#appEMS').hide();
                $('#showButtonAdmin').fadeIn(300);
                isLocal = false;
                isEMS = false;
                isGang = true;
                isPolice = false;
            }
        }

        if (event.data.isAdmin === 'adminambulance') {
            if (openAppAdmin) {
                $('#appPolice').fadeIn(300);
                $('#appAdmin').fadeIn(300);
                $('#appNegocio').fadeIn(300);
                $('#appOrganizacion').fadeIn(300);
                $('#showButtonAdmin').fadeIn(300);
                isLocal = false;
                isEMS = true;
                isGang = false;
                isPolice = false;
            } else {
                $('#appPolice').hide();
                $('#appNegocio').hide();
                $('#appAdmin').hide();
                $('#appOrganizacion').hide();
                $('#appEMS').fadeIn(300);
                $('#showButtonAdmin').fadeIn(300);
                isLocal = false;
                isEMS = true;
                isGang = false;
                isPolice = false;
            }
        }

        if (event.data.isAdmin === 'adminlocalambulance') {
            if (openAppAdmin) {
                $('#appPolice').fadeIn(300);
                $('#appAdmin').fadeIn(300);
                $('#appNegocio').fadeIn(300);
                $('#appOrganizacion').fadeIn(300);
                $('#showButtonAdmin').fadeIn(300);
                isLocal = true;
                isEMS = true;
                isGang = false;
                isPolice = false;
            } else {
                $('#appPolice').hide();
                $('#appOrganizacion').hide();
                $('#appNegocio').fadeIn(300);
                $('#appAdmin').hide();
                $('#appEMS').fadeIn(300);
                $('#showButtonAdmin').fadeIn(300);
                isLocal = true;
                isGang = false;
                isEMS = true;
                isPolice = false;
            }
        }

        if (event.data.isAdmin === 'admin') {
            if (openAppAdmin) {
                $('#appPolice').fadeIn(300);
                $('#appAdmin').fadeIn(300);
                $('#appNegocio').fadeIn(300);
                $('#appOrganizacion').fadeIn(300);
                $('#showButtonAdmin').fadeIn(300);
                isPolice = false;
                isEMS = false;
                isGang = false;
                isLocal = false;
            } else {
                $('#appPolice').hide();
                $('#appOrganizacion').hide();
                $('#appAdmin').hide();
                $('#appNegocio').hide();
                $('#appEMS').hide();
                $('#showButtonAdmin').fadeIn(300);
                isPolice = false;
                isLocal = false;
                isGang = false;
                isEMS = false;
            }
        }

        if (event.data.crresults) {
            createTableCr(event.data.crresults);
        }

        if (event.data.crresultsambulance) {
            createTableCrAmbulance(event.data.crresultsambulance);
        }

        if (event.data.licenseResults) {
            createTableLicense(event.data.licenseResults);
        }

        if (event.data.itemsResults) {
            createTableItems(event.data.itemsResults);
        }

        if (event.data.resultCoords) {
            setCoordsEditMarker(event.data.resultCoordsX, event.data.resultCoordsY, event.data.resultCoordsZ, event.data.resultCoordsHeading);
        }

        if (event.data.lonjaResults) {
            createTableLonja(event.data.lonjaResults);
        }

        if (event.data.markersResults) {
            createTableMarkers(event.data.markersResults);
        }

        if (event.data.dataJobResults) {
            editInfoJobs(event.data.Blip, event.data.Sprite, event.data.labelBlip, event.data.typeLocal, event.data.colorBlip, event.data.xBlip, event.data.yBlip, event.data.zBlip);
        }

        if (event.data.jobsResults) {
            createTableJobs(event.data.jobsResults);
        }

        if (event.data.inventoryResults) {
            createTableInventory(event.data.inventoryResults);
        }

        if (event.data.action === 'nearPlayers') {
            SendNearPlayers(event.data.players);
        }

        if (event.data.action === 'nearPlayersPandilla') {
            SendNearPlayersPandilla(event.data.players);
        }

        if (event.data.rangosResults) {
            createTableRangos(event.data.rangosResults);
        }

        if (event.data.MSGPurchase) {
            sendMessagePurchaseVehicle(event.data.MSGPurchase)
        }

        if (event.data.countEmpleados) {
            $('.count').text(event.data.countEmpleados);
        }

        if (event.data.infoJob) {
            changeInfoJobs(event.data.infoJob);
        }

        if (event.data.EmpleadosResults) {
            createTableEmployees(event.data.EmpleadosResults);
        }

        if (event.data.billingResults) {
            createTableBilling(event.data.billingResults);
        }

        if (event.data.plate) {
            $('#plate').empty().append(event.data.plate);
            $('#model').empty().append(event.data.model);
            $('#firstname').empty().append(event.data.firstname);
            $('#lastname').empty().append(event.data.lastname);
            $(".no-results-vehiculos").fadeOut(300, function() {
                $(".all-found-plates").fadeIn(300);
            });
        }

        if (event.data.deuda) {
            $('.deuda').text('Deuda: $' + event.data.deuda);
        }

        if (event.data.vehiclesResults) {
            createTableVehicles(event.data.vehiclesResults);
        }

        if (event.data.noteResults) {
            createNoteTable(event.data.noteResults);
        }

        if (event.data.sendInfoBussiness === true) {
            sendInfoBussiness(event.data.employees, event.data.societyMoney, event.data.level, event.data.time, event.data.onDutyEmployees, event.data.totalOnDuty, event.data.jobLabel, event.data.inventoryBussiness, event.data.totalBilling, event.data.vehicles, event.data.typeLocal);
        }

    });
});

dinerof = 0;
tiempof = 0;

function copiar(articulo, precio, tiempo) {
    document.getElementById("texto").innerHTML += document.getElementById(articulo).innerHTML + ' ' + '\n';
    dinero = document.getElementById(precio).innerHTML;
    tiempo = document.getElementById(tiempo).innerHTML;
    dinerof = parseInt(dinerof) + parseInt(dinero);
    tiempof = parseInt(tiempof) + parseInt(tiempo);
    document.getElementById("prueba").innerHTML = "Total: $" + dinerof + " / Meses: " + tiempof;
}

function changeInfoJobs(data) {
    $('#spriteJobBlip').val('');
    $('#colorBlipJob').val('');
    $('#labelBlipJob').val('');
    $('#xBlipJob').val('');
    $('#yBlipJob').val('');
    $('#zBlipJob').val('');
    $('#typeLocal').val('');
    data.forEach(function(datag) {
        $('#spriteJobBlip').val(datag.Sprite);
        $('#colorBlipJob').val(datag.colorBlip);
        $('#labelBlipJob').val(datag.labelBlip);
        $('#xBlipJob').val(datag.xBlip);
        $('#yBlipJob').val(datag.yBlip);
        $('#zBlipJob').val(datag.zBlip);
        $('#typeLocal').val(datag.typeLocal);
    })
}

function setCoordsEditMarker(x, y, z, heading) {
    $('#xMarker').val(x);
    $('#yMarker').val(y);
    $('#zMarker').val(z);
    $('#headingMarker').val(heading);
    $('#newxMarker').val(x);
    $('#newyMarker').val(y);
    $('#newzMarker').val(z);
    $('#newheadingMarker').val(heading);
    $('#xBlipJob').val(x);
    $('#yBlipJob').val(y);
    $('#zBlipJob').val(z);
}

function borrar() {
    document.getElementById("texto").innerHTML = "";
    dinerof = 0;
    tiempof = 0
    document.getElementById("prueba").innerHTML = "Total: $" + dinerof + " / Meses: " + tiempof;
}

function sendBills(id) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(id).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    let textarea = document.getElementById("texto");
    textarea.focus();
    bills = JSON.stringify({ dinero: dinerof, tiempo: tiempof, bills: $('#texto').val(), identifier: $('#cr-playerid').val(), license: $('#cr-license').val(), name: userName });
    $.post('https://origen_masterJob/send-bills', bills);
    borrar();
    playerid = JSON.stringify({ playerid: $('#cr-playerid').val(), license: $('#cr-license').val() });
    $("#cargando-multas").show();
    $("#criminal-records .sin-datos").hide();
    $('#container').fadeOut(300, function() {
        $('.resultinner').fadeOut(300, function() {
            $('#search-ciudadanos').fadeIn(300);
            $('.civilian-details').fadeIn(300);

        });
    });



    setTimeout(() => {
        $.post('https://origen_masterJob/get-cr', playerid);
        $.post('https://origen_masterJob/get-billing', playerid);
    }, 100);
}

function searchPlayer() {
    search = JSON.stringify({ search: $('#search').val() });
    if ($('#search').val().length > 2) {
        $.post('https://origen_masterJob/search-players', search);
    } else {
        console.log('Pon un nombre');
    }
}

function searchPlayerEMS() {
    search = JSON.stringify({ search: $("#searchPacienteInput").val() });

    if (search.length > 2) {
        $.post('https://origen_masterJob/search-patients', search);
        //CAMBIAR POR POST PARA EMS


    } else {
        console.log('Pon un nombre');
    }
}

function createTableCr(crresults) {

    $('#criminal-records tbody').html('');
    $("#criminal-records .sin-datos").hide();
    let pagada = '<h5 class="text-center"><i class="fas fa-times"></i></h5>';
    let total = 0;
    if (crresults.length > 0) {
        crresults.forEach(function(cr, i) {
            
            
            if (cr['paied']) {
                pagada = '<h5 class="text-center"><i class="fas fa-check"></i></h5>';
            } else {
                pagada = '<h5 class="text-center"><i class="fas fa-times"></i></h5>';
                total+=parseInt(cr['fine']);
            }
            cr['id'] = i
            $('#criminal-records tbody').append($('<tr>')
                .append($('<td>').html(pagada))
                .append($('<td>').text(cr['reason']))
                .append($('<td class="text-center">').text(cr['fine'] + "$"))
                .append($('<td class="text-center">').text(cr['time']))
                .append($('<td>').text(cr['created_at']))
                // .append($('<td>').text(new Date(cr['created_at']).toLocaleString('en-GB')))
                .append($('<td>').text(cr['officerName']))
                .append($('<td>').append($('<button class="delete_cr btn btn-sm btn-secondary float-right" data-id="' + cr['identification'] + '">').html('<i class="fas fa-trash"></i>'))));
            if(i==crresults.length-1){
                $("#totalMultas").text(total);
                $(".zonaTotalMultas").fadeIn(300);
            }
            
        })
        $("#cargando-multas").fadeOut(300, function() {
            $("#multas").fadeIn(300);

        });
    } else {
        $("#criminal-records .sin-datos").fadeIn(300);

    }


}

function createTableCrAmbulance(crresultsambulance) {
    $('#listado-facturas-ems tbody').html('');
    $("#listado-facturas-ems .sin-datos").hide();
    let pagada = '<h5 class="text-center"><i class="fas fa-times"></i></h5>';

    if (crresultsambulance.length > 0) {
        crresultsambulance.forEach(function(cr) {
            if (cr['paied']) {
                pagada = '<h5 class="text-center"><i class="fas fa-check"></i></h5>';
            } else {
                pagada = '<h5 class="text-center"><i class="fas fa-times"></i></h5>';
            }
            $('#listado-facturas-ems tbody').append($('<tr>')
                .append($('<td>').html(pagada))
                .append($('<td>').text(cr['reason']))
                .append($('<td class="text-center">').text(cr['fine'] + "$"))
                .append($('<td>').text(cr['created_at']))
                // .append($('<td>').text(new Date(cr['created_at']).toLocaleString('en-GB')))
                .append($('<td>').text(cr['emsName'])));
            // .append($('<td>').append($('<span class="delete_cr" data-id="' + cr['id'] + '">').text('X'))));
        })
        $("#cargando-facturas").fadeOut(300, function() {
            $("#tabla-facturas").fadeIn(300);

        });
    } else {
        $("#listado-facturas-ems .sin-datos").fadeIn(300);

    }


}

function createTableLicense(licenseResults) {
    licenseResults.forEach(function(license) {
        $('#licenses tbody').append($('<tr>')
            .append($('<td>').text(license['type']))
            .append($('<td>').append($('<span class="delete_license" data-id="' + license['id'] + '">').text('X')))
        );
    })
}

function createTableVehicles(vehiclesResults) {
    $(".zonaTotalMultas").hide();

    vehiclesResults.forEach(function(vehicles) {
        $('#vehicles tbody').append($('<tr>')
            .append($('<td>').text(vehicles['plate']))
            .append($('<td>').text(vehicles['modelo']))
            .append($('<td>').text(vehicles['garage_name']))
            .append($('<td>').text(vehicles['stored']))
            .append($('<td>').append($('<button id="confiscate-vehicle" class="btn btn-dark btn-sm" data-plate="' + vehicles['plate'] + '">Confiscar</button>')))
        );
        $("#cargando-vehiculos").fadeOut(300, function() {
            $("#lista-vehiculos").fadeIn(300);

        });

    })
}

function createTableBilling(billingResults) {
    $('#billing tbody').html('');
    billingResults.forEach(function(billing) {
        $('#billing tbody').append($('<tr>')
            .append($('<td>').text(billing['label']))
            .append($('<td>').text(billing['amount']))
            .append($('<td>').text(new Date(billing['created_at']).toLocaleString('en-GB')))
            // .append($('<td>').append($('<span class="delete_billing" data-id="' + billing['id'] + '">').text('X')))
        );
    })
}

function createTableItems(itemsResults) {
    $('#item tbody').html('');
    itemsResults.forEach(function(items) {
        $('#item tbody').append($('<tr>')
            .append($('<td>').text(items['name']))
            .append($('<td>').text(items['label']))
            .append($('<td>').append($('<button id="gestionarItem" class="btn btn-secondary btn-sm" data-weight="' + items['weight'] + '" data-label="' + items['label'] + '" data-id="' + items['name'] + '">Editar</button>')))
        );
    })
}

function createTableLonja(lonjaResults) {
    $('#lonjaTable tbody').html('');
    lonjaResults.forEach(function(lonja) {
        $('#lonjaTable tbody').append($('<tr>')
            .append($('<td>').text(lonja['name']))
            .append($('<td>').text(lonja['label']))
            .append($('<td>').text(lonja['type']))
            .append($('<td>').text(lonja['price']))
            .append($('<td>').append($('<button id="editLonjaItem" class="btn btn-secondary btn-sm" data-price="' + lonja['price'] + '" data-name="' + lonja['name'] + '" data-label="' + lonja['label'] + '" data-type="' + lonja['type'] + '">Editar</button>')))
        );
    })
}

function createTableMarkers(markersResults) {
    $('#markersTable tbody').html('');
    markersResults.forEach(function(markers) {
        $('#markersTable tbody').append($('<tr>')
            .append($('<td>').text(markers['labeltype']))
            .append($('<td>').text(" x: " + markers['x'] + " y: " + markers['y'] + " z: " + markers['z']))
            .append($('<td>').append($('<button id="editJobMarker" class="btn btn-secondary btn-sm" data-coordheading="' + markers['heading'] + '" data-coordy="' + markers['y'] + '" data-coordz="' + markers['z'] + '" data-id="' + markers['idMarker'] + '" data-type="' + markers['type'] + '" data-coordx="' + markers['x'] + '">Editar</button>')))
            .append($('<td>').append($('<button id="tpJobMarker" class="btn btn-dark btn-sm" data-coordy="' + markers['y'] + '" data-coordz="' + markers['z'] + '" data-type="' + markers['type'] + '" data-coordx="' + markers['x'] + '">Tp</button>')))
        );
    })
}

function createTableJobs(jobsResults) {
    $('#jobs tbody').html('');
    jobsResults.forEach(function(jobs) {
        $('#jobs tbody').append($('<tr>')
            .append($('<td>').text(jobs['name']))
            .append($('<td>').text(jobs['label']))
            .append($('<td>').append($('<button id="gestionarJob" class="btn btn-secondary btn-sm" data-name="' + jobs['name'] + '" data-label="' + jobs['label'] + '" data-offjob="' + jobs['offJob'] + '">Ver</button>'))));
    })
}

function createTableInventory(inventoryResults) {
    $('#inventoryTable tbody').html('');
    inventoryResults.forEach(function(inventory) {
        $('#inventoryTable tbody').append($('<tr>')
            .append($('<td>').text(inventory['name']))
            .append($('<td>').text(inventory['count']))
        );
    })
}

function createTableRangos(rangosResults) {
    $('#rangosAll tbody').html('');
    rangosResults.forEach(function(rangos) {
        $('#rangosAll tbody').append($('<tr>')
            .append($('<td>').text(rangos['name']))
            .append($('<td>').text(rangos['label']))
            .append($('<td>').text(rangos['salary']))
            .append($('<td>').append($('<button id="editarRango" class="btn btn-secondary btn-sm" data-grade="' + rangos['grade'] + '" data-name="' + rangos['name'] + '" data-label="' + rangos['label'] + '" data-salary="' + rangos['salary'] + '">Editar</button>')))
            .append($('<td>').append($('<button id="setRangoJob" class="btn btn-dark btn-sm" data-jobname="' + rangos['job_name'] + '" data-name="' + rangos['name'] + '" data-grade="' + rangos['grade'] + '" data-label="' + rangos['label'] + '" data-salary="' + rangos['salary'] + '">Set Job</button>')))
        );
    })
}

function createTableEmployees(employeesResults) {
    $('#integrantesTable tbody').html('');
    employeesResults.forEach(function(employees) {
        $('#integrantesTable tbody').append($('<tr>')
            .append($('<td>').text(employees['license']))
            .append($('<td>').text(employees['name']))
            .append($('<td>').text(employees['gradeName']))
            .append($('<td>').append($('<button id="firePlayer" class="btn btn-dark btn-sm" data-identifier="' + employees['license'] + '" data-citizenid="' + employees['citizenid'] + '">Despedir</button>')))
        );
    })
}

function createNoteTable(noteResults) {
    $('#notes tbody').html('');
    $(".zonaTotalMultas").hide();

    if (noteResults.length != 0) {
        noteResults.forEach(function(notes) {
            $('#notes tbody').append($('<tr>')
                .append($('<td>').text(notes['title']))
                .append($('<td>').text(notes['content']))
                .append($('<td>').text(new Date(notes['created_at']).toLocaleString('en-GB')))
                .append($('<td class="text-right">').append($('<button class="btn btn-sm btn-secondary delete_note" data-id="' + notes['id'] + '"><i class="fas fa-trash"></i></button>')))

            );
        })
        $("#cargando-notas").fadeOut(300, function() {
            $("#lista-notas").fadeIn(300);
        });
    }



}

var userName = null

function showExtraUserData(user) {
    $('.resultinner').fadeOut(300, function() {
        $('.civilian-details').fadeIn(300);
    });

    $("#criminal-records .sin-datos").hide();

    $('.modal').show(300);
    $('#PlaceHolderImage').hide();
    $('#dialogNotes').hide();
    $('#sendBillings').show()
    $('#createNotes').hide();
    $('#criminal-records tbody').html('');
    $('#criminal-records').show()
    $('#licenses tbody').html('');
    $('#billing tbody').html('');
    $('#billing').hide()
    $('#notes tbody').html('');
    $('#notes').hide()
    $('#cr-playerid').val(user.citizenid);
    $('#cr-license').val(user.license);
    $('#licenses').hide()
    $('#vehicles').hide()
    $('#image').html(`<img src='${user.image}' class="card-img-top">`);
    $('.firstname-label').text('Nombre:');
    $('.firstname').text(user.firstname + ' ' + user.lastname);
    userName = user.firstname + ' ' + user.lastname
    gender = user.gender
    $('.sex-label').text('Género:');
    if (gender == 0) {
        $('.sex').text('Hombre');
    } else {
        $('.sex').text('Mujer');
    }

    $('.dob-label').text('Fecha de nacimiento:');
    $('.dob').text(user.birthdate);

    $('.phone_number-label').text('Número de telefono:');
    $('.phone_number').text(user.phone);

    $('.peligroso-label').text('Peligroso:');
    if (user.peligroso == 1) {
        $('#peligroso').html(`<div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary btn-izquierdo add-peligroso" id="no-peligroso">
          <input type="radio" id="peligroso-no"> No
        </label>
        <label class="btn btn-secondary btn-derecho active add-peligroso" id="si-peligroso">
          <input type="radio"  id="peligroso-si" checked> Si
        </label>
      </div>`);
    } else {
        $('#peligroso').html(`<div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary btn-izquierdo active add-peligroso" id="no-peligroso">
          <input type="radio" id="peligroso-no"> No
        </label>
        <label class="btn btn-secondary btn-derecho add-peligroso" id="si-peligroso">
          <input type="radio"  id="peligroso-si" checked> Si
        </label>
      </div>`);
    }

    $('.busqueda-label').text('En busqueda y captura:');
    if (user.busqueda == 1) {
        $('#busqueda').html(`<div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary btn-izquierdo add-buscado" id="no-buscado">
          <input type="radio" id="peligroso-no"> No
        </label>
        <label class="btn btn-secondary btn-derecho active add-buscado" id="si-buscado">
          <input type="radio"  id="peligroso-si" checked> Si
        </label>
      </div>`);
    } else {
        $('#busqueda').html(`<div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary btn-izquierdo active add-buscado" id="no-buscado">
          <input type="radio" id="peligroso-no"> No
        </label>
        <label class="btn btn-secondary btn-derecho add-buscado" id="si-buscado">
          <input type="radio"  id="peligroso-si" checked> Si
        </label>
      </div>`);
    }



    playerid = user.citizenid
    $.post('https://origen_masterJob/get-cr', playerid);
    $.post('https://origen_masterJob/get-license', playerid);
    $.post('https://origen_masterJob/get-vehicles', playerid);
    $.post('https://origen_masterJob/get-billing', playerid);
    $.post('https://origen_masterJob/get-note', playerid);
    playerid = JSON.stringify({ playerid: $('#cr-playerid').val() });
    $.post('https://origen_masterJob/get-cr', playerid);


    setTimeout(function() {
        if ($("#criminal-records tbody tr").length == 0) {

            $("#cargando-multas").fadeOut(300, function() {
                $("#criminal-records .sin-datos").fadeIn(300);
            });
        }

    }, 2000);


}


function showExtraUserDataEMS(user) {


    $(".paciente-details .sin-datos").hide();



    $('#tabla-facturas tbody').html('');
    $('#tabla-facturas').show()
    $('#cr-playerid-ems').val(user.citizenid);
    $('#cr-license-ems').val(user.license);
    $('#imageEms').html(`<img src='${user.image}' class="card-img-top">`);
    $('.firstname').text(user.firstname + ' ' + user.lastname);
    gender = user.gender
    if (gender == 0) {
        $('.sex').text('Hombre');
    } else {
        $('.sex').text('Mujer');
    }

    $('.dob').text(user.birthdate);
    $('.phone_number').text(user.phone);

    $("#sendFacturas").off("click").on("click", function() {
        $("#dialogFacturas").fadeIn(300, function() {
            $("#closeDialogFacturas").off("click").on("click", function() {
                $("#dialogFacturas").fadeOut(300);
            });

            $("#saveFactura").off("click").on("click", function() {
                let concepto = $("#titleFactura").val();
                let cantidad = $("#cantidadFactura").val();
                let descripcion = $("#contentFactura").val();
                multa = JSON.stringify({ concepto: concepto, cantidad: cantidad, descripcion: descripcion, identifier: $('#cr-playerid-ems').val(), license: $('#cr-license-ems').val() });
                $.post('https://origen_masterJob/send-ambulance-bills', multa);
                $("#dialogFacturas").fadeOut(300)
                    //MANDAR POST CON LOS DATOS Y ACTUALIZAR TABLA FACTURAS
                setTimeout(function() {
                    playerid = JSON.stringify({ playerid: $('#cr-playerid-ems').val() });
                    $.post('https://origen_masterJob/get-ambulancecr', playerid);
                }, 2000);
            });
        });
    });

    $("#updateImageEms").off("click").on("click", function() {
        $("#PlaceHolderImageEms").fadeIn(300, function() {
            click.play();
            if ($("#PlaceHolderImageEms").css("display") != "flex") {
                $('#PlaceHolderImageEms').fadeIn(300);

            } else {

                $('#PlaceHolderImageEms').fadeOut(300);
            }
        });
    });

    $("#saveImagenEms").off("click").on("click", function() {
        click.play();
        if ($('#imageUrlEms').val().length > 1) {
            //addPhotoEms(); FALTA DEFINIR LA FUNCIÓN, COPIAR LA DE addPhoto();
            $('#PlaceHolderImageEms').hide(300);
            playerid = JSON.stringify({ playerid: $('#cr-playerid-ems').val() });
            $('#image').html(`<img src='${$('#imageUrlEms').val()}' class="card-img-top">`);
        } else {
            console.log('Rellena los campos');
        }
    });

    playerid = JSON.stringify({ playerid: $('#cr-playerid-ems').val() });
    $.post('https://origen_masterJob/get-ambulancecr', playerid);


    setTimeout(function() {
        if ($("#criminal-records tbody tr").length == 0) {

            $("#cargando-facturas").fadeOut(300, function() {
                $("#criminal-records .sin-datos").fadeIn(300);
            });
        }

    }, 2000);
    //POST PARA CARGAR FACTURAS. IDEAL LLAMAR A UNA FUNCIÓN PARA REUTILIZARLA ARRIBA.
    $("#civ-back-ems").off("click").on("click", function() {
        $('.paciente-details').fadeOut(300, function() {
            $('.resultados-pacientes').fadeIn(300);
        });
    });

    setTimeout(function() {
        if ($("#tabla-facturas tbody tr").length == 0) {

            $("#cargando-facturas").fadeOut(300, function() {
                $("#listado-facturas-ems .sin-datos").fadeIn(300);
            });
        }

    }, 1500);

    $('.resultados-pacientes').fadeOut(300, function() {
        $('.paciente-details').fadeIn(300);
    });


}



/*MI NEGOCIO*/

function cargarMiNegocio() {
    if ($("#MiNegocio").css("display") == "none") {
        ocultarTodo();
        click.play();


        $.post('https://origen_masterJob/attemptToRecieveInfoBussiness');
        var time = 0.2;
        $("#MiNegocio .bg-white").each(function() {
            $(this).css("animation-delay", time + "s").show();
            time += 0.1;
        });

        setTimeout(function() {
            $('#MiNegocio').fadeIn(300);
            tablet_app.play();

        }, 301);


        $('.progress-bar').animate({ width: 25 + '%' }, 1500);
        $("#BtnContratarNegocio").off("click").on("click", function() {
            click.play();
            if ($("#contratarNegocio").hasClass("show")) {
                $("#contratarNegocio").fadeOut(300, function() {
                    $("#cercanos-negocio").html("");
                }).removeClass("show");
            } else {
                $.post('https://origen_masterJob/get-nearbyPlayers');
            }
        });

    }

}

var currentContainerId = 0
var currentId = 0
var currentLicense = 0

function SendNearPlayers(nearPlayers) {
    if (nearPlayers !== false) {
        nearPlayers.forEach(function(user) {
            $("#cercanos-negocio").append(`<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-user"></i> ${user.label} </span> <span><button class="btn btn-secondary btn-sm ml-2 contratar" data-id=${user.player} ><i class="fas fa-user-plus"></i> Contratar</button></span></li>`);
        });
        //PARA DESPUES DEL BUCLE
        $("#contratarNegocio .contratar").off("click").on("click", function() {
            click.play();
            //LOGICA CONTRATACIÓN
            $("#contratarNegocio").fadeOut(300, function() {
                $("#cercanos-negocio").html("");
            }).removeClass("show");
            job = JSON.stringify({ id: $(this).attr("data-id") });
            $.post('https://origen_masterJob/hirePlayer', job);
        });
    } else {
        $("#cercanos-negocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span>No hay personas cerca de ti.</li>');

    }
    $("#contratarNegocio").fadeIn(300).addClass("show");
}

function SendNearPlayersPandilla(nearPlayers) {
    if (nearPlayers !== false) {
        $("#cercanos-pandilla").html("");
        nearPlayers.forEach(function(user) {
            $("#cercanos-pandilla").append(`<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-user"></i> ${user.label}</span> <span><button class="btn btn-secondary btn-sm ml-2 reclutar" data-id=${user.player} ><i class="fas fa-user-plus"></i> Reclutar</button></span></li>`);
        });
        //PARA DESPUES DEL BUCLE
        $(".reclutar").off("click").on("click", function() {
            //LOGICA CONTRATACIÓN
            $("#reclutarPandilla").fadeOut(300, function() {
                $("#cercanos-pandilla").html("");
            }).removeClass("show");
            var id = $(this).attr("data-id");

            $.post('https://origen_masterJob/hirePlayerPandilla', JSON.stringify({ id: id }));
            setTimeout(function() {
                cargarMiPJ()
            }, 2500)
        });

    } else {
        $("#cercanos-pandilla").html("");

        $("#cercanos-pandilla").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span>No hay personas cerca de ti.</li>');

    }
    $("#reclutarPandilla").fadeIn(300).addClass("show");
}

function sendInfoBussiness(employees, societyMoney, level, time, onDutyEmployees, totalOnDuty, jobLabel, inventory, totalBilling, vehicles, typeLocal) {
    $('#TrabajadoresNegocio').html('');
    $('#VehiclesOwnedSociety').html('');
    $('#dutyEmployeesLast7').html('');
    $('#StockBussiness').html('');
    $('#CapitalNegocio').text(societyMoney + '$');
    $("#tituloNegocio").html(`${jobLabel}`);
    if (jobLabel == "SAPD") {
        $("#zona-articulos").hide();
    }
    $('#levelNegocio').text(level);
    $('#timeNegocio').text(time);
    $('#totalOnDuty').text(totalBilling);
    vehicles.forEach(function(x) {
        $("#VehiclesOwnedSociety").append(`<li class="list-group-item list-group-item-action"><i class="fas fa-car"></i> ${x.labelVehicle}</li>`);
    });
    if (level === 0) {
        $("#objetivosSociety").html("");
        $("#objetivosSociety").append('<a href="#" class="list-group-item list-group-item-action"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1"><i class="fas fa-exclamation-circle"></i> Alcanza una facturación total de 45.000$</h5></div><p class="mb-1">Consigue el primer granito de arena para tu nuevo imperio, ¡Por algo se empieza!</p></a>');
        $("#objetivosSociety").append('<a href="#" class="list-group-item list-group-item-action"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1"><i class="fas fa-exclamation-circle"></i> Alcanza un total de 20 horas abiertas</h5></div><p class="mb-1">Consigue tener 20 horas en total con el local abierto</p></a>');
    }

    if (level === 1) {
        $("#objetivosSociety").html("");
        $("#objetivosSociety").append('<a href="#" class="list-group-item list-group-item-action"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1"><i class="fas fa-exclamation-circle"></i> Alcanza una facturación total de 100.000$</h5></div><p class="mb-1">Consigue facturar un total de 100.000$</p></a>');
        $("#objetivosSociety").append('<a href="#" class="list-group-item list-group-item-action"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1"><i class="fas fa-exclamation-circle"></i> Alcanza un total de 40 horas abiertas</h5></div><p class="mb-1">Consigue tener 40 horas en total con el local abierto</p></a>');
    }

    if (level === 2) {
        $("#objetivosSociety").html("");
        $("#objetivosSociety").append('<a href="#" class="list-group-item list-group-item-action"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1"><i class="fas fa-exclamation-circle"></i> Alcanza una facturación total de 500.000$</h5></div><p class="mb-1">Consigue facturar un total de 500.000$</p></a>');
        $("#objetivosSociety").append('<a href="#" class="list-group-item list-group-item-action"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1"><i class="fas fa-exclamation-circle"></i> Alcanza un total de 75 horas abiertas</h5></div><p class="mb-1">Consigue tener 75 horas en total con el local abierto</p></a>');
    }

    if (level === 3) {
        $("#objetivosSociety").html("");
    }
    inventory.forEach(function(x) {
        $("#StockBussiness").append(`<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
        <span><i class="fas fa-angle-double-right"></i> ${x.label}</span>
        <span class="badge badge-secondary badge-pill">${x.amount}</span></li>`);
    });
    if (employees) {
        employees.forEach(function(user) {
            user.savedDuty.forEach(function(x) {
                $("#dutyEmployeesLast7").append(`<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                <span><i class="fas fa-user"></i> ${user.name + ' - ' + user.gradeName}</span>
                <span><i class="fas fa-calendar-alt"></i> ${x.date} <i class="fas fa-clock"></i> ${x.time}</span>
            </li>`);
            });
            if (user.isOnDuty == true) {
                $("#TrabajadoresNegocio").append(`<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"><span><i class="fas fa-user"></i> ${user.name + ' - ' + user.gradeName}</span> <span><span class="badge badge-secondary">En Servicio</span><button class="btn btn-secondary btn-sm ml-2 contratar" data-id=${user.citizenid} data-license=${user.license} data-rango=${user.gradeLevel}><i class="fas fa-user-cog"></i></button> <div class="zona-gestion">
                <div class="text-center"> RANGO</div>
                <div><input type="text" value=${user.gradeLevel}><button class="btn btn-secondary btn-sm promoteSociety"><i class="fas fa-check"></i></button></div> <button id="fireSociety" class="btn btn-secondary btn-sm fireSociety">Despedir</button></div>
            </span></li>`);
            } else {
                $("#TrabajadoresNegocio").append(`<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"><span><i class="fas fa-user"></i> ${user.name + ' - ' + user.gradeName}</span> <button class="btn btn-secondary btn-sm ml-2 contratar" data-id=${user.citizenid} data-license=${user.license} data-rango=${user.gradeLevel}><i class="fas fa-user-cog"></i></button> <div class="zona-gestion">
                <div class="text-center"> RANGO</div>
                <div><input type="text" value=${user.gradeLevel}><button class="btn btn-secondary btn-sm promoteSociety"><i class="fas fa-check"></i></button></div> <button id="fireSociety" class="btn btn-secondary btn-sm fireSociety">Despedir</button></div>
            </span></li>`);
            }
        });
        cargarSonidos();
    } else {
        $("#TrabajadoresNegocio").html('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span>No hay personas cerca de ti.</li>');
    }
    $(".gestionar-trabajadores .contratar").off("click").on("click", function(ev) {
        click.play();
        currentId = $(this).data('id')
        currentContainerId = $(this)
        currentLicense = $(this).data('license')
        var contenedor = $(this).parent().find(".zona-gestion");
        if (contenedor.css("display") == "none") {
            $(".zona-gestion").hide();
            contenedor.find("input").val($(this).attr('data-rango'));
            contenedor.fadeIn(300, function() {});
        } else {
            contenedor.addClass("scale-out").fadeOut(300, function() {
                $(this).removeClass("scale-out");
            });
        }

    });

    $(document).off("click").on('click', '.promoteSociety', function(ev) {
        click.play();
        var contenedor = currentContainerId.parent().find(".zona-gestion");
        job = JSON.stringify({ id: currentId, license: currentLicense, grade: contenedor.find("input").val() });
        $.post('https://origen_masterJob/promotePlayer', job);
        contenedor.addClass("scale-out").fadeOut(300, function() {
            $(this).removeClass("scale-out");
            currentContainerId = 0;
            currentId = 0;
            currentLicense = 0;
            setTimeout(function() {
                $.post('https://origen_masterJob/attemptToRecieveInfoBussiness');
            }, 500);
        });
    });

    $("#BtnSolicitarStockNegocio").off("click").on("click", function() {
        click.play();
        if ($("#solicitarStockNegocio").hasClass("show")) {
            $("#solicitarStockNegocio").fadeOut(300, function() {
                //$("#cercanos-negocio").html("");
            }).removeClass("show");
        } else {
            data = "Articulos";
            if (data) {
                $("#articulos-solicitar").html("");
                $("#articulos-solicitar").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span class="n-articulo"><i class="fas fa-angle-double-right"></i> Sandwich de queso - 5$</span><span>CANTIDAD: <input type="text" class="cantidad-articulo" value="1" type="number" data-id="sandwich"><button class="btn btn-secondary btn-sm ml-2 solicitar" data-price="5" data-id="1" ><i class="fas fa-plus"></i> Solicitar</button></span></li>');
                $("#articulos-solicitar").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span class="n-articulo"><i class="fas fa-angle-double-right"></i> Botella de agua - 2$</span><span>CANTIDAD: <input type="text" class="cantidad-articulo" value="1" type="number" data-id="water_bottle"><button class="btn btn-secondary btn-sm ml-2 solicitar" data-price="2" data-id="2" ><i class="fas fa-plus"></i> Solicitar</button></span></li>');
                $("#articulos-solicitar").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span class="n-articulo"><i class="fas fa-angle-double-right"></i> Coca-Cola - 3$</span><span>CANTIDAD: <input type="text" class="cantidad-articulo" value="1" type="number" data-id="kurkakola"><button class="btn btn-secondary btn-sm ml-2 solicitar" data-price="3" data-id="3" ><i class="fas fa-plus"></i> Solicitar</button></span></li>');
                $("#articulos-solicitar").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span class="n-articulo"><i class="fas fa-angle-double-right"></i> Golosinas - 3$</span><span>CANTIDAD: <input type="text" class="cantidad-articulo" value="1" type="number" data-id="twerks_candy"><button class="btn btn-secondary btn-sm ml-2 solicitar" data-price="3" data-id="4" ><i class="fas fa-plus"></i> Solicitar</button></span></li>');
                $("#articulos-solicitar").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span class="n-articulo"><i class="fas fa-angle-double-right"></i> Snikkel - 3$</span><span>CANTIDAD: <input type="text" class="cantidad-articulo" value="1" type="number" data-id="snikkel_candy"><button class="btn btn-secondary btn-sm ml-2 solicitar" data-price="3" data-id="5" ><i class="fas fa-plus"></i> Solicitar</button></span></li>');
                $("#articulos-solicitar").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span class="n-articulo"><i class="fas fa-angle-double-right"></i> Café - 3$</span><span>CANTIDAD: <input type="text" class="cantidad-articulo" value="1" type="number" data-id="coffee"><button class="btn btn-secondary btn-sm ml-2 solicitar" data-price="3" data-id="6" ><i class="fas fa-plus"></i> Solicitar</button></span></li>');
                $("#articulos-solicitar").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span class="n-articulo"><i class="fas fa-angle-double-right"></i> Whiskey - 5$</span><span>CANTIDAD: <input type="text" class="cantidad-articulo" value="1" type="number" data-id="whiskey"><button class="btn btn-secondary btn-sm ml-2 solicitar" data-price="5" data-id="7" ><i class="fas fa-plus"></i> Solicitar</button></span></li>');
                $("#articulos-solicitar").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span class="n-articulo"><i class="fas fa-angle-double-right"></i> Cerveza - 3$</span><span>CANTIDAD: <input type="text" class="cantidad-articulo" value="1" type="number" data-id="beer"><button class="btn btn-secondary btn-sm ml-2 solicitar" data-price="3" data-id="8" ><i class="fas fa-plus"></i> Solicitar</button></span></li>');
                $("#articulos-solicitar").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span class="n-articulo"><i class="fas fa-angle-double-right"></i> Vodka - 5$</span><span>CANTIDAD: <input type="text" class="cantidad-articulo" value="1" type="number" data-id="vodka"><button class="btn btn-secondary btn-sm ml-2 solicitar" data-price="5" data-id="9" ><i class="fas fa-plus"></i> Solicitar</button></span></li>');
                cargarSonidos();

                //PARA DESPUES DEL BUCLE
                $("#solicitarStockNegocio .solicitar").off("click").on("click", function() {
                    click.play();
                    //LOGICA CONTRATACIÓN
                    var id = $(this).parent().find(".cantidad-articulo").attr("data-id");
                    var valor = parseInt($(this).parent().find(".cantidad-articulo").val());
                    var nombre = $(this).parent().parent().find(".n-articulo").text().trim();
                    var precio = $(this).attr("data-price");
                    agregarCarrito(id, valor, nombre, precio);


                    $(this).parent().find(".cantidad-articulo").val(1);


                    // if (true) {
                    //     if ($("#alertStock").css("display") != "block") {
                    //         $("#alertStock").html("¡Artículo solicitado correctamente!</br>Un repartidor se acercará a tu negocio para entregar tu pedido.").fadeIn(300, function() {
                    //             setTimeout(function() {
                    //                 $("#alertStock").fadeOut(300, function() {
                    //                     $(this).html("");

                    //                 });
                    //             }, 5000)
                    //         });
                    //     }

                    // } else {
                    //     if ($("#alertStock").css("display") != "block") {
                    //         $("#alertStock").html("¡Ya has realizado el pedido este artículo!").fadeIn(300, function() {
                    //             setTimeout(function() {
                    //                 $("#alertStock").fadeOut(300, function() {
                    //                     $(this).html("");


                    //                 });
                    //             }, 5000)
                    //         });
                    //     }
                    // }

                });

                $(".cantidad-articulo").off("keyup").keyup(function() {
                    if ($(this).val() > 20) {
                        $(this).val(20);
                    }
                    if (!$.isNumeric($(this).val())) {
                        $(this).val(1);
                    }
                });


            } else {
                $("#articulos-solicitar");
                $("#articulos-solicitar").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span>No tienes ningún artículo en stock.</li>');

            }
            var data2 = "Articulos bloqueados";
            if (data2) {
                $("#articulos-bloqueados").html("");
                $("#articulos-bloqueados").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-angle-double-right"></i> 7UP</span><span class="text-muted">Nivel 2</span></li>');

            } else {
                $("#articulos-bloqueados");
                $("#articulos-bloqueados").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span>¡Ya has desbloqueado todos los artículos!</li>');

            }



            $("#solicitarStockNegocio").fadeIn(300).addClass("show");
        }
    });

    $(document).on('click', '.fireSociety', function(ev) {
        click.play();
        var contenedor = currentContainerId.parent().find(".zona-gestion");
        job = JSON.stringify({ id: currentId, license: currentLicense });
        $.post('https://origen_masterJob/firePlayer', job);
        contenedor.addClass("scale-out").fadeOut(300, function() {
            $(this).removeClass("scale-out");
            currentContainerId = 0;
            currentId = 0;
            currentLicense = 0;
            setTimeout(function() {
                $.post('https://origen_masterJob/attemptToRecieveInfoBussiness');
            }, 500);
        });
    });

    $("#BtnSolicitarVehiculoNegocio").off("click").on("click", function() {
        click.play();
        if ($("#SolicitarVehiculoNegocio").hasClass("show")) {
            $("#SolicitarVehiculoNegocio").fadeOut(300).removeClass("show");
        } else {
            data = "Vehiculos";
            if (data) {
                if (level === 0) {
                    $("#ListaVehiculosSolicitarNegocio").html("");
                    if (typeLocal === 'local') {
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Prairie</span><span>5000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="prairie" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Burrito3</span><span>8000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="burrito3" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                    }
                    if (typeLocal === 'mechanic') {
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Towtruck2</span><span>10000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="towtruck2" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                    }
                }
                if (level === 1) {
                    $("#ListaVehiculosSolicitarNegocio").html("");
                    if (typeLocal === 'local') {
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Prairie</span><span>5000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="prairie" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Burrito3</span><span>8000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="burrito3" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Huntley</span><span>8000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="huntley" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                    }
                    if (typeLocal === 'mechanic') {
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Towtruck2</span><span>10000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="towtruck2" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Towtruck</span><span>15000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="towtruck" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Bison</span><span>15000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="bison" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                    }
                }
                if (level === 2) {
                    $("#ListaVehiculosSolicitarNegocio").html("");
                    if (typeLocal === 'local') {
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Prairie</span><span>5000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="prairie" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Burrito3</span><span>8000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="burrito3" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Huntley</span><span>8000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="huntley" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Oracle</span><span>7000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="oracle" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Jackal</span><span>8000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="jackal" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Zion</span><span>8500$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="zion" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                    }
                    if (typeLocal === 'mechanic') {
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Towtruck2</span><span>10000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="towtruck2" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Towtruck</span><span>15000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="towtruck" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Bison</span><span>15000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="bison" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Flatbed</span><span>17000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="flatbed" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                    }
                }
                if (level === 3) {
                    $("#ListaVehiculosSolicitarNegocio").html("");
                    if (typeLocal === 'local') {
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Prairie</span><span>5000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="prairie" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Burrito3</span><span>8000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="burrito3" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Huntley</span><span>8000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="huntley" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Oracle</span><span>7000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="oracle" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Jackal</span><span>8000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="jackal" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Zion</span><span>8500$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="zion" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Schlagen</span><span>18000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="schlagen" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Khamelion</span><span>21000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="khamelion" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Patriot</span><span>28000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="patriot" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                    }
                    if (typeLocal === 'mechanic') {
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Towtruck2</span><span>10000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="towtruck2" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Towtruck</span><span>15000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="towtruck" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Bison</span><span>15000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="bison" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Flatbed</span><span>17000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="flatbed" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                        $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Slamtruck</span><span>25000$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="slamtruck" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                    }
                }
                cargarSonidos();

                //PARA DESPUES DEL BUCLE
                $("#ListaVehiculosSolicitarNegocio .adquirir").off("click").on("click", function() {
                    click.play();
                    //LOGICA CONTRATACIÓN
                    $.post('https://origen_masterJob/HasMoneyVehicle', JSON.stringify({ name: $(this).data('id') }), function(data) {
                        if (data.can) {
                            if ($("#alertVehicleNeg").css("display") != "block") {
                                $("#alertVehicleNeg").html(data.msg).fadeIn(300, function() {
                                    setTimeout(function() {
                                        $("#alertVehicleNeg").fadeOut(300, function() {
                                            $(this).html("");
                                            $.post('https://origen_masterJob/attemptToRecieveInfoBussiness');
                                        });
                                    }, 5000)
                                });
                            }

                        } else {
                            if ($("#alertVehicleNeg").css("display") != "block") {
                                $("#alertVehicleNeg").html(data.msg).fadeIn(300, function() {
                                    setTimeout(function() {
                                        $("#alertVehicleNeg").fadeOut(300, function() {
                                            $(this).html("");
                                        });
                                    }, 5000)
                                });
                            }
                        }
                    });

                });




            } else {
                $("#ListaVehiculosSolicitarNegocio").html("");
                $("#ListaVehiculosSolicitarNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span>No puedes adquirir nuevos vehículos.</li>');

            }
            if (level === 0) {
                $("#VehiculosBloqueadosNegocio").html("");
                if (typeLocal === 'local') {
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Huntley</span><span class="text-muted">Nivel 1</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Oracle</span><span class="text-muted">Nivel 2</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Jackal</span><span class="text-muted">Nivel 2</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Zion</span><span class="text-muted">Nivel 2</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Schlagen</span><span class="text-muted">Nivel 3</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Khamelion</span><span class="text-muted">Nivel 3</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Patriot</span><span class="text-muted">Nivel 3</span></li>');
                }
                if (typeLocal === 'mechanic') {
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Towtruck</span><span class="text-muted">Nivel 1</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Bison</span><span class="text-muted">Nivel 1</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Flatbed</span><span class="text-muted">Nivel 2</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Slamtruck</span><span class="text-muted">Nivel 3</span></li>');
                }
            }
            if (level === 1) {
                $("#VehiculosBloqueadosNegocio").html("");
                if (typeLocal === 'local') {
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Oracle</span><span class="text-muted">Nivel 2</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Jackal</span><span class="text-muted">Nivel 2</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Zion</span><span class="text-muted">Nivel 2</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Schlagen</span><span class="text-muted">Nivel 3</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Khamelion</span><span class="text-muted">Nivel 3</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Patriot</span><span class="text-muted">Nivel 3</span></li>');
                }
                if (typeLocal === 'mechanic') {
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Flatbed</span><span class="text-muted">Nivel 2</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Slamtruck</span><span class="text-muted">Nivel 3</span></li>');
                }
            }
            if (level === 2) {
                $("#VehiculosBloqueadosNegocio").html("");
                if (typeLocal === 'local') {
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Schlagen</span><span class="text-muted">Nivel 3</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Khamelion</span><span class="text-muted">Nivel 3</span></li>');
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Patriot</span><span class="text-muted">Nivel 3</span></li>');
                }
                if (typeLocal === 'mechanic') {
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Slamtruck</span><span class="text-muted">Nivel 3</span></li>');
                }
            }
            if (level === 3) {
                $("#VehiculosBloqueadosNegocio").html("");
                if (typeLocal === 'local') {
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span>¡Ya has desbloqueado todos los vehículos!</li>');
                }
                if (typeLocal === 'mechanic') {
                    $("#VehiculosBloqueadosNegocio").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span>¡Ya has desbloqueado todos los vehículos!</li>');
                }
            }

            $("#SolicitarVehiculoNegocio").fadeIn(300).addClass("show");
        }
    });
}


/* MI ORGANIZACIÓN*/


function cargarMiOrganizacion() {
    click.play();
    if ($("#MiOrganizacion").css("display") == "none") {

        ocultarTodo();
        comprobarGuerras();

        var time = 0.2;
        $("#MiOrganizacion .bg-white").each(function() {
            $(this).css("animation-delay", time + "s").show();
            time += 0.1;
        });
        setTimeout(function() {
            $('#MiOrganizacion').fadeIn(300);
            tablet_app.play();
        }, 301);


        $("#progress-bar-nivel").html(gangLevel * 100 + '%')
        $('#progress-bar-nivel').animate({ width: gangLevel * 100 + '%' }, 1500);
        $('#progress-bar-respeto').animate({ width: gangRespect + '%' }, 2000);


        $("#BtnContratarOrganizacion").off("click").on("click", function() {
            if ($("#contratarOrganizacion").hasClass("show")) {
                $("#contratarOrganizacion").fadeOut(300, function() {
                    $("#cercanos-organizacion").html("");
                }).removeClass("show");
            } else {
                data = "Nombres";
                if (data) {
                    //$("#cercanos-organizacion").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-user"></i> Antonio García</span> <span><button class="btn btn-secondary btn-sm ml-2 gestionar" data-id="1" ><i class="fas fa-user-plus"></i> Contratar</button></span></li>');
                    //PARA DESPUES DEL BUCLE
                    for (var i = 0; i < gangNearPlys.length; i++) {
                        $("#cercanos-organizacion").append(`<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-user"></i> ${gangNearPlys[i]['label']}</span> <span><button plyid="${gangNearPlys[i]['player']}" id="contratar-org" class="btn btn-secondary btn-sm ml-2 gestionar" data-id="1" ><i class="fas fa-user-plus"></i> Contratar</button></span></li>`)
                    }

                    $("#contratarOrganizacion .contratar").off("click").on("click", function() {
                        //LOGICA CONTRATACIÓN
                        $("#contratarOrganizacion").fadeOut(300, function() {
                            $("#cercanos-organizacion").html("");
                        }).removeClass("show");

                        var id = $(this).attr("data-id");

                    });

                    $("#contratar-org").on('click', function() {
                        $.post("https://origen_masterJob/addGangMember", JSON.stringify({
                            id: $(this).attr('plyid')
                        }))
                    })


                } else {
                    $("#cercanos-organizacion").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span>No hay personas cerca de ti.</li>');

                }
                $("#contratarOrganizacion").fadeIn(300).addClass("show");
            }


        });

        $("#solicitar-guerra").off("click").on("click", function() {
            if ($("#ZonaIniciarGuerra").hasClass("show")) {
                $("#ZonaIniciarGuerra").fadeOut(300, function() {
                    $("#ListaOrganizaciones").html("").show();
                    $("#ConfirmarGuerra").hide();
                }).removeClass("show");
            } else {
                data = "Organizaciones";
                if (data) {
                    $("#ListaOrganizaciones").append(' <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"><span class="nombre"><i class="fas fa-building"></i> Los Families</span> <span><button class="btn btn-secondary btn-sm ml-2 solicitar" data-id="families" ><i class="fas fa-bomb"></i> Solicitar</button></span></li>');
                    $("#ListaOrganizaciones").append(' <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"><span class="nombre"><i class="fas fa-building"></i> Los Families</span> <span><button class="btn btn-secondary btn-sm ml-2 solicitar" data-id="families" ><i class="fas fa-bomb"></i> Solicitar</button></span></li>');

                    //PARA DESPUES DEL BUCLE
                    $("#ListaOrganizaciones .solicitar").off("click").on("click", function() {

                        var idOrganizacion = $(this).attr("data-id");
                        var nOrganizacion = $(this).parent().parent().find(".nombre").text();
                        $("#ConfirmarGuerra .n-organizacion").text(nOrganizacion);
                        $("#ListaOrganizaciones").fadeOut(300, function() {
                            $("#ConfirmarGuerra").fadeIn(300, function() {
                                $("#ConfirmarGuerra .si").off("click").on("click", function() {
                                    //INICIAR GUERRA


                                    $("#ConfirmarGuerra").fadeOut(300, function() {
                                        $("#ZonaIniciarGuerra").fadeOut(300, function() {
                                            iniciarGuerraOrganizacion(idOrganizacion, nOrganizacion);
                                            $("#ListaOrganizaciones").html("").show();

                                        }).removeClass("show");
                                    });

                                });

                                $("#ConfirmarGuerra .no").off("click").on("click", function() {
                                    $("#ConfirmarGuerra").fadeOut(300, function() {
                                        $("#ListaOrganizaciones").fadeIn(300);
                                    });

                                });
                            });
                        });

                    });


                } else {
                    $("#ListaOrganizaciones").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"><span>No hay organizaciones disponibles.</li>');

                }
                $("#ZonaIniciarGuerra").fadeIn(300).addClass("show");
            }


        });

        $("#BtnSolicitarVehiculoOrganizacion").off("click").on("click", function() {
            click.play();
            if ($("#SolicitarVehiculoOrganizacion").hasClass("show")) {
                $("#SolicitarVehiculoOrganizacion").fadeOut(300).removeClass("show");
            } else {
                data = "Vehiculos";
                if (data) {
                    $("#ListaVehiculosSolicitarOrganizacion").html("");
                    $("#ListaVehiculosSolicitarOrganizacion").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Vehículo</span><span>10.593$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="1" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                    $("#ListaVehiculosSolicitarOrganizacion").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Vehículo</span><span>10.593$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="1" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                    $("#ListaVehiculosSolicitarOrganizacion").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Vehículo</span><span>10.593$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="1" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                    $("#ListaVehiculosSolicitarOrganizacion").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action "><span><i class="fas fa-angle-double-right"></i> Vehículo</span><span>10.593$ <button class="btn btn-secondary btn-sm ml-2 adquirir" data-id="1" ><i class="fas fa-plus"></i> Adquirir</button></span></li>');
                    cargarSonidos();

                    //PARA DESPUES DEL BUCLE
                    $("#ListaVehiculosSolicitarOrganizacion .adquirir").off("click").on("click", function() {
                        click.play();
                        //LOGICA CONTRATACIÓN

                        if (true) {
                            if ($("#alertVehicleOrg").css("display") != "block") {
                                $("#alertVehicleOrg").html("¡Enhorabuena! Ahora cuentas con un nuevo vehículo en tu flota").fadeIn(300, function() {
                                    setTimeout(function() {
                                        $("#alertVehicleOrg").fadeOut(300, function() {
                                            $(this).html("");

                                        });
                                    }, 5000)
                                });
                            }

                        } else {
                            if ($("#alertVehicleOrg").css("display") != "block") {
                                $("#alertVehicleOrg").html("¡No tienes suficiente capital para adquirir este vehículo!").fadeIn(300, function() {
                                    setTimeout(function() {
                                        $("#alertVehicleOrg").fadeOut(300, function() {
                                            $(this).html("");


                                        });
                                    }, 5000)
                                });
                            }
                        }

                    });




                } else {
                    $("#ListaVehiculosSolicitarOrganizacion").html("");
                    $("#ListaVehiculosSolicitarOrganizacion").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span>No puedes adquirir nuevos vehículos.</li>');

                }
                var data2 = "Vehiculos bloqueados";
                if (data2) {
                    $("#VehiculosBloqueadosOrganizacion").html("");
                    $("#VehiculosBloqueadosOrganizacion").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Coche 1</span><span class="text-muted">Nivel 2</span></li>');
                    $("#VehiculosBloqueadosOrganizacion").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Coche 2</span><span class="text-muted">Nivel 2</span></li>');
                    $("#VehiculosBloqueadosOrganizacion").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Coche 3</span><span class="text-muted">Nivel 2</span></li>');
                    $("#VehiculosBloqueadosOrganizacion").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-car"></i> Coche 4</span><span class="text-muted">Nivel 2</span></li>');
                } else {
                    $("#VehiculosBloqueadosOrganizacion");
                    $("#VehiculosBloqueadosOrganizacion").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span>¡Ya has desbloqueado todos los vehículos!</li>');

                }



                $("#SolicitarVehiculoOrganizacion").fadeIn(300).addClass("show");
            }
        });


        $("#BtnVerTodasMisiones").off("click").on("click", function() {
            click.play();
            if ($("#ListaMisiones").hasClass("show")) {
                $("#ListaMisiones").fadeOut(300).removeClass("show");
            } else {
                // data = "Vehiculos";

                // var data = "Misiones bloqueadas";
                // if (data) {
                //     $("#MisionesBloqueadas").html("");
                //     $("#MisionesBloqueadas").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-angle-double-right"></i> Roba la joyería de Los Santos</span><span class="text-muted">Nivel 2</span></li>');
                //     $("#MisionesBloqueadas").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-angle-double-right"></i> Roba una sucursal bancaria</span><span class="text-muted">Nivel 3</span></li>');
                //     $("#MisionesBloqueadas").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-angle-double-right"></i> Realiza 10 atracos</span><span class="text-muted">Nivel 3</span></li>');
                //     $("#MisionesBloqueadas").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span><i class="fas fa-angle-double-right"></i> Roba el casino </span><span class="text-muted">Nivel 4</span></li>');
                // } else {
                //     $("#MisionesBloqueadas");
                //     $("#MisionesBloqueadas").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span>¡Ya has desbloqueado todas las misiones!</li>');

                // }



                $("#ListaMisiones").fadeIn(300).addClass("show");
            }
        });

    }

}




function ocultarTodo() {
    // $('#content').hide();
    // $('#search-plate').hide();
    // $('#container').hide();
    // $('#gestion-admin').hide();
    // $('#MiNegocio').hide();
    // $('#MiOrganizacion').hide();
    // $('#containerByC').hide();
    // $('#search-ciudadanos').hide();
    // $('#search-civilian').hide();
    // $('#job-details').hide();
    $("#content, #search-plate, #container, #gestion-admin, #MiNegocio, #MiOrganizacion, #containerByC, #containerCPenal, #search-ciudadanos, #search-civilian, #job-details, #Pacientes").addClass("scale-out").fadeOut(300, function() {
        $(this).removeClass("scale-out");
    });
}

function cargarGraficas() {
    //NEGOCIO
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['11/08/2021', '12/08/2021', '13/08/2021', '14/08/2021', '15/08/2021', '16/08/2021'],
            datasets: [{
                label: 'Ingresos Generados',
                data: [1053, 953.5, 335, 567, 964.53, 694.25],
                backgroundColor: [
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)'
                ],
                borderColor: [
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)',
                    'rgba(0, 0, 0)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    //ORGANIZACION
    /*     var ctx2 = document.getElementById('grafico-organizacion');
        var myChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ['11/08/2021'],
                datasets: [{
                    label: 'Venta de droga',
                    data: [1053],
                    backgroundColor: [
                        'rgba(0, 0, 0)',
                        'rgba(0, 0, 0)',
                        'rgba(0, 0, 0)',
                        'rgba(0, 0, 0)',
                        'rgba(0, 0, 0)',
                        'rgba(0, 0, 0)'
                    ],
                    borderColor: [
                        'rgba(0, 0, 0)',
                        'rgba(0, 0, 0)',
                        'rgba(0, 0, 0)',
                        'rgba(0, 0, 0)',
                        'rgba(0, 0, 0)',
                        'rgba(0, 0, 0)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }); */

    /*     $('#circulo-1').circleProgress({
            value: 0.20,
            size: 150,
            fill: '#000000',
            thickness: 30

        });
        $('#circulo-2').circleProgress({
            value: 0.75,
            size: 150,
            fill: '#000000',
            thickness: 30
        }); */


}
var estado = "";
var data = null;

function iniciarGuerraOrganizacion(idOrganizacion, nombreOrganizacion) {
    //LÓGICA INICIAR GUERRA
    $(".info-guerra .nombre").text(nombreOrganizacion);
    $(".info-guerra").fadeIn(300);
    estado = "solicitado";
    comprobarGuerras();

}


function comprobarGuerras() {

    if (data) {
        $("#solicitar-guerra").hide();


        //ASIGNAR NOMBRE ORGANIZACIÓN DESDE EL LUA
        var nombre = "Los Families";
        $(".info-guerra .nombre").text(nombre);



        if (estado == "solicitado") {
            $(".solicitud-enviada").show();
            $(".en-curso").hide();
            $("#solicitar-guerra").hide();
            $(".solicitud-aceptada").hide();
            data = "datos";
            estado = "solicitado";

        }

        if (estado == "aceptado") {
            $(".solicitud-enviada").hide();
            $(".en-curso").hide();
            $(".solicitud-aceptada").show();
            $("#IniciarGuerra").off("click").on("click", function() {
                //PARA ACTUALIZAR ESTADO
                data = "datos";
                estado = "en-curso";
                comprobarGuerras();


                //LÓGICA INICIAR GUERRA



            })
        }

        if (estado == "en-curso") {
            $(".solicitud-enviada").hide();

            $(".solicitud-aceptada").fadeOut(1000, function() {
                $(".en-curso").fadeIn(300);
            });



        }

        $(".info-guerra").show();



    } else {
        $(".info-guerra").hide();
        $("#solicitar-guerra").show();

    }
}



function cargarSonidos() {
    $(".btn, .nav-link, a").mouseenter(function() {
        over_button.play();
    });


}



//MI PERSONAJE
function cargarMiPJ() {
    var time = 0;
    var citizenid = false
    $("#content .bg-white").each(function() {
        $(this).css("animation-delay", time + "s").show();
        time += 0.1;

    });
    if ($("#content").css("display") == "none") {
        ocultarTodo();
        setTimeout(function() {
            $("#content").fadeIn(300);

            //ESTE ANIMATE TAMBIÉN ESTÁ AL PRINCIPIO PARA QUE SE ANIME AL ABRIR LA TABLET
            $('#progress-bar-logros').animate({ width: 10 + '%' }, 1500);

            tablet_app.play();
        }, 301);



    }

    $.post('https://origen_masterJob/recieveInfoPlayer', JSON.stringify({}), function(data) {
        $("#namePlayer").text(data.name)
        $("#playerCash").text(data.money + "$")
        $("#playerBank").text(data.bank + "$")
        $("#playerCoins").text(data.coins)
        $("#playerJobName").text(data.jobName)
        $("#playerJobGrade").text(data.jobGrade)
        $("#playerBills").html("")
        $("#playerVehicles").html("")
        $("#playerHouses").html("")
        citizenid = data.citizenid
        if (data.bandName) {
            $("#gestionar-pandilla").addClass("scale2-in").fadeIn(300);
            $("#nombre-pandilla").text(data.bandName);
            $("#pandillas-create").hide()
            $("#MiembrosPandilla").html("")
            if (data.ownerBand === false) {
                $("#hideRecruitPandilla").hide()
                $("#hideDeletePandilla").hide()
            }
            data.bandMembers.forEach(function(v, i) {
                if (data.ownerBand) {
                    if (v.owner) {
                        $("#MiembrosPandilla").append(`<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"><span><i class="fas fa-user"></i> ${v.name}</span><span><span><span class="badge badge-secondary">Jefe</span></span></li>`)
                    } else {
                        $("#MiembrosPandilla").append(`<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"><span><i class="fas fa-user"></i> ${v.name}</span><span><span><span class="badge badge-secondary">Miembro</span><button data-id=${v.citizenId} class="btn btn-secondary ml-2 btn-sm expulsar-pandilla">Expulsar</button></span></li>`)
                    }
                } else {
                    if (v.owner) {
                        $("#MiembrosPandilla").append(`<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"><span><i class="fas fa-user"></i> ${v.name}</span><span><span><span class="badge badge-secondary">Jefe</span></span></li>`)
                    } else {
                        $("#MiembrosPandilla").append(`<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"><span><i class="fas fa-user"></i> ${v.name}</span><span><span><span class="badge badge-secondary">Miembro</span></span></li>`)
                    }
                }


                if (i == data.bandMembers.length - 1) {

                    $(".expulsar-pandilla").off("click").on("click", function() {
                        let id = $(this).attr("data-id");
                        $.post('https://origen_masterJob/deleteMember', JSON.stringify({ id: id, citizenid: citizenid }));
                        setTimeout(function() {
                            cargarMiPJ()
                        }, 2000);
                    });
                }
            })
        }

        let sinPagar = false;
        data.bills.forEach(function(billing, i) {
            if (billing.paied === false) {
                sinPagar = true;
                $("#playerBills").append(`<li class="list-group-item list-group-item-action d-flex justify-content-between"><span> <i class="fas fa-file-alt"></i> ${billing.label} - <span class="cantidad-factura font-weight-bold">${billing.amount} €</span> </span><button class="btn btn-secondary btn-sm pagar-factura" data-id=${billing.id}>Pagar</button></li>`)
            }

            if (i == data.bills.length - 1 && sinPagar) {
                $(".pagar-factura").off("click").on("click", function() {
                    click.play();

                    $.post('https://origen_masterJob/canPayBill', JSON.stringify({ id: $(this).data("id") }), function(data) {

                    });
                    $(this).parent().addClass("animate__animated animate__backOutLeft").fadeOut(400, function() {
                        $(this).remove();
                    });
                    setTimeout(function() {
                        cargarMiPJ()
                    }, 500)
                });

            }

            if (i == data.bills.length - 1 && !sinPagar) {
                $("#playerBills").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-secondary"><span>No tienes facturas pendientes</li>')


            }
        });


        data.vehicles.forEach(function(veh) {
            $("#playerVehicles").append(`<li class="list-group-item list-group-item-action"><i class="fas fa-car"></i> ${veh.labelVehicle} <span class="badge badge-secondary" > ${veh.garage} </span> </li>`)
        })
        data.houses.forEach(function(house) {
            $("#playerHouses").append(`<span><i class="fas fa-home"></i> ${house.house}</span>`)
        })
    });




    $("#btn-show-crear-pandilla").off("click").on("click", function() {
        $("#sin-pandilla").addClass("scale2-out").fadeOut(300, function() {
            $("#crear-pandillas").addClass("scale2-in").fadeIn(300);
            $("#sin-pandilla").removeClass("scale2-out");
        })
    });

    $("#btn-crear-pandilla").off("click").on("click", function() {
        if ($("#input-nombre-pandilla").val().length > 3) {
            $("#crear-pandillas").addClass("scale2-out").fadeOut(300, function() {

                $("#crear-pandillas").removeClass("scale2-out");
                $("#creando-pandilla").addClass("scale2-in").fadeIn(300, function() {
                    var nombrePandilla = $("#input-nombre-pandilla").val();
                    $("#nombre-pandilla").text(nombrePandilla);
                    $.post('https://origen_masterJob/createBand', JSON.stringify({ name: nombrePandilla }));
                    setTimeout(function() {
                        $("#creando-pandilla").addClass("scale2-out").fadeOut(300, function() {
                            cargarMiPJ()
                        });
                    }, 2000);
                });
            });
        }
    });

    $("#btn-cancelar-crear-pandilla").off("click").on("click", function() {
        $("#crear-pandillas").addClass("scale2-out").fadeOut(300, function() {
            $(this).removeClass("scale2-out");
            $("#sin-pandilla").fadeIn(300);
        });

    });



    $("#BtnReclutarPandilla").off("click").on("click", function() {

        if ($("#hideRecruitPandilla").hasClass("show")) {
            $("#hideRecruitPandilla").fadeOut(300, function() {
                $("#cercanos-pandilla").html("");
            }).removeClass("show");
        } else {
            $("#hideRecruitPandilla").addClass("show").fadeIn(300);
            $.post('https://origen_masterJob/get-nearbyPlayersPandilla');
        }


    });

    $("#BtnEliminarPandilla").off("click").on("click", function() {
        $("#gestionar-pandilla").addClass("scale2-out").fadeOut(300, function() {
            $(this).removeClass("scale2-out");
            $("#ConfirmarBorrarPandilla").addClass("scale2-in").fadeIn(300, function() {

                $("#ConfirmarBorrarPandilla .si").off("click").on("click", function() {
                    //ELIMINAR PANDILLA

                    $.post('https://origen_masterJob/deleteBand', JSON.stringify({ name: citizenid }));
                    $("#pandillas-create").show()
                    $("#ConfirmarBorrarPandilla").fadeOut(300, function() {
                        $("#sin-pandilla").fadeIn(300);
                    });

                });

                $("#ConfirmarBorrarPandilla .no").off("click").on("click", function() {
                    $("#ConfirmarBorrarPandilla").fadeOut(300, function() {
                        $("#gestionar-pandilla").fadeIn(300);
                    });

                });
            });

        });

    });

}

let totalCarrito = 0;

function agregarCarrito(id, valor, nombre, precio) {




    if ($(".zona-carrito").css("display") == "block") {
        if ($("#carrito-articulos").find(`[data-id='${id}']`).length != 0) {

            let cAnterior = parseInt($("#carrito-articulos").find(`[data-id='${id}']`).find('.cantidad').text());
            if (parseInt(cAnterior + valor) > 20) {

                $("#carrito-articulos").find(`[data-id='${id}']`).find('.cantidad').text(20);
                if (cAnterior != 20) {
                    totalCarrito += parseInt(precio) * (valor - cAnterior);
                    $(".total-carrito").text(totalCarrito);
                }


            } else {
                $("#carrito-articulos").find(`[data-id='${id}']`).find('.cantidad').text(parseInt(cAnterior + valor));
                totalCarrito += parseInt(precio);
                $(".total-carrito").text(totalCarrito);

            }

        } else {
            totalCarrito += parseInt(precio);
            $(".total-carrito").text(totalCarrito);
            $("#carrito-articulos").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action" data-id="' + id + '"><span><i class="fas fa-angle-double-right"></i> ' + nombre + '</span><span class="text-muted">x<span class="cantidad">' + valor + '</span></span>');
        }


    } else {
        totalCarrito += parseInt(precio);
        $(".total-carrito").text(totalCarrito);


        $("#carrito-articulos").append('<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action" data-id="' + id + '"><span><i class="fas fa-angle-double-right"></i> ' + nombre + '</span><span class="text-muted">x<span class="cantidad">' + valor + '</span></span>');
        $(".zona-carrito").fadeIn(300);
        $("#btn-vaciar-carrito").off("click").on("click", function() {
            totalCarrito = 0;
            $(".zona-carrito").fadeOut(300, function() {
                $("#carrito-articulos").html("");

            });
        });

        $("#btn-confirmar-pedido").off("click").on("click", function() {
            $(".zona-carrito").fadeOut(300, function() {
                //POST PARA COMPLETAR PEDIDO
                let articulos = [];
                let articulo = [];
                $("#carrito-articulos li").each(function(n) {
                    articulo = [];
                    articulo.push($(this).attr("data-id"), parseInt($(this).find(".cantidad").text()));

                    articulos.push(articulo);

                    if (n == $("#carrito-articulos li").length - 1) {

                        $.post('https://origen_masterJob/hasMoneyToOrder', JSON.stringify({ total: $('.total-carrito').text(), articulos: articulos }), function(data) {
                            if (data.can) {
                                $(".zona-carrito").fadeOut(300, function() {
                                    $("#carrito-articulos").html("");
                                    if ($("#alertStock").css("display") != "block") {
                                        $("#alertStock").html("¡Artículo solicitado correctamente!</br>Un repartidor se acercará a tu negocio para entregar tu pedido.").fadeIn(300, function() {
                                            setTimeout(function() {
                                                $("#alertStock").fadeOut(300, function() {
                                                    $(this).html("");
                                                    setTimeout(function() {
                                                        cargarMiNegocio()
                                                    }, 500)
                                                });
                                            }, 5000)
                                        });
                                    }

                                });

                            } else {
                                $(".zona-carrito").fadeOut(300, function() {
                                    if ($("#alertStock").css("display") != "block") {
                                        $("#alertStock").html("No tienes suficiente dinero.").fadeIn(300, function() {
                                            setTimeout(function() {
                                                $("#alertStock").fadeOut(300, function() {
                                                    $(this).html("");


                                                });
                                            }, 5000)
                                        });
                                    }
                                });
                            }
                        });
                    }
                });


            });
        });

    }


}


function cargarGestionAdmin() {

    //CARGAR EVENTOS POST
    $("#eventos tbody").html('');
    $.post('https://origen_masterJob/recieveEvent', JSON.stringify({}), function(data) {
        data.forEach(function(events, i) {
            $("#eventos tbody").append(`
            <tr>
                <td class="id">${events.id}</td>
                <td class="titulo">${events.title}</td>
                <td class="desc">${events.desc} </td>
                <td>
                    <button class="btn btn-sm btn-secondary mr-1 editar" data-id="event-edit"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-secondary eliminar" data-id="event-delete"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
            `);
            if (i == data.length - 1) {

                $("#eventos tbody .editar").off("click").on("click", function() {

                    let id = $(this).parent().parent().find(".id").text();
                    let titulo = $(this).parent().parent().find(".titulo").text();
                    let desc = $(this).parent().parent().find(".desc").text();
                    $("#idEvento").val(id);
                    $("#titulo-editar-evento").val(titulo);
                    $("#desc-editar-evento").val(desc);
                    $("#dialogEventos").fadeIn(300);
                    $("#closeDialogEventos").off("click").on("click", function() {
                        $("#dialogEventos").fadeOut(300);
                    })

                    $("#saveEvento").off("click").on("click", function() {
                        if ($("#titulo-editar-evento").val().length > 3 || $("#desc-editar-evento").val().length > 3) {
                            editevento = JSON.stringify({ title: $("#titulo-editar-evento").val(), desc: $("#desc-editar-evento").val(), id: $("#idEvento").val() });
                            $.post('https://origen_masterJob/save-editevent', editevento);
                            $("#dialogEventos").fadeOut(300);
                            setTimeout(() => { cargarGestionAdmin() }, 300);
                        }

                    })

                });

                $("#eventos tbody .eliminar").off("click").on("click", function() {
                    let id = $(this).parent().parent().find(".id").text();
                    eventid = JSON.stringify({ id });
                    $.post('https://origen_masterJob/delete-event', eventid);
                    setTimeout(() => { cargarGestionAdmin() }, 300);
                });
            }
        })
    });

    $("#btn-crear-evento").off("click").on("click", function() {
        $("#dialogNuevoEvento").fadeIn(300, function() {
            $("#closeDialogNuevoEvento").off("click").on("click", function() {
                $("#dialogNuevoEvento").fadeOut(300);
            })

            $("#saveNuevoEvento").off("click").on("click", function() {
                if ($("#titulo-evento").val().length > 3 || $("#desc-evento").val().length > 3) {
                    evento = JSON.stringify({ title: $("#titulo-evento").val(), desc: $("#desc-evento").val() });
                    $.post('https://origen_masterJob/save-event', evento);
                    //POST PARA GUARDAR EL EVENTO
                    $("#dialogNuevoEvento").fadeOut(300);
                    setTimeout(() => { cargarGestionAdmin() }, 300);
                }

            })

        });
    });


    $("#nav-gangs, #nav-gangs-content").html('');
    $("#select-gang").html(`<option disabled selected>Selecciona una organización</option>`);
    $("#btn-crear-mision").off("click").on("click", function() {
        $("#dialogNuevaMision").fadeIn(300, function() {
            $("#closeDialogNuevaMision").off("click").on("click", function() {
                $("#dialogNuevaMision").fadeOut(300);
            })

            $("#select-gang").prop('selectedIndex', 0);

            $("#saveNuevaMision").off("click").on("click", function() {
                if ($("#titulo-mision").val().length > 3 && $("#desc-mision").val().length > 3 && $("#select-gang").val() != "") {
                    mision = JSON.stringify({ title: $("#titulo-mision").val(), desc: $("#desc-mision").val(), gang: $("#select-gang").val(), level: $("#level-mision").val() });

                    //POST PARA GUARDAR EL EVENTO
                    $.post('https://origen_masterJob/save-mission', mision);
                    $("#dialogNuevaMision").fadeOut(300);
                    setTimeout(() => { cargarGestionAdmin() }, 300);
                }

            })

        });
    });

    $.post('https://origen_masterJob/recieveGangsName', JSON.stringify({}), function(data) {
        let infoGang = `
        <div class="gang-info">
            <h4 class="nombre-gang">Cargando...</h4>
            <div class="row zona-info-gangs">
                <div class="col-sm-6 p-2">
                    <h5 class="mb-3">Nivel</h5>
                    <button class="btn btn-secondary restar">-</button>
                    <span class="nivel-gang contador">0</span>
                    <button class="btn btn-secondary sumar">+</button>


                </div>
                <div class="col-sm-6 p-2">
                    <h5 class="mb-3">Respeto</h5>
                    <button class="btn btn-secondary restar">-</button>
                    <span class="respeto-gang contador">0</span>
                    <button class="btn btn-secondary sumar">+</button>


                </div>
                <div class="col-sm-6 mt-3">
                    <h5>Robos</h5>
                    <ul class="robs-gang">
                        
                    </ul>
                </div>
                <div class="col-sm-6 mt-3">
                    <h5>Venta de drogas</h5>
                    <ul class="drogas-gang">
                        
                    </ul>
                </div>
                <div class="col-md-12 text-right">
                    <button class="btn btn-secondary guardar-gang">Guardar cambios</button>
                    
                </div>
            </div>
        </div>
        <h4 class="mb-2">Misiones</h4>

        `;
        data.forEach(function(gangName, i) {

            $("#select-gang").append(`<option value="${gangName}">${gangName}</option>`);

            if (i == 0) {
                $("#nav-gangs").append(`
                    <a class="nav-link active" data-gang="${gangName}" id="v-pills-home-tab" data-toggle="pill" href="#gang-${gangName}-content" role="tab" aria-controls="gang-${gangName}-content" aria-selected="true">${gangName}</a>
    
                `);
                $("#nav-gangs-content").append(`
                    <div class="tab-pane fade show active" id="gang-${gangName}-content" role="tabpanel" aria-labelledby="v-pills-home-tab">
                      ${infoGang}
                    </div>
    
                `);
                $("#gang-" + gangName + "-content").append(`
                    <table id="table-missions-${gangName}" class="criminal-records table-missions mt-0">
                    <thead>
                        <tr>
                            
                                <td style="width:5%;" class="text-center">Nivel</td>
                                <td style="width:30%">Nombre</td>
                                <td style="width:30%">Descripción</td>
                                <td style="width:10%" class="text-center">Estado</td>
                                <td style="width:10%" class="text-center">Gestión</td>
                            
                        </tr>
                        </thead>
                        <tbody id="gang-${gangName}-missions">
                            
                        </tbody>
                </table>
            `);
                // if (gang.missions.length > 0) {
                //     showMissions(gangName);

                // } else {
                //     $("#gang-" + gangName + "-content .cargando-misiones").fadeOut(300, function() {
                //         $("#gang-" + gangName + "-content").append(`
                //         <div class="alert alert-dark" role="alert">
                //         No se han añadido misiones.
                //       </div>
                //         `);
                //     });
                // }
            } else {
                $("#nav-gangs").append(`
                    <a class="nav-link" id="v-pills-home-tab" data-toggle="pill" href="#gang-${gangName}-content" role="tab" aria-controls="gang-${gangName}-content" aria-selected="true">${gangName}</a>
    
                 `);

                $("#nav-gangs-content").append(`
                    <div class="tab-pane fade" id="gang-${gangName}-content" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                      ${infoGang}
                    </div>
    
                `);
                $("#gang-" + gangName + "-content").append(`
                    <table id="table-missions-${gangName}" class="criminal-records table-missions mt-0">
                    <thead>
                        <tr>
                            
                                <td style="width:5%;" class="text-center">Nivel</td>
                                <td style="width:30%">Nombre</td>
                                <td style="width:30%">Descripción</td>
                                <td style="width:10%" class="text-center">Estado</td>
                                <td style="width:10%" class="text-center">Gestión</td>
                            
                        </tr>
                        </thead>
                        <tbody id="gang-${gangName}-missions">
                            
                        </tbody>
                </table>
            `);
                // if (gang.missions.length > 0) {
                //     showMissions(gangName);

                // } else {
                //     $("#gang-" + gangName + "-content .cargando-misiones").fadeOut(300, function() {
                //         $("#gand-" + gangName + "-content").html(`
                //         <div class="alert alert-dark" role="alert">
                //         No se han añadido misiones.
                //       </div>
                //         `);
                //     });
                // }
            }

            if (i == data.length - 1) {
                $.post('https://origen_masterJob/recieveMissionsGangs', JSON.stringify({}), function(data2) {
                    showMissions(data2);
                    // data2.forEach(function(missionsGangs, i) {

                    //      console.log(JSON.stringify(missionsGangs))
                    //    showMissions(missionsGangs)
                    // })
                });

                $.post('https://origen_masterJob/recieveDataGangs', JSON.stringify({}), function(data2) {
                    
                    showInfoGang(data2);
                    // data2.forEach(function(missionsGangs, i) {

                    //      console.log(JSON.stringify(missionsGangs))
                    //    showMissions(missionsGangs)
                    // })
                });
            }




            // console.log(JSON.stringify(gangName))

        })
    });






}


function showMissions(missions) {

    missions.forEach(function(mission, i) {
        let estado = '';

        if (mission.complete) {
            estado = '<i class="fas fa-check-circle"></i><input type="text" style="display:none" value="' + mission.complete + '" class="estado-mision">';
        } else {
            estado = '<i class="fas fa-times-circle"></i><input type="text" style="display:none" value="' + mission.complete + '" class="estado-mision">';
        }
        $("#gang-" + mission.gang + "-missions").append(`
            <tr>
                <td class="text-center level">${mission.level}</td>
                <td class="titulo">${mission.title}</td>
                <td class="desc">${mission.description}</td>
                <td class="text-center estado">${estado}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-secondary mr-1 editar-mision" data-id-mission="${mission.id}" data-id-gang="${mission.gang}"><i class="fas fa-edit"></i> Editar</button>
                  
                </td>
            </tr>
        `);
        if (i == missions.length - 1) {
            $("#gang-" + mission.id + "-content .cargando-misiones").fadeOut(300, function() {
                $("#table-missions-" + mission.id).fadeIn(300);
            });

            $(".editar-mision").off("click").on("click", function() {
                let missionId = $(this).attr("data-id-mission");
                let gangId = $(this).attr("data-id-gang");
                let titulo = $(this).parent().parent().find(".titulo").text();
                let desc = $(this).parent().parent().find(".desc").text();
                let level = $(this).parent().parent().find(".level").text();
                let estadoMision = parseInt($(this).parent().parent().find(".estado-mision").val());
                $("#idMision").val(missionId);
                $("#idGang").val(gangId);
                $("#titulo-editar-mision").val(titulo);
                $("#desc-editar-mision").val(desc);



                if (estadoMision) {
                    $("#completada").prop("checked", true);
                } else {
                    $("#sin-completar").prop("checked", true);
                }

                $("#editar-level").val(parseInt(level));
                $("#dialogEditarMision").fadeIn(300);
                $("#closeDialogEditarMision").off("click").on("click", function() {
                    $("#dialogEditarMision").fadeOut(300);
                })

                $("#saveMision").off("click").on("click", function() {
                    if ($("#titulo-editar-mision").val().length > 3 && $("#desc-editar-mision").val().length > 3) {
                        editmision = JSON.stringify({ title: $("#titulo-editar-mision").val(), desc: $("#desc-editar-mision").val(), id: parseInt(missionId), gang: gangId, level: parseInt($("#editar-level").val()), complete: parseInt($('input:radio[name="check-completado"]:checked').val()) });

                        $.post('https://origen_masterJob/save-editmission', editmision);
                        $("#dialogEditarMision").fadeOut(300);
                        setTimeout(() => { cargarGestionAdmin() }, 300);
                    }

                })

                $("#deleteMision").off("click").on("click", function() {
                    deletemision = JSON.stringify({ id: parseInt($("#idMision").val()) });
                    console.log(deletemision);
                    $.post('https://origen_masterJob/deletemission', deletemision);
                    $("#dialogEditarMision").fadeOut(300);
                    setTimeout(() => { cargarGestionAdmin() }, 300);
                })
            });
        }
    });


}

function showInfoGang(data2) {

    data2.forEach(function(data, i) {
        let robos = JSON.parse(data.robs);
        let drogas = JSON.parse(data.drugs);
        $("#gang-"+data.gang+"-content .nombre-gang").html(data.gang);
        $("#gang-"+data.gang+"-content .nivel-gang").html(data.level);
        $("#gang-"+data.gang+"-content .respeto-gang").html(data.respect);
        
        if(robos!=undefined){
            if(robos.length==undefined){
                for (var i in robos){
                    $("#gang-"+data.gang+"-content .robs-gang").append(`<li><b>${i}:</b> ${robos[i]}</li>`);
                              
                }
            }
        }

        if(drogas!=undefined){
            if(drogas.length==undefined){
                for (var i in drogas){
                    $("#gang-"+data.gang+"-content .drogas-gang").append(`<li><b>${i}</b>: ${drogas[i]}</li>`);
                              
                }
            }
        }
    });

    $(".sumar").off("click").on("click", function(){
        let val = parseFloat($(this).parent().find('.contador').html());
        if((val+0.1)<=10){
            val+=0.1;
            $(this).parent().find('.contador').html(val.toFixed(1));
        }
    });

    $(".restar").off("click").on("click", function(){
        let val = parseFloat($(this).parent().find('.contador').html());
        if((val-0.1)>=0){
            val-=0.1;
            $(this).parent().find('.contador').html(val.toFixed(1));
        }
    });
    
    $(".guardar-gang").off("click").on("click", function(){
        let boton = $(this);
        $(this).attr("disabled","true");
        $(this).text("Guardando...");
        let level = parseFloat($(this).parent().parent().find('.nivel-gang').html()).toFixed(1);
        let respect = parseFloat($(this).parent().parent().find('.respeto-gang').html()).toFixed(1);
        let gang = $(this).parent().parent().parent().find('.nombre-gang').text();
        editgang = JSON.stringify({ level:level, respect:respect, gang:gang });

                        $.post('https://origen_masterJob/save-editgang', editgang);
                        
                        setTimeout(() => { boton.prop('disabled', false);; boton.text("Guardar cambios") }, 1000);
    });

}
