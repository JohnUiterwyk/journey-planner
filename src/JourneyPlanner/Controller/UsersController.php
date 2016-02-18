<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/15/16
 * Time: 10:47 PM
 */

namespace JourneyPlanner\Controller;

use JourneyPlanner\Model\User;
use JourneyPlanner\Model\UserModel;
use JourneyPlanner\Model\UsersModel;
use ORM;
use Slim\Http\Request;
use Slim\Http\Response;

class UsersController extends ApiController
{
    /**
     * @var ORM
     */
    private $userTable;

    /**
     * __invoke is called by slim when a route matches
     * @param $request Request
     * @param $response Response
     * @param $args array
     * *
     * @return $response \Slim\Http\Response
     */
    public function __invoke(Request $request, Response $response, array $args)
    {

        $this->response =  parent::__invoke($request, $response, $args);

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
        if($request->isPut())
        {
            $this->updateUser($request->getParsedBody());
        }


        return $this->response;
    }

    /**
     */
    public function getAllUsers()
    {
        if($this->currentUser !== null && $this->currentUser->role >= User::ROLE_ADMIN)
        {
            $this->writeSuccess(UserModel::getUsers());

        }else
        {
            $this->response = $this->response->withStatus(401);
            $this->writeFail("Unauthorized.");
        }
    }

    /**
     * @param $userId int
     */
    public function getUser($userId)
    {
        $result = UserModel::getUser($userId);
        if($result !== false)
        {
            $this->writeSuccess($result);
        }else
        {
            $this->writeFail("User not found.");
        }
    }
    /**
     * @param $userId int
     */
    public function createUser(array $data)
    {
        if(isset($data['username']) && isset($data['password']) && isset($data['fullname']))
        {
            //check if username exists
            if(UserModel::isUsernameAvailable($data['username']) === true)
            {
                //username unique
                //create user
                $newUserId = UserModel::createUser($data['username'],$data['password'], $data['fullname']);
                $this->writeSuccess(UserModel::getUser($newUserId));

            }else
            {
                $this->writeFail("Username already exists.");
            }
        }else
        {
            $this->writeFail("Required fields missing.");
        }

    }

    /**
     * @param $userId int
     */
    public function updateUser(array $data)
    {
        $userToUpdate  = new User($data);

        //check we have an update id, then check the current user is either admin or editing his own
        if($userToUpdate->id !==  null
            && $this->currentUser !=null
            && ($this->currentUser->role >= User::ROLE_ADMIN || $this->currentUser->id === $userToUpdate->id ))
        {
            //all good, update the user


        }else
        {
            $this->writeFail("Required fields missing.");
        }

    }

    /**
     * @param $userId int
     */
    public function deleteUser($userId)
    {
        if($this->currentUser !== null && $this->currentUser->role >= User::ROLE_ADMIN)
        {
            if(UserModel::deleteUser($userId) === true)
            {
                $this->writeSuccess("Deleted user ".$userId);
            }else
            {
                $this->writeFail("User not found.");
            }

        }else
        {
            $this->response = $this->response->withStatus(401);
            $this->writeFail("Unauthorized.");
        }
    }


}