<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../templates/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],

        // Database settings
        'db' => [
            'host' => 'localhost',
            'user' => 'root',
            'pass' => 'root',
            'dbname' => 'pilones'
        ],
        /*'db' => [
            'host' => '62.149.150.52',
            'user' => 'Sql130133',
            'pass' => 'da19d62e',
            'dbname' => 'Sql130133_2'
        ],*/
    ],
];
