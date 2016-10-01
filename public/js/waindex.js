$(document).ready(function () {
    // ****************
    // knobs
    var estat = "lliure";
    var tph2o = 0;
    var tpelec = 0;
    var tpanomalia = 0;
    var nanomalia =0;
    var nsensors = 0;

    // knob H2O
    $.ajax({
        url: window.location.href + "h2o/total/status",
        async: false,
        success: function(result) {
            var total = 0;
            var nestat = 0;
            $.map(result, function(elm) {
                total += +elm.total;
                nestat = (elm.estat === estat) ? elm.total : nestat;
                nanomalia = (elm.estat === "anomalia") ? (nanomalia + elm.total) : nanomalia;
                return elm;
            });
            tph2o = +(100 * +nestat / total);
            nsensors += total;
        }
    });
    var colorestat = (estat == "lliure") ? "#aadeff" : ((estat == "ocupat") ? "#3333ff" : "#ff0000");
    $(".knh2o").knob({
        width: '100%',
        height: '100%',
        fgColor: colorestat,
        readOnly: true,
    });
    $(".knh2o").val(tph2o).trigger('change');

    // knob Elec
    $.ajax({
        url: window.location.href + "elec/total/status",
        async: false,
        success: function(result) {
            var total = 0;
            var nestat = 0;
            $.map(result, function(elm) {
                total += +elm.total;
                nestat = (elm.estat === estat) ? elm.total : nestat;
                nanomalia = (elm.estat === "anomalia") ? (nanomalia + elm.total) : nanomalia;
                return elm;
            });
            tpelec = +(100 * +nestat / total);
            nsensors += total;
        }
    });
    var colorestat = (estat == "lliure") ? "#FFC200" : ((estat == "ocupat") ? "#FF8500" : "#FF0000");
    $(".knelec").knob({
        width: '100%',
        height: '100%',
        fgColor: colorestat,
        readOnly: true,
    });
    $(".knelec").val(tpelec).trigger('change');

    // knob Anomalia
    tpanomalia = +(100 * +nanomalia / nsensors);
    var colorestat = (estat == "anomalia") ? "#FFC200" : ((estat == "ocupat") ? "#FF8500" : "#FF0000");
    $(".knanomalia").knob({
        width: '100%',
        height: '100%',
        fgColor: colorestat,
        readOnly: true,
    });
    $(".knanomalia").val(tpanomalia).trigger('change');

    // ****************
    // Taula 1
    $('#taula').DataTable({
        responsive: true,
        autoWidth: false,
        ajax: window.location.href + "sensors/regs",
        columns: [
            { "data": "idregh2o", "width": "5%" },
            { "data": "datareg", "width": "25%" },
            { "data": "valor", "width": "15%" },
            { "data": "idsensorh2o", "width": "5%" },
            { "data": "missatge", "width": "20%" },
            { "data": "tipus", "width": "15%" }
        ],
        columnDefs: [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: -1 },
            { responsivePriority: 3, targets: 1 },
            { responsivePriority: 4, targets: 2 },
            { responsivePriority: 5, targets: 3 },
            { responsivePriority: 6, targets: 4 },
            { responsivePriority: 7, targets: 5 }
        ],
        display: "stripe",
    });

    // ****************
    // Chart de la BDD
    var dies, valors_elec, valors_h2o;
    $.ajax({
        url: window.location.href + "sensors/acc/dia",
        async: false,
        success: function(result) {
            dies = result.map(function(obj) {
                return obj.data_registre;
            });
            valors_elec = result.map(function(obj) {
                return obj.total_dia_elec;
            });
            valors_h2o = result.map(function(obj) {
                return obj.total_dia_h2o;
            });
        }
    });
    var ctx = $("#grafconsums");
    var myChart = new Chart(ctx, {
        type: 'bar',
        responsive: true,
        data: {
            labels: dies,
            datasets: [
                {
                    label: 'H2O',
                    data: valors_h2o,
                    backgroundColor: '#aadeff',
                    borderColor: '#aadeff',
                    borderWidth: 1
                },
                {
                    label: 'Elec',
                    data: valors_elec,
                    backgroundColor: '#FFC200',
                    borderColor: '#FFC200',
                    borderWidth: 1
                },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });
});

/* menu */
$(window).scroll(function() {
    if ($(this).scrollTop() > 25){  
        $('header').addClass("sticky");
        $('.descripcio').hide();
    }
    else{
        if ($(window).width() >= 720 ){
            $('header').removeClass("sticky");
            $('.descripcio').show();
        }
        else {
            $('header').removeClass("sticky");
        }
    }
});
