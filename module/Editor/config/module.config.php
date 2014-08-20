<?php
return array(
    'controllers' => array(
        'invokables' => array(
            'Editor\Controller\Editor' => 'Editor\Controller\EditorController',
        ),
    ),
    'router' => array(
        'routes' => array(
            'editor' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/editor[/][/:id]',
                    'constraints' => array(
                        'id'     => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'Editor\Controller\Editor',
                        'action'     => 'index',
                    ),
                ),
            ),
        ),
    ),
    'view_manager' => array(
        'template_map' => array(
            'layout/editor' => __DIR__ . '/../view/layout/editor.phtml',
        ),
        'template_path_stack' => array(
            'editor' => __DIR__ . '/../view',
        ),
    ),
);