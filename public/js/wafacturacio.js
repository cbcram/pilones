$(document).ready(function () {
    // ****************
    // Llistat Usuaris
    var taulausuaris = $('#taula').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        autoWidth: false,
        ajax: "usuaris/reserva",
        columns: [
            { "data": "id", "width": "5%" },
            { "data": "nom", "width": "15%" },
            { "data": "cognoms", "width": "24%" },
            { "data": "dni", "width": "10%" },
            { "data": "dataini", "width": "14%" },
            { "data": "datafi", "width": "14%" },
            { "data": "h2o", "width": "9%" },
            { "data": "elec", "width": "9%" }
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
                text: '<i id="btafegirusuari" class="fa fa-calendar-plus-o"></i>',
                titleAttr: 'nova reserva',
                action: function(event) {
                    $('#myModal').show();
                    event.stopPropagation();
                    $('#nom').focus();
                }
            },
            {
                text: '<i class="fa fa-edit"></i>',
                titleAttr: 'editar reserva',
                action: function() {
                    console.log('modificar');
                    var a = taulausuaris.columns().data();
                    console.log(a);
                }
            },
            {
                text: '<i class="fa fa-calendar-times-o"></i>',
                titleAttr: 'eliminar reserva',
                action: function() {
                    if(taulausuaris.rows({ selected: true }).count()>=1) {
                        var idusuari = taulausuaris.rows({ selected: true }).data().toArray()[0]['id'];
                        $.ajax({
                            url: "usuari/" + idusuari,
                            async: false,
                            type: 'delete',
                            success: function(result) {
                                taulausuaris.ajax.reload();
                                console.log(result);
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

    $('#novareservaguardar').on('click', function() {
        if (afegirusuariform.valid() == true){
            var form_data = $('#afegirusuariform').serialize();
            $.ajax({
                url: "usuari",
                async: false,
                type: 'post',
                data: form_data,
                success: function(result) {
                    taulausuaris.ajax.reload();
                    if(result!=true) {
                        alert(result[0].errorInfo[2]);
                    }
                    //console.log(result[1]);
                }
            });
        }
    });
    
});
