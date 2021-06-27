describe('Chart Plot Testing', () => {
  it('Validates that the text state is being updated by the UserInput component', () => {
    cy.visit('http://localhost:3000/challenge-chart-plot');
    cy.get('[data-cy="prism-editor"]').then(($span) => {
      const textState = $span.text();
      cy.get('[data-cy="prism-editor"]')
        .type('test')
        .clear()
        .type('test')
        .then(($newSpan) => {
          const newState = $newSpan.text();
          expect(newState).to.not.be.eq(textState);
        });
    });
  });

  it('Validates that the chart works with correct data.', () => {
    cy.visit('http://localhost:3000/challenge-chart-plot');
    cy.get('[data-cy="footer-button"]').click();
    cy.get('[data-cy="chart-container"]').children('.chart-canvas').should('be.visible');
  });

  it('Shows error message when there is no data.', () => {
    cy.visit('http://localhost:3000/challenge-chart-plot');
    cy.get('[data-cy="prism-editor"]').type('test').clear();
    cy.get('[data-cy="footer-button"]').click();
    cy.get('.swal2-container');
  });

  it('Shows warning message when there is missing data.', () => {
    let data = `{type: "start", timestamp: 1519862400000, select: ["min_response_time","max_response_time"], group: ["os","browser"]},
{type: "span", timestamp: 1519862400000, begin: 1519862400000, end: 1519862460000},
{type: "data", timestamp: 1519862400000, os: "linux", browser: "chrome", min_response_time: 0.1, max_response_time: 1.3},
{type: "data", timestamp: 1519862400000, min_response_time: 0.2, max_response_time: 1.2},
{type: "data", timestamp: 1519862400000, os: "mac", browser: "firefox", min_response_time: 0.3, max_response_time: 1.2},
{type: "data", timestamp: 1519862400000, os: "linux", browser: "firefox", min_response_time: 0.1, max_response_time: 1.0},
{type: "data", timestamp: 1519862460000, os: "linux", browser: "chrome", min_response_time: 0.2, max_response_time: 0.9},
{type: "data", timestamp: 1519862460000, os: "mac", browser: "chrome", min_response_time: 0.1, max_response_time: 1.1},
{type: "stop", timestamp: 1519862460000}`;

    cy.visit('http://localhost:3000/challenge-chart-plot');
    cy.get('[data-cy="prism-editor"]').type('test').clear().type(data, { parseSpecialCharSequences: false });
    cy.get('[data-cy="footer-button"]').click();
    cy.get('.swal2-container');
  });
});
