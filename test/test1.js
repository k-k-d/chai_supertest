const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('https://dnypx9w-dev.nbd.betalectic.tech');

describe('', () => {

    let accessToken, refreshToken, authToken;

    it('Login', (done) =>{
        api.post('/users/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            username: "krishna@betalectic.com",
            password: "Krishna@09"
        })
        .expect(200)
        .end((err, res) => {
            console.log(res.body);
            ({AccessToken: accessToken, RefreshToken: refreshToken, IdToken: authToken} = res.body.AuthenticationResult);
            done();
        })
    });
    
    it('User Details', (done) => {
        api.get('/users/account/me')
        .set('Accept', 'application/json')
        .set('X-Api-Key', accessToken)
        .set('Authorization', authToken)
        .expect(200)
        .end((err, res) => {
            console.log(res.body);
            done();
        })
    });
});