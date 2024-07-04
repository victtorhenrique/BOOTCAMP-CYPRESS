/// <reference types="cypress"/>


describe('Login', () => {

    // cenarios: dois paramentos: cenario e função anônima a ser executada
    it('Login com sucesso', () =>{
        cy.visit('/login')
        cy.get('#user').type('eduardo@qazando.com.br')
        cy.get('#password').type('123456')
        cy.get('#btnLogin').click()

        cy.url().should('include', '/my-account')
    })

    it('Assinar news', ()=>{
        cy.visit('/')
        cy.get('.form-control').type('dudu@qazando.com.br{enter}')
        cy.get('.swal2-popup').should('contain.text', 'Thank you for your Subscribtion')
    })

})

