<?php
// Routes

// ****** API ******

// ****** H2O ******
// H2O total per estat de les pilones (lliure,ocupat,anomalia)
$app->get('/h2o/total/status[/{estat}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/h2o/total/status' route");

    // Query database
    $strqry ="SELECT estat, COUNT(estat) AS total FROM sensorsh2o GROUP BY estat";
    if( isset($args['estat']) ){
        $strqry ="SELECT COUNT(estat) AS total FROM sensorsh2o WHERE estat like '" . $args['estat'] ."'";
    }
    
    $qry = $this->db->query($strqry);
    //$data = array('data' => $qry->fetchAll());
    $qryresult = $qry->fetchAll();
    
    // Return json
    $response = $response->withJson($qryresult,200);
    return $response;

});

$app->get('/h2o/totalstatus[/{estat}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/h2o/totalstatus' route");

    // Render index view
    return $this->renderer->render($response, 'totalstatus.phtml', $args);
    
});

// H2O valors acumulats per dia
$app->get('/h2o/acc/dia[/{mindia}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/h2o/acc/dia' route");

    // Query database
    $strqry ="SELECT DATE(datareg) as data_registre, sum(valor) AS total_dia FROM registresh2o GROUP BY data_registre";
    if( isset($args['mindia']) ){
        // TO-DO
    }
    
    $qry = $this->db->query($strqry);
    //$data = array('data' => $qry->fetchAll());
    $qryresult = $qry->fetchAll();
    
    // Return json
    $response = $response->withJson($qryresult,200);
    return $response;

});

// Afegir registre H2O
$app->post('/h2o', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/h2o:POST' route");

    // Extreure dades del Request
    $pars = $request->getParsedBody();
    $datareg = $pars['datareg'];
    $valor = $pars['valor'];
    $idsensorh2o = $pars['idsensorh2o'];
    $missatge = $pars['missatge'];

    // Afegir a la bdd
    $strqry ="INSERT INTO registresh2o (id, datareg, valor, idsensorh2o, missatge) VALUES (NULL, '" . $datareg . "', '" . $valor . "', '" . $idsensorh2o . "', '" . $missatge . "')";
    $qry = $this->db->prepare($strqry);
    $exqry = array();
    try {
        $qryrst = $qry->execute();
        //array_push($exqry,$strqry);
        //array_push($exqry,$qryrst);
        $exqry = $qryrst;
    } catch (Exception $e) {
        array_push($exqry,$e);
        array_push($exqry,$strqry);
    }

    $response = $response->withJson($exqry,200);
    return $response;

});


// ****** ELEC ******
// ELEC total per estat de les pilones (lliure,ocupat,anomalia)
$app->get('/elec/total/status[/{estat}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/elec/total/status' route");

    // Query database
    $strqry ="SELECT estat, COUNT(estat) AS total FROM sensorselec GROUP BY estat";
    if( isset($args['estat']) ){
        $strqry ="SELECT COUNT(estat) AS total FROM sensorselec WHERE estat like '" . $args['estat'] ."'";
    }
    
    $qry = $this->db->query($strqry);
    //$data = array('data' => $qry->fetchAll());
    $qryresult = $qry->fetchAll();
    
    // Return json
    $response = $response->withJson($qryresult,200);
    return $response;

});

$app->get('/elec/totalstatus[/{estat}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/elec/totalstatus' route");

    // Render index view
    return $this->renderer->render($response, 'totalstatus.phtml', $args);
    
});

// ELEC valors acumulats per dia
$app->get('/elec/acc/dia[/{mindia}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/elec/acc/dia' route");

    // Query database
    $strqry ="SELECT DATE(datareg) as data_registre, sum(valor) AS total_dia FROM registreselec GROUP BY data_registre";
    if( isset($args['mindia']) ){
        // TO-DO
    }
    
    $qry = $this->db->query($strqry);
    //$data = array('data' => $qry->fetchAll());
    $qryresult = $qry->fetchAll();
    
    // Return json
    $response = $response->withJson($qryresult,200);
    return $response;

});


// ****** SENSORS ******
// Sensors: last n sensor registers
$app->get('/sensors/regs[/{num}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/sensors/regs/num' route");

    // Query database
    $strqry ="SELECT *, 'h2o' AS tipus FROM registresh2o UNION SELECT *, 'elec' AS tipus FROM registreselec";
    if( isset($args['num']) ){
        $strqry ="SELECT *, 'h2o' AS tipus FROM registresh2o UNION SELECT *, 'elec' AS tipus FROM registreselec LIMIT " . $args['num'];
    }
    
    $qry = $this->db->query($strqry);
    $data = array('data' => $qry->fetchAll());
    $qryresult = $qry->fetchAll();
    
    // Return json
    $response = $response->withJson($data,200);
    return $response;

});

$app->get('/sensors/acc/dia[/{mindia}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/sensors/acc/dia' route");

    // Query database
    $strqry = 'SELECT DATE(datareg) as data_registre, sum(valor) AS total_dia, "elec" as tipus FROM registreselec GROUP BY data_registre ' .
              'UNION ' .
              'SELECT DATE(datareg) as data_registre, sum(valor) AS total_dia, "h2o" as tipus FROM registresh2o GROUP BY data_registre ' .
              'ORDER BY data_registre,tipus';
    if( isset($args['mindia']) ){
        // TO-DO
    }
    
    $qry = $this->db->query($strqry);
    $qryresult = $qry->fetchAll();
    $rstunificats = array_map('unificar_valors',$qryresult);
    $rst = unificar_duplicats($rstunificats);
    
    // Return json
    $response = $response->withJson($rst,200);
    return $response;
});


// ******* USUARIS *******
// Llistat de tots els usuaris
$app->get('/usuari', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/usuari' route");

    // Query database
    $strqry = "SELECT u.id, u.nom, u.cognoms, u.dni, MAX(r.dataini) AS dataini, MAX(r.datafi) AS datafi " .
              "FROM usuaris AS u " .
              "LEFT JOIN reserves AS r ON u.id = r.idusuari " .
              "GROUP BY u.id, u.nom";
    
    $qry = $this->db->query($strqry);
    $data = array('data' => $qry->fetchAll());
    $qryresult = $qry->fetchAll();
    
    // Return json
    $response = $response->withJson($data,200);
    return $response;

});

// Llistat amb reserva actual
$app->get('/usuaris/actius', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/usuaris/actius' route");

    // Query database
    $strqry ="SELECT * " .
             "FROM reserves INNER JOIN usuaris ON (reserves.idusuari = usuaris.id) " .
             "INNER JOIN sensorsh2o ON sensorsh2o.id = reserves.idsensorh2o " .
             "INNER JOIN sensorselec ON sensorselec.id = reserves.idsensorelec " .
             "WHERE (NOW() BETWEEN dataini AND datafi)";
    $qry = $this->db->query($strqry);
    $data = array('data' => $qry->fetchAll());
    
    // Return json
    $response = $response->withJson($data,200);
    return $response;

});

// Llistat reserves, usuari i consums
$app->get('/usuaris/reserva', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/usuaris/reserva' route");

    // Query database
    $strqryh2o = "SELECT DISTINCT r.id, r.dataini, r.datafi, rh.idsensorh2o AS idsensorh2o, SUM(rh.valor) AS h2o, 'h2o' AS tipus, u.nom, u.cognoms, u.dni " .
                 "FROM reserves AS r " .
                 "LEFT JOIN registresh2o AS rh ON rh.idsensorh2o = r.idsensorh2o " .
                 "LEFT JOIN usuaris AS u ON r.idusuari = u.id " .
                 "WHERE rh.datareg BETWEEN r.dataini AND r.datafi " .
                 "GROUP BY r.id " .
                 "ORDER BY u.nom ASC, r.id DESC";
    $qryh2o = $this->db->query($strqryh2o);
    $datah2o = $qryh2o->fetchAll();
    
    $strqryelec = "SELECT DISTINCT r.id, r.dataini, r.datafi, re.idsensorelec AS idsendorelec, SUM(re.valor) AS elec, 'elec' AS tipus, u.nom, u.cognoms, u.dni " .
                  "FROM reserves AS r " .
                  "LEFT JOIN registreselec AS re ON re.idsensorelec = r.idsensorelec " .
                  "LEFT JOIN usuaris AS u ON r.idusuari = u.id " .
                  "WHERE re.datareg BETWEEN r.dataini AND r.datafi " .
                  "GROUP BY r.id " .
                  "ORDER BY u.nom ASC, r.id DESC";
    $qryelec = $this->db->query($strqryelec);
    $dataelec = $qryelec->fetchAll();

    foreach($datah2o as $kh => $vh) {
        foreach($dataelec as $ke => $ve) {
            if($vh['id'] === $ve['id']) {
                $datah2o[$kh]['idsendorelec'] = $ve['idsendorelec'];
                $datah2o[$kh]['elec'] = $ve['elec'];
            } else {
                $datah2o[$kh]['idsendorelec'] = 0;
                $datah2o[$kh]['elec'] = 0;
            }
        }
    }

    $data = array('data' => $datah2o);
    
    // Return json
    $response = $response->withJson($data,200);
    return $response;

});

// Afegir usuari
$app->post('/usuari[/{id}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/usuari/{id}:POST' route");

    // Extreure dades del Request
    $pars = $request->getParsedBody();
    $nom = $pars['nom'];
    $cognoms = $pars['cognoms'];
    $dni = $pars['dni'];

    // Afegir a la bdd
    $strqry ="INSERT INTO usuaris (id, nom, cognoms, dni) VALUES (NULL, '" . $nom . "', '" . $cognoms . "', '". $dni . "')";
    $this->logger->info($strqry);
    $qry = $this->db->prepare($strqry);
    $exqry = array();
    try {
        $qryrst = $qry->execute();
        //array_push($exqry,$strqry);
        //array_push($exqry,$qryrst);
        $exqry = $qryrst;
    } catch (Exception $e) {
        array_push($exqry,$e);
        array_push($exqry,$strqry);
    }

    $response = $response->withJson($exqry,200);
    return $response;

});

// Afegir usuari
$app->put('/usuari[/{id}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/usuari/{id}:PUT' route");

    // Extreure dades del Request
    $pars = $request->getParsedBody();
    $id = $pars['id'];
    $nom = $pars['nom'];
    $cognoms = $pars['cognoms'];
    $dni = $pars['dni'];

    // Modificar a la bdd
    $strqry ="UPDATE usuaris SET nom='" . $nom . "', cognoms='" . $cognoms . "', dni='" . $dni . "' WHERE id=" . $id;
    $this->logger->info($strqry);
    $qry = $this->db->prepare($strqry);
    $exqry = array();
    try {
        $qryrst = $qry->execute();
        //array_push($exqry,$strqry);
        //array_push($exqry,$qryrst);
        $exqry = $qryrst;
    } catch (Exception $e) {
        array_push($exqry,$e);
        array_push($exqry,$strqry);
    }

    $response = $response->withJson($exqry,200);
    return $response;

});

// Eliminar usuari
$app->delete('/usuari/{id}', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/usuari/{id}:DELETE' route");
    // Eliminar de la bdd
    $strqry =" DELETE FROM usuaris WHERE usuaris.id = " . $args['id'];
    $qry = $this->db->prepare($strqry);
    try {
        $exqry = $qry->execute();
    } catch (Exception $e) {
        $exqry = $e;
    }

    $response = $response->withJson($exqry,200);
    return $response;

});


// ******* VISIBLES *******
// Principal
$app->get('/', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
    
})->add($barra_menu);

// Usuaris
$app->get('/usuaris', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/usuaris' route");

    // Render index view
    return $this->renderer->render($response, 'usuaris.phtml', $args);
    
})->add($barra_menu);

// Facturacio
$app->get('/facturacio', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/facturacio' route");

    // Render index view
    return $this->renderer->render($response, 'facturacio.phtml', $args);
    
})->add($barra_menu);


// H2O
$app->get('/h2o', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/h2o' route");

    // Render index view
    return $this->renderer->render($response, 'h2o.phtml', $args);
    
})->add($barra_menu);;

// ******* FI API *******


// ******* FUNCIONS/HELPERS *******
// Sensors valors acumulats per dia

function unificar_valors($valors) {
    //print_r($valors);
    //echo "\r\n";
    $retorn = array(
        'data_registre' => $valors['data_registre'],
        'total_dia_elec' => (($valors['tipus'] === 'elec') ? $valors['total_dia'] : 0),
        'total_dia_h2o' => (($valors['tipus'] === 'h2o') ? $valors['total_dia'] : 0)
    );
    return $retorn;
}

function unificar_duplicats($valors) {
    $retorn = array();
    $anterior = null;
    foreach($valors as $valor) {
        if($anterior['data_registre']===$valor['data_registre']) {
            //print_r($anterior);
            //echo "\r\n";
            //print_r($valor);
            //echo count($retorn);
            //echo "\r\n";
            //echo "---------------";
            $valor['total_dia_elec'] = $anterior['total_dia_elec'];
            $retorn[(count($retorn)-1)]['total_dia_h2o'] += $valor['total_dia_h2o'];
            array_pop($retorn);
        }
        array_push($retorn,$valor);
        $anterior = $valor;
    }
    return $retorn;
}

