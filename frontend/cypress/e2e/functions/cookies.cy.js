context('Cookies', () => {
    beforeEach(() => {
        Cypress.Cookies.debug(true);
        cy.visit('http://127.0.0.1:8085');
        // clear cookies again after visiting to remove
        // any 3rd party cookies picked up such as cloudflare
        cy.clearCookies();
    })

    it('cy.getCookie() - check Written Cookie', () => {
        // https://on.cypress.io/getcookie
        // cy.getCookie() yields a cookie object
        cy.request('POST', `http://127.0.0.1:8085/queryUserLogin?userCode=965505941@qq.com&userPwd=root1234`)
            .then((response) => {
                cy.getCookie('UID').should('have.property', 'value', '9');
                cy.getCookie('SESSDATA').should('have.property', 'value', '805c0f0811114e020fafdb0ad12dc357');
            });

    })
})
