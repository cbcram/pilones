<?php
// Routes

// ****** API ******
// H2O total status sensors status
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

// Elec total status sensors status
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


// Sensors: last n sensor registers
$app->get('/sensors/regs[/{num}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/sensors/regs/num' route");

    // Query database
    $strqry ="SELECT *, 'h2o' AS tipus FROM registresh2o UNION SELECT *, 'elec' AS tipus FROM registreselec LIMIT 20";
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


// VISIBLES

// Principal
$app->get('/', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
    
});

// Usuaris
$app->get('/usuaris', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/usuaris' route");

    // Render index view
    return $this->renderer->render($response, 'usuaris.phtml', $args);
    
});
