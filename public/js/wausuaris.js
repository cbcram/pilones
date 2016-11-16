$(document).ready(function () {
    // ****************
    // Llistat Usuaris
    var taulausuaris = $('#taula').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        autoWidth: false,
        ajax: "usuari",
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
            {
                text: '<i id="btafegirusuari" class="fa fa-user-plus"></i>',
                titleAttr: 'afegir usuari',
                action: function(event) {
                    $('#myModal').show();
                    event.stopPropagation();
                    $('#nom').focus();
                }
            },
            {
                text: '<i class="fa fa-user-md"></i>',
                titleAttr: 'modificar usuari',
                action: function(event) {
                    var usuari = taulausuaris.rows('.selected').data()[0];
                    if(usuari) {
                        $('#myModal').show();
                        $('#titolmodalafegir').html('Modificar usuari');
                        $('#id').val(usuari['id']);
                        $('#nom').val(usuari['nom']);
                        $('#cognoms').val(usuari['cognoms']);
                        $('#dni').val(usuari['dni']);
                        event.stopPropagation();
                        $('#nom').focus();
                        $('#afegirusuariguardar').toggleClass('modificar');
                    }
                }
            },
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
    afegirusuariform.validate();

    $('#afegirusuariguardar').on('click', function() {
        if (afegirusuariform.valid() == true){
            var form_data = $('#afegirusuariform').serialize();
            var metode = $('#afegirusuariguardar').hasClass('modificar') ? 'put' : 'post';
            $.ajax({
                url: "usuari",
                async: false,
                type: metode,
                data: form_data,
                success: function(result) {
                    taulausuaris.ajax.reload();
                    if(result!=true) {
                        alert(result[0].errorInfo[2]);
                    }
                }
            });
            $('#afegirusuariguardar').removeClass('modificar');
        }
    });
    
});
