var authenticationData = {
    Username : 'username',
    Password : 'password',
};
var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
var poolData = { UserPoolId : 'us-east-1_2RYW2iUmC',
    ClientId : '31op542a10jort2ghlme1am8rn'
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
    Username : 'username',
    Pool : userPool
};
var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();

        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
        var idToken = result.idToken.jwtToken;
    },

    onFailure: function(err) {
        alert(err);
    },

});

$(function onDocReady() {
    $('#frmSignIn').submit(handleSignin);
    //$('#registrationForm').submit(handleRegister);
    //$('#verifyForm').submit(handleVerify);
});

function handleSignin(event) {
    var email = $('#emailInputSignin').val();
    var password = $('#passwordInputSignin').val();
    event.preventDefault();
    signin(email, password,
        function signinSuccess() {
            console.log('Successfully Logged In');
            window.location.href = 'ride.html';
        },
        function signinError(err) {
            alert(err);
        }
    );
}

function signin(email, password, onSuccess, onFailure) {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: toUsername(email),
        Password: password
    });

    var cognitoUser = createCognitoUser(email);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: onSuccess,
        onFailure: onFailure
    });
}