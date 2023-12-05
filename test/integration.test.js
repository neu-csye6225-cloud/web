import {expect as _expect, use} from 'chai';
import chaiHttp from 'chai-http';
import chai from 'chai'
const expect = _expect;

use(chaiHttp);

import app from '../app.js'

describe('API Tests', ()=>{

    it('',(done) => {
        chai.request(app)
        .get('/healthz')
        .end((err,res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done()
            process.exit(0)
        });

    });
});