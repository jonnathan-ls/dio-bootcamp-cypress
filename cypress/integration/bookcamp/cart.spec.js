// <reference types='Cypress' />

import { DOM_CASMURRO, O_PEQUENO_PRINCIPE } from '../../fixtures/books';

/**
 * Deve clicar no botão de adicionar ao carrinho de um livro
 * @param {string} bookName nome do livro
 */
function clickButtonAddCart(bookName) {
    cy.contains(bookName).parents('.book').find('.container > .btn').click();
}

describe('[Bootcamp] - Bookcamp - Carrinho', () => {
    beforeEach(() => {
        cy.visit('/');
        /**
         * Deve navegar para a página de 'Comprar' e adicionar um livro ao carrinho
         */
        cy.contains('Comprar').click();
        clickButtonAddCart(DOM_CASMURRO);
        cy.get('.btn-secondary').click();

        /**
         * Deve navegar para a página de 'Alugar' e adicionar um item ao carrinho
         */
        cy.contains('Alugar').click();
        clickButtonAddCart(O_PEQUENO_PRINCIPE);
        cy.get('.modal-footer > .btn-primary').click();
    });

    it('Deve ter sucesso ao deletar um item do carrinho', () => {
        /**
         * Deve encontrar determinado livro e pela hierarquia do DOM
         * navegar até o botão de deletar um livro do carrinho
         */
        cy.contains(DOM_CASMURRO).parents('.book-cart').find('.fas').click();
        /**
         * Deve validar se um livro não exite no carrinho [FAIL FIRST]
         */
        cy.contains(DOM_CASMURRO).should('not.exist');
    });

    it('Deve garantir que o valor total do carrinho está correto após deletar algum livro', () => {
        cy.get('.total-value').then(($totalValue) => {
            cy.currencyToNumber($totalValue.text()).then((totalPricePrevious) => {
                cy.contains(O_PEQUENO_PRINCIPE)
                    .parents('.book-content')
                    .find('.total-item')
                    .then(($totalItem) => {
                        cy.contains(O_PEQUENO_PRINCIPE).parents('.book-cart').find('.fas').click();
                        cy.currencyToNumber($totalItem.text()).then((priceItem) => {
                            cy.get('.total-value').then(($totalAfterUpdate) => {
                                cy.currencyToNumber($totalAfterUpdate.text()).should('equal', totalPricePrevious - priceItem);
                            });
                        });
                    });
            });
        });
    });

    it('Deve ter sucesso na conclusão da compra e validação de limpeza no carrinho', () => {
        cy.get('.total > .btn').click();
        cy.get('#email').type('email@qualquer.com');
        cy.get('.modal-footer > .btn-primary').click();
        cy.contains('Compra Executada com sucesso!').should('exist');
        cy.get('.navbar-nav').contains('Meu carrinho').click();
        cy.contains('Nenhum item adicionado ao carrinho ainda.').should('exist');
    });
});
