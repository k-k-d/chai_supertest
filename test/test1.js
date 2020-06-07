const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('https://dnypx9w-dev.nbd.betalectic.tech');   // baseurl to send http requests

describe('', () => {    // 0 - testing ping

    let accessToken, refreshToken, authToken;

    it('Successful Ping', (done) => {
        api.get('/users/ping')  // get request to ping api
        .expect(200)    // check status code
        .end((err, res) => {
            expect(res.body.a + res.body.b, "Good ping").to.equal(res.body.sum);    // check correctness of response payload
            done();
        });
    });

    it('Login API returns the 3 tokens for authorization', (done) =>{   // 1 - testing login with email api
        api.post('/users/auth/login')   // post request to the login api
        .set('Content-Type', 'application/json')    // setting headers
        .send({ // request payload
            username: "krishna@betalectic.com",
            password: "Krishna@09"
        })
        .expect(200)    // check status code
        .end((err, res) => {
            expect(res.body, 'Body has AuthenticationResult').to.have.property("AuthenticationResult");  // check if response payload has the authentication details
            expect(res.body.AuthenticationResult, 'AuthenticationResult contains AccessToken').to.have.property("AccessToken");
            expect(res.body.AuthenticationResult, 'AuthenticationResult contains RefreshToken').to.have.property("RefreshToken");
            expect(res.body.AuthenticationResult, 'AuthenticationResult contains IdToken').to.have.property("IdToken");
            ({AccessToken: accessToken, RefreshToken: refreshToken, IdToken: authToken} = res.body.AuthenticationResult);   // load authentication ids
            done();
        });
    });
    
    it('User details returns the correct data', (done) => { // 2 - testing get user api
        api.get('/users/account/me')        // get request to get user api
        .set('Accept', 'application/json')  // setting headers
        .set('X-Api-Key', accessToken)
        .set('Authorization', authToken)
        .expect(200)    // check status code
        .end((err, res) => {
            expect(res.body, "Body has full_name").to.have.property("full_name"); // check if response payload has relevant properties with expected values
            expect(res.body.full_name, "Name matches full_name").to.equal("venkata krishna");
            expect(res.body, "Body has email").to.have.property("email");
            expect(res.body.email, "Email matches email").to.equal("krishna@betalectic.com");
            done();
        });
    });
});