import 'jest';
import * as express from 'express';
import * as request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import IntegrationHelpers from './helpers/Integration-helpers';


describe('status integration tests', () => {
    let app: express.Application;
    beforeAll(async () => {
        console.log('start test');
        
    });


    it('can get server time', async () => {
        await request(app)
            .get('/ginette')
            .set('Accept', 'application/json')
            .expect((res: request.Response) => {
                // eslint-disable-next-line no-console
                console.log(res.text);
            })
            .expect(StatusCodes.OK);
    });