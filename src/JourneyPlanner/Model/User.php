<?php
/**
 * Created by PhpStorm.
 * User: johnuiterwyk
 * Date: 2/18/16
 * Time: 2:27 AM
 */

namespace JourneyPlanner\Model;


class User
{
    public $id;
    public $username;
    public $role;
    public $fullname;
    public $password_hash;
    public $api_key;


    const ROLE_NORMAL = 0;
    const ROLE_ADMIN = 100;

    public function __construct(array $userData)
    {
        if (isset($userData['id'])) $this->id = $userData['id'];
        if (isset($userData['username'])) $this->username = $userData['username'];
        if (isset($userData['role'])) $this->role = $userData['role'];
        if (isset($userData['fullname'])) $this->fullname = $userData['fullname'];
        if (isset($userData['password_hash'])) $this->password_hash = $userData['password_hash'];
        if (isset($userData['api_key'])) $this->api_key = $userData['api_key'];
    }
}
