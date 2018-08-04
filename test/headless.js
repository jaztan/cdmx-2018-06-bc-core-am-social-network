// Configura tus test para usarlos
global.window = global;
global.assert = require('chai').assert;
require('../src/js/firebase.js');
require('');
describe('initializeFirebase', () => {

    it('debería ser un objeto', () => {
      assert.equal(typeof initializeFirebase , 'object');
    });

    describe('register', (email, password ) => {

      it('debería ser una función', () => {
        assert.equal(typeof initializeFirebase.register, 'function');
      });

      it('debería retornar verificar()');{
      };

    }
