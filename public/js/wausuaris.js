$(document).ready(function () {
    // ****************
    // Llistat Usuaris
    var taulausuaris = $('#taula').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        autoWidth: false,
        pageLength: 20,
        ajax: "usuari",
        order: [[ 4, "desc" ]],
        columns: [
            { "data": "id", "width": "5%" },
            { "data": "nom", "width": "15%" },
            { "data": "cognoms", "width": "15%" },
            { "data": "dni", "width": "5%" },
            { "data": "dataini", "width": "10%" },
            { "data": "datafi", "width": "10%" }
        ],
        columnDefs: [
            { responsivePriority: 1, targets: 1 },
            { responsivePriority: 2, targets: 0 },
            { responsivePriority: 3, targets: 2 },
            { responsivePriority: 4, targets: 3 }
        ],
        select: true,
        buttons: [
            // boto afegir
            {
                text: '<i id="btafegirusuari" class="fa fa-user-plus"></i>',
                titleAttr: 'nou usuari',
                action: function(event) {
                    $('#afegirusuariguardar').removeClass('modificar');
                    $('#afegirusuariguardar').removeClass('mostrar');
                    $('#afegirusuariguardar').addClass('nou');
                    $('#afegirusuariguardar').show();
                    $('#myModal').show();
                    $('#titolmodalafegir').html('Nou usuari');
                    $('#afegirusuariform :input').val('').prop('disabled', false);
                    $('.nomodif').prop('disabled',true);
                    event.stopPropagation();
                    $('#nom').focus();
                }
            },
            // boto modificar
            {
                text: '<i class="fa fa-user-md"></i>',
                titleAttr: 'editar usuari',
                action: function(event) {
                    var usuari = taulausuaris.rows('.selected').data()[0];
                    if(usuari) {
                        $('#afegirusuariguardar').removeClass('nou');
                        $('#afegirusuariguardar').removeClass('mostrar');
                        $('#afegirusuariguardar').addClass('editar');
                        $('#afegirusuariguardar').show();
                        $('#myModal').show();
                        $('#titolmodalafegir').html('Editar usuari');
                        $('#id').val(usuari['id']);
                        $('#nom').val(usuari['nom']);
                        $('#cognoms').val(usuari['cognoms']);
                        $('#dni').val(usuari['dni']);
                        $('#dataini').val(usuari['dataini']);
                        $('#datafi').val(usuari['datafi']);
                        $('#afegirusuariform :input').not('.nomodif').prop('disabled', false);
                        event.stopPropagation();
                        $('#nom').focus();
                    } else {
                        alert('cal seleccionar un usuari');
                    }
                }
            },
            // boto eliminar
            {
                text: '<i class="fa fa-user-times"></i>',
                titleAttr: 'eliminar usuari/s',
                action: function() {
                    if(taulausuaris.rows({ selected: true }).count()>=1) {
                        var idusuari = taulausuaris.rows({ selected: true }).data().toArray()[0]['id'];
                        $.ajax({
                            url: "usuari/" + idusuari,
                            async: false,
                            type: 'delete',
                            success: function(result) {
                                taulausuaris.ajax.reload();
                            }
                        });
                    }
                    else {
                        if(taulausuaris.rows({ selected: true }).count()==0) alert("selecciona un usuari");
                        //if(taulausuaris.rows({ selected: true }).count()>1) alert("selecciona només un usuari");
                    }
                }
            },
            // boto mostrar
            {
                text: '<i class="fa fa-list-alt"></i>',
                titleAttr: 'mostrar usuari',
                action: function(event) {
                    var usuari = taulausuaris.rows('.selected').data()[0];
                    if(usuari) {
                        $('#afegirusuariguardar').removeClass('nou');
                        $('#afegirusuariguardar').removeClass('editar');
                        $('#afegirusuariguardar').addClass('mostrar');
                        $('#afegirusuariguardar').hide();
                        $('#myModal').show();
                        $('#titolmodalafegir').html('Mostrar usuari');
                        $('#id').val(usuari['id']);
                        $('#nom').val(usuari['nom']).prop('disabled', true);
                        $('#cognoms').val(usuari['cognoms']).prop('disabled', true);
                        $('#dni').val(usuari['dni']).prop('disabled', true);
                        $('#dataini').val(usuari['dataini']).prop('disabled', true);
                        $('#datafi').val(usuari['datafi']).prop('disabled', true);
                        $('#sensorh2o').val(usuari['sensorh2o']).prop('disabled', true);
                        $('#sensorelec').val(usuari['sensorelec']).prop('disabled', true);
                        $.ajax({
                            url: "/usuari/consum/" + usuari['id'],
                            async: false,
                            type: 'get',
                            success: function(result) {
                                $('#h2o').val(result['data'][0]['h2o']);
                                $('#elec').val(result['data'][0]['elec']);
                                console.log(result['data'][0]['idsensorh2o']);
                                console.log(result['data'][0]['idsensorelec']);
                                $("#idsensorh2o option[value='" + result['data'][0]['idsensorh2o'] + "']").prop('selected',true);
                                $("#idsensorelec option[value='" + result['data'][0]['idsensorelec'] + "']").prop('selected',true);
                            }
                        });
                        event.stopPropagation();
                        $('#nom').focus();
                    } else {
                        alert('cal seleccionar un usuari');
                    }
                }
            },
            {
                extend:    'copyHtml5',
                text:      '<i class="fa fa-files-o"></i>',
                titleAttr: 'Copy'
            },
            {
                extend:    'excelHtml5',
                text:      '<i class="fa fa-file-excel-o"></i>',
                titleAttr: 'Excel'
            },
            {
                extend:    'csvHtml5',
                text:      '<i class="fa fa-file-text-o"></i>',
                titleAttr: 'CSV'
            },
            {
                extend:    'pdfHtml5',
                text:      '<i class="fa fa-file-pdf-o"></i>',
                titleAttr: 'PDF'
            },
        ],
    });

    $.validator.setDefaults({
        success: 'valid',
        rules: {
            nom: {
                required: true
            },
            cognoms: {
                required: true
            },
            dni: {
                required: true,
                min:      10000000,
                max:      99999999
            },
        },
        errorPlacement: function(error, element){
            error.insertAfter(element);
        },
        highlight: function(element){
            //$(element).parent('.field_container').removeClass('valid').addClass('error');
        },
        unhighlight: function(element){
            //$(element).parent('.field_container').addClass('valid').removeClass('error');
        }
    });

    var afegirusuariform = $('#afegirusuariform');
    $.validator.addMethod(
        'datahora',
        function(){
        },
        'Format de data incorrecte. AAAA-MM-DD HH:MM'
    );
    afegirusuariform.validate();

    // Enviar formulari afegir(post)/modificar(put)
    $('#afegirusuariguardar').on('click', function() {
        if (afegirusuariform.valid() == true){
            var form_data = $('#afegirusuariform').serialize();
            var metode = $('#afegirusuariguardar').hasClass('editar') ? 'put' : 'post';
            //afegir usuari a la bdd
            $.ajax({
                url: "usuari",
                async: false,
                type: metode,
                data: form_data,
                success: function(result) {
                    if(result!=true) {
                        alert(result[0].errorInfo[2]);
                    }
                    console.log('afegir usuari: ' + result);
                }
            });
            if((moment($('#dataini').val()).isValid()) && (moment($('#datafi').val()).isValid())) {
                if($('#afegirusuariguardar').hasClass('editar')) {
                    $.ajax({
                        url: "reserva",
                        async: false,
                        type: 'post',
                        data: form_data,
                        success: function(result) {
                            if(result!=true) {
                                alert(result[0].errorInfo[2]);
                            }
                            console.log('afegir reserva: ' + result);
                        }
                    });
                }
            } else {
                // data no ok -> només s'actualitzaran les dades de l'usuari, no pas de la reserva
                console.log('només actualització dades usuari, no es crea ni modifica reserva');
            }
            taulausuaris.ajax.reload();
            $('#myModal').hide();
        }
    });

    // Omplir listbox modals d'edicio/modificacio d'usuaris
    var url = "/h2o/lliures/2016-12-19%2012:00/2016-12-20%2012:00";
    $.ajax({
        url: url,
        async: false,
        type: 'get',
        success: function(result) {
            $("#idsensorh2o").append($("<option></option>").attr("value","0").text("--"));
            $.each(result, function(propietat,valor) {
                    $("#idsensorh2o").append($("<option></option>").attr("value",valor.id).text(valor.descripcio));
            });
        }
    });
    $.ajax({
        url: "/sensorselec",
        async: false,
        type: 'get',
        success: function(result) {
            $.each(result, function(propietat,valor) {
                if(valor.estat === "lliure") {
                    $("#idsensorelec").append($("<option></option>").attr("value",valor.id).text(valor.descripcio));
                } else {
                    $("#idsensorelec").append($("<option></option>").attr("value",valor.id).text(valor.descripcio).prop('disabled', true));
                }
            });
        }
    });




    // Datepicker
    $('#dataini').dateRangePicker({
        autoClose: true,
        singleDate: true,
        time: {
            enabled: true
        },
        format: 'YYYY-MM-DD HH:mm',
    });
    $('#datafi').dateRangePicker({
        autoClose: true,
        singleDate: true,
        time: {
            enabled: true
        },
        format: 'YYYY-MM-DD HH:mm',
    });
    
});
