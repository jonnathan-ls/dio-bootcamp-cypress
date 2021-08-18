/// <reference types='Cypress' />

/**
 * Deve importar um livro de um arquivo .js
 */
import { DOM_CASMURRO } from '../../fixtures/books';

describe('[Bootcamp] - Bookcamp - Alugar', () => {
    before(() => {
        /**
         * Deve visitar a página do bookcamp,
         * e navegar para a página de locação
         */
        cy.visit('/');
        cy.contains('Alugar').click();
    });

    it('Deve ter êxito ao adicionar um livro para locação', () => {
        /**
         * Deve encontrar um livro e utilizando a hierarquia do DOM e encontrar o elemento,
         * que contempla todos as 'tags' filhas para navegar até o botão de quantidade para alugar
         */
        cy.contains(DOM_CASMURRO).parents('.book').find('#rentDays').as('DomCasmurro');

        /**
         * Deve obter o campo de entrada de um livro atribuído com alias,
         * limpar o conteúdo e então inserir um valor para também na hierarquia
         * do DOM encontrar o botão de adicionar ao carrinho, concluindo a operação
         */
        cy.get('@DomCasmurro').clear().type(3).parents('.shopping-action').find('.btn').click();
        cy.get('.modal-footer > .btn-primary').click();

        // Deve validar o processo de locação de um livro [FAIL FIRST]
        cy.contains('Meu carrinho').click();
        cy.contains(DOM_CASMURRO).should('exist');
    });

    // TODO: Deve validar o valor total de um item adicionado ao carrinho
});
