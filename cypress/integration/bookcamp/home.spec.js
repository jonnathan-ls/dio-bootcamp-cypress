/// <reference types='Cypress' />

/**
 * Importação o conteúdo do arquivo url.json
 */
import * as URL from '../../fixtures/url.json';

describe('[Bootcamp] Bookcamp - Home Page', () => {
    before(() => {
        /**
         * Acessa (visita) uma URL
         */
        cy.visit(URL.bookcamp);
    });

    it('Deve validar o titulo da página Bookcamp', () => {
        /**
         * Não utilizar o DOM!
         * Deixar o cypress lidar com a obtenção dos elementos da página
         */
        const title = document.querySelector('title').innerText;

        /**
         * Validação através do elemento retornando
         */
        cy.title().then((title) => {
            expect(title).to.equal('Bookcamp');
        });

        /**
         * Validação através do should
         */
        cy.title().should('equal', 'Bookcamp');
    });

    it('Deve validar a opção comprar como primeiro item do menu', () => {
        /**
         * Validação através do contains permitindo comparação flexível
         */
        cy.contains('comprar', { matchCase: false }).should('exist');

        /**
         * Validação através do elemento jQuery retornado
         */
        cy.get(':nth-child(1) > .nav-link').then(($el) => {
            const firstItemMenu = $el.text();
            expect(firstItemMenu).to.equal('Comprar');
            expect(firstItemMenu).to.match(/comprar/i);
        });

        /**
         * Validação através do should com comparação exata
         */
        cy.get(':nth-child(1) > .nav-link').should('have.text', 'Comprar');

        /**
         * Validação através do should com comparação flexível
         */
        cy.get(':nth-child(1) > .nav-link')
            .invoke('text')
            .should('match', /comprar/i);
    });
});
