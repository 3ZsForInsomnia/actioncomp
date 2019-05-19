import { expect } from 'chai';
import * as sinon from 'sinon';
import { asyncThunk } from './../src/asyncThunk';

describe('async thunk', () => {
  it('should dispatch each action provided', (done) => {
    const loadingSpy = sinon.spy(() => {});
    const loadedSpy = sinon.spy(() => () => {});
    const errorSpy = sinon.spy(() => () => {});
    const readySpy = sinon.spy(() => {
      expect(loadedSpy.called).to.be.true;
      expect(loadingSpy.called).to.be.true;
      expect(errorSpy.called).to.be.false;
      expect(responseTransformSpy.called).to.be.true;
      expect(errorTransformSpy.called).to.be.false;
      done();
    });
    const fakeResponse = {
      results: ['abc', 'def', 'xyz'],
    };
    const fakeError = {
      errorMessage: 'Er. Mah. Gerd. Errers!',
    };
    const responseTransform = (response: any) => response;
    const responseTransformSpy = sinon.spy(responseTransform);
    const errorTransform = (error: any) => error;
    const errorTransformSpy = sinon.spy(errorTransform);
    const fakeApiCall = () => new Promise((resolve, reject) => {
      try {
        resolve(fakeResponse);
      } catch (e) {
        reject(fakeError);
      }
    });
    const dispatch = (func: Function) => func();

    asyncThunk(
      fakeApiCall,
      {
        loaded: loadedSpy,
        loading: loadingSpy,
        error: errorSpy,
        ready: readySpy,
      },
      responseTransformSpy,
      errorTransformSpy,
      0,
    )(dispatch);
  });

  it('should dispatch each action provided and provide its own transforms', (done) => {
    const loadingSpy = sinon.spy(() => {});
    const loadedSpy = sinon.spy(() => () => {});
    const errorSpy = sinon.spy(() => () => {});
    const readySpy = sinon.spy(() => {
      expect(loadedSpy.called).to.be.true;
      expect(loadingSpy.called).to.be.true;
      expect(errorSpy.called).to.be.false;
      done();
    });
    const fakeResponse = {
      results: ['abc', 'def', 'xyz'],
    };
    const fakeError = {
      errorMessage: 'Er. Mah. Gerd. Errers!',
    };
    const fakeApiCall = () => new Promise((resolve, reject) => {
      try {
        resolve(fakeResponse);
      } catch (e) {
        reject(fakeError);
      }
    });
    const dispatch = (func: Function) => func();

    asyncThunk(
      fakeApiCall,
      {
        loaded: loadedSpy,
        loading: loadingSpy,
        error: errorSpy,
        ready: readySpy,
      },
    )(dispatch);
  });

  it('should dispatch the error action if the promise is rejected', (done) => {
    const loadingSpy = sinon.spy(() => {});
    const loadedSpy = sinon.spy(() => () => {});
    const errorSpy = sinon.spy(() => () => {});
    const readySpy = sinon.spy(() => {
      expect(loadedSpy.called).to.be.false;
      expect(loadingSpy.called).to.be.true;
      expect(errorSpy.called).to.be.true;
      expect(responseTransformSpy.called).to.be.false;
      expect(errorTransformSpy.called).to.be.true;
      done();
    });
    const fakeError = {
      errorMessage: 'Er. Mah. Gerd. Errers!',
    };
    const responseTransform = (response: any) => response;
    const responseTransformSpy = sinon.spy(responseTransform);
    const errorTransform = (error: any) => error;
    const errorTransformSpy = sinon.spy(errorTransform);
    const fakeApiCall = () => new Promise((resolve, reject) => {
      try {
        throw new Error('Its an error!');
      } catch (e) {
        reject(fakeError);
      }
    });
    const dispatch = (func: Function) => func();
    asyncThunk(
      fakeApiCall,
      {
        loaded: loadedSpy,
        loading: loadingSpy,
        error: errorSpy,
        ready: readySpy,
      },
      responseTransformSpy,
      errorTransformSpy,
      0,
    )(dispatch);
  });
});
