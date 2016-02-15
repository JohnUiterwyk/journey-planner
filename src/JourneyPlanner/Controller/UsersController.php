<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/15/16
 * Time: 10:47 PM
 */

namespace JourneyPlanner\Controller;


class UsersController
{
    /**
     * @var \Psr\Http\Message\StreamInterface
     */
    private $body;

    /**
     * UserController constructor.
     * @param $c \Interop\Container\ContainerInterface
     */
    public function __construct($container)
    {
        $this->body = $container->response->getBody();
    }

    /**
     * @param $request \Slim\Http\Request
     * @param $response \Slim\Http\Response
     * @param $args array
     */
    public function __invoke($request, $response, $args)
    {
        if($request->isGet())
        {
            if(isset($args['id']))
            {
                $this->getUser($args['id']);
            }else
            {
                $this->getAllUsers();
            }
        }

        if($request->isDelete() && isset($args['id']))
        {
            $this->deleteUser($args['id']);
        }

        if($request->isPost())
        {
            $this->createUser($request->getParsedBody());
        }

        $jsonResponse = $response->withHeader('Content-type', 'application/json');
        return $jsonResponse;
    }

    /**
     */
    public function getAllUsers()
    {
        $this->body->write("get all the users!".PHP_EOL);
    }

    /**
     * @param $userId int
     */
    public function getUser($userId)
    {
        $this->body->write("get user ".$userId.PHP_EOL);
    }

    /**
     * @param $userId int
     */
    public function deleteUser($userId)
    {
        $this->body->write("delete user ".$userId.PHP_EOL);
    }

    /**
     * @param $userId int
     */
    public function createUser($data)
    {
        $this->body->write("the password is ".$data['password']);
    }

}