context('Network Requests', () => {
  // Manage HTTP requests in your app

  it('cy.request() - get Course list', () => {
    // http://127.0.0.1:8085/requestClassList
    cy.request('http://127.0.0.1:8085/requestClassList?startRank=1&rankSize=1')
        .should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('code').eq(0);
        });
  })

  it('cy.request() - post Login', () => {
    // http://127.0.0.1:8085/queryUserLogin
    cy.request('POST', `http://127.0.0.1:8085/queryUserLogin?userCode=965505941@qq.com&userPwd=root1234`)
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).property('code').to.equal(200);
        });
  })

  it('cy.request() - post Logout', () => {
    // http://127.0.0.1:8085/logout
    cy.request('POST','http://127.0.0.1:8085/logout')
        .then((response) => {
          // https://on.cypress.io/assertions
          expect(response.status).to.eq(200);
          expect(response.body).property('code').to.equal(200);
          expect(response.body).property('msg').to.equal("Success");
        });
  })

  it('cy.request() - post Get verify code', () => {
    // http://127.0.0.1:8085/getSecurityCode
    cy.request('POST','http://127.0.0.1:8085/getSecurityCode/lee.tyrael@gmail.com')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).property('code').to.equal(200);
        });
  })
})
