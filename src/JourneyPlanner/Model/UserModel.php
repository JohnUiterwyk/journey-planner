<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/17/16
 * Time: 4:26 PM
 */

namespace JourneyPlanner\Model;


use JourneyPlanner\Util\TokenGenerator;
use ORM;

class UserModel
{
    public static function getUsers()
    {
        return ORM::for_table("user")
            ->select("id")
            ->select("role")
            ->select("fullname")
            ->select("username")
            ->order_by_asc('id')
            ->find_array();
    }
    public static function createUser($username, $password, $fullname)
    {
        $user = ORM::for_table("user")->create();
        $user->username = $username;
        $user->password_hash = password_hash($password, PASSWORD_DEFAULT);
        $user->fullname = $fullname;
        $user->role = 0;
        $user->save();
        return $user->id();
    }
    public static function updateUser($data)
    {
        $user = ORM::for_table("user")->create();
        $user->username = $username;
        $user->password_hash = password_hash($password, PASSWORD_DEFAULT);
        $user->fullname = $fullname;
        $user->save();
        return $user->id();
    }
    public static function getUser($userId)
    {
        $user = ORM::for_table("user")
            ->select("id")
            ->select("role")
            ->select("fullname")
            ->select("username")
            ->select("api_key")
            ->find_one($userId);
        if($user !== false)
        {
            return $user->as_array();
        }else
        {
            return false;
        }
    }
    public static function deleteUser($userId)
    {
        $user = ORM::for_table("user")
            ->select("id")
            ->select("role")
            ->select("fullname")
            ->select("username")
            ->find_one($userId);
        if($user !== false)
        {
            return $user->delete();
        }else
        {
            return false;
        }
    }
    public static function isUsernameAvailable($username)
    {
        $user = ORM::for_table("user")->where('username',$username)->find_one();
        if ($user === false)
        {
            //username not found, so its available
            return true;
        }else
        {
            //username as found, so it is not available
            return false;
        }
    }

    public static function authenticateUser($username, $password)
    {

        $user = ORM::for_table("user")->where('username',$username)->find_one();
        if($user !== false && password_verify($password,$user->password_hash) === true)
        {
            //update api key
            $user->api_key = TokenGenerator::getToken($user->username);
            $user->save();
            return $user->api_key;
        }else
        {
            return false;
        }
    }

    public static function getNewApiKey($username, $password)
    {

        $user = ORM::for_table("user")->where('username',$username)->find_one();
        if($user !== false && password_verify($password,$user->password_hash) === true)
        {
            //update api key
            $user->api_key = TokenGenerator::getToken($user->username);
            $user->save();
            return $user->api_key;
        }else
        {
            return false;
        }
    }

    public static function getUserWithApiKey($apiKey)
    {
        $user = ORM::for_table("user")->where('api_key',$apiKey)->find_one();
        if($user === false)
        {
            return false;
        }else
        {
            return new User($user->as_array());
        }
    }


    public static function resetApiKey($apiKey)
    {
        $user = ORM::for_table("user")->where('api_key',$apiKey)->find_one();
        $user->api_key = TokenGenerator::getToken($user->username);
        $user->save();

    }
}