// Configura tus test para usarlos
describe('initializeFirebase', () => {

    it('debería ser un objeto', () => {
      assert.equal(typeof initializeFirebase , 'object');
    });
  
    describe('registrar', (email, password ) => {
  
      it('debería ser una función', () => {
        assert.equal(typeof initializeFirebase.registrar, 'function');
      });
  
      it('debería retornar verificar()');
    })