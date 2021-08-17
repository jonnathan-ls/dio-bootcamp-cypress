/// <reference types='cypress' />

describe('Grupo', () => {
    it('Teste de Sucesso', function () {
        const sum = 1 + 1;
        expect(sum).to.equal(2);
    });
    it('Teste de Falha', () => {
        // implementação com falha
        const sum = (n1, n2) => n1 + n2 + 1;
        expect(sum(2, 3)).to.equal(5);
    });
    it.skip('Teste Desconsiderado', () => {});
    it.only('Teste Específico', () => {});
});
