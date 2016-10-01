$(document).ready(function () {
    console.log("http://pilones/usuari/llista");
    // ****************
    // Llistat Usuaris
    var taulausuaris = $('#taula').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        autoWidth: false,
        ajax: "http://pilones/usuari/llista",
        columns: [
            { "data": "idusuari", "width": "5%" },
            { "data": "nom", "width": "25%" },
            { "data": "cognoms", "width": "15%" },
            { "data": "dni", "width": "5%" }
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
                text: '<i class="fa fa-user-plus"></i>',
                action: function() {
                    alert('afegir usuari');
                },
                titleAttr: 'afegir usuari'
            },
            {
                text: '<i class="fa fa-user-md"></i>',
                action: function() {
                    alert('modificar usuari');
                },
                titleAttr: 'modificar usuari'
            },
            {
                text: '<i class="fa fa-user-times"></i>',
                action: function() {
                    alert('eliminar usuari/s');
                },
                titleAttr: 'eliminar usuari/s'
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
    
});
