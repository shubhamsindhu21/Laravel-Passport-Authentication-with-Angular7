<?php

namespace App\Http\Controllers;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Laravel\Passport\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Notifications\PasswordResetRequest;
use App\Notifications\PasswordResetSuccess;
use App\PasswordReset;
use Illuminate\Support\Facades\Password;
use App\User;
use Hash;

class AuthController extends Controller
{
    //
    use HasApiTokens, Notifiable;

    private $client;
    public function __construct()
    {
        $this->client = Client::find(2);

    }

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'name'=>'required',
            'password' => 'required|min:8|confirmed',

        ]);

        if ($validator->fails()) {
            return response(['status'=> '0','message'=> $validator->messages()->first()],Response::HTTP_OK);
        }

       $user=User::create([
        'email'=> request('email'),
        'password'=>bcrypt($request['password']),
        'name'=>request('name'),
       ]);

       $params=[
         'grant_type'=>'password',
         'client_id'=>$this->client->id,
         'client_secret'=>$this->client->secret,
         'username'=>request('email'),
         'password'=>request('password'),
         'scope'=>'*',

        ];
        $request->request->add($params);
        $proxy=Request::create('oauth/token', 'POST');
        $token=Route::dispatch($proxy);
        $token = (array) json_decode($token->getContent());
        return response(['status'=> '1','message'=> 'User Created','data'=>$user,'token'=>$token],Response::HTTP_OK);
    }

    public function login(Request $request)
    {
                $hasLoginUser = Auth::attempt(['email' => request('email'), 'password' => request('password')]);
                if( $hasLoginUser == false)
                {
                    return response()->json(['status' => '0','message'=>'Invalid credentials'],Response::HTTP_OK);
                }else{
                    $user = Auth::user();
                    $params=[
                        'grant_type'=>'password',
                        'client_id'=>$this->client->id,
                        'client_secret'=>$this->client->secret,
                        'username'=>request('email'),
                        'password'=>request('password'),
                        'scope'=>'*',

                       ];
                       $request->request->add($params);
                       $proxy=Request::create('oauth/token', 'POST');
                       $token=Route::dispatch($proxy);
                       $token = (array) json_decode($token->getContent());
                       return response(['status'=> '1','message'=> 'Login Successfully','data'=>$user,'token'=>$token],Response::HTTP_OK);

                }
            }
            public function sendPasswordResetLink(){

            }


}
