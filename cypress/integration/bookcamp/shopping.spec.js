/// <reference types='Cypress' />

describe('[Bootcamp] - Bookcamp - Comprar', () => {
    before(() => {
        /**
         * Deve visitar a página do bookcamp
         */
        cy.visit('/');

        /**
         * Deve navegar para a página de compras através do get
         */
        cy.get(':nth-child(1) > .nav-link').click();

        /**
         * Deve navegar a página de compras através do contains
         */
        cy.contains('Comprar').click();
    });

    it('Deve filtrar os livros pelo gênero suspense', () => {
        /**
         * Deve abrir as opções do filtro, desmarcar os checkbox,
         * selecionar por determinado gênero e clicar em filtrar
         */
        cy.get('.filter-label').click();
        // cy.get('.form-check-label').each($el => $el.click());
        cy.get('.form-check-label').click({ multiple: true });
        cy.get('#Suspense').click();
        cy.contains('Aplicar Filtro').click();
        /**
         * Deve obter os livros por gênero atribuindo um alias
         */
        cy.get('.genre').as('livrosPorGênero');
        /**
         * Deve validar os livros por um gênero [FAIL FIRST]
         */
        cy.get('@livrosPorGênero').each(($livro) => {
            expect($livro.text()).to.include('Suspense');
            cy.wrap($livro).should('include.text', 'Suspense');
        });
    });

    it.only('Deve ordenar os livros por ordem crescente', () => {
        /**
         * Deve utilizar a funcionalidade de ordenação pelo menor preço
         */
        cy.get('.order > button').click();
        cy.get('.order-panel > :nth-child(2)').click();
        cy.get('.order-panel').contains('Menor Preço').click();

        // Deve validar se os preços dos livros estão em ordem crescente [FAIL FIRST]
        let priceBookPrevious = 0;
        cy.get('.book-value').each(($bookPrice) => {
            const priceValue = $bookPrice.text();
            const priceCurrent = Number(priceValue.replace(/[^0-9,]/g, '').replace(',', '.'));
            expect(priceCurrent).to.gte(priceBookPrevious);
            priceBookPrevious = priceCurrent;
        });

        /**
         * Deve validar se os preços dos livros estão em ordem crescente,
         * utilizando a funcionalidade de adicionar um novo comando
         */
        let priceBookPreviousByCommand = 0;
        cy.get('.book-value').each(($bookPrice) => {
            cy.currencyToNumber($bookPrice.text()).then((priceCurrent) => {
                cy.wrap(priceCurrent).should('be.gte', priceBookPreviousByCommand);
                priceBookPreviousByCommand = priceCurrent;
            });
        });
    });
});
